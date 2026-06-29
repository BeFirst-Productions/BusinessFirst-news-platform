'use client';

import React from 'react';
import { Bell, Search, Sun, Moon, LogOut, User, Settings, Menu, Check, CheckCheck, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUIStore } from '@/store/ui.store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_URL } from '@/lib/constants';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  isRead: boolean;
  link?: string | null;
  createdAt: string;
}

interface ApiResponseData<T> {
  success: boolean;
  message: string;
  data: T;
}

export function AdminHeader() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { toggleSidebar, theme, toggleTheme } = useUIStore();
  const queryClient = useQueryClient();

  // Sync theme to document element
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Request system notification permission on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Fetch user notifications
  const { data: notificationsRes } = useQuery<ApiResponseData<NotificationItem[]>>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await apiClient.get('/notifications?page=1&limit=20');
      return response.data;
    },
    enabled: !!user,
  });

  const notifications = notificationsRes?.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Debounce search query
  const [debouncedQuery, setDebouncedQuery] = React.useState('');

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Close search dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: searchResults, isLoading: isSearching } = useQuery<{
    articles: { id: string; title: string; slug: string; status: string; featuredImage?: string | null }[];
    categories: { id: string; name: string; slug: string; isActive: boolean }[];
    tags: { id: string; name: string; slug: string }[];
  }>({
    queryKey: ['global-search', debouncedQuery],
    queryFn: async () => {
      if (debouncedQuery.trim().length < 2) {
        return { articles: [], categories: [], tags: [] };
      }
      const response = await apiClient.get(`/search/global?q=${encodeURIComponent(debouncedQuery)}`);
      return response.data.data;
    },
    enabled: debouncedQuery.trim().length >= 2,
  });

  const hasResults =
    searchResults &&
    (searchResults.articles.length > 0 ||
      searchResults.categories.length > 0 ||
      searchResults.tags.length > 0);

  // Set up real-time SSE Connection
  React.useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const eventSource = new EventSource(`${API_URL}/notifications/stream?token=${token}`);

    eventSource.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data) as NotificationItem;

        // 1. Invalidate react-query notifications cache to pull the latest list
        queryClient.invalidateQueries({ queryKey: ['notifications'] });

        // 2. Invalidate newsletter page caches if a new subscription arrives
        if (notification.title === 'New Newsletter Subscriber') {
          queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
          queryClient.invalidateQueries({ queryKey: ['newsletter-stats'] });
        }

        // 2. Show in-app Toast notification
        toast.success(`${notification.title}: ${notification.message}`, {
          duration: 6000,
          position: 'top-right',
        });

        // 3. Trigger native browser/OS-level system notification
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico',
          });
        }
      } catch (err) {
        console.error('Error parsing SSE event data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE connection error:', err);
    };

    return () => {
      eventSource.close();
    };
  }, [user, queryClient]);

  // Mutations
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.patch(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: () => {
      toast.error('Failed to mark notification as read');
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      await apiClient.patch('/notifications/read-all');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
    onError: () => {
      toast.error('Failed to mark all notifications as read');
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/notifications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: () => {
      toast.error('Failed to delete notification');
    },
  });

  const clearAllNotificationsMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete('/notifications');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notifications cleared');
    },
    onError: () => {
      toast.error('Failed to clear notifications');
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const canViewSettings =
    user?.role === 'SUPERADMIN' ||
    user?.modules?.some((m) => m.module.code === 'SETTINGS' && m.canView);

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 gap-4">
        {/* Search & Toggle wrapper */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {/* Hamburger Menu Toggle on Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden flex-shrink-0"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="relative w-full" ref={dropdownRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, categories, tags..."
              className="pl-9 bg-muted/50 border-0 focus-visible:ring-1 w-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
            />
            {isSearching && searchQuery.trim().length >= 2 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground flex items-center gap-1">
                <span className="animate-spin h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full" />
              </span>
            )}

            {isOpen && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-xl shadow-xl z-50 max-h-[400px] overflow-y-auto divide-y divide-border animate-in fade-in slide-in-from-top-1 duration-200">
                {!searchResults && isSearching && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Searching...
                  </div>
                )}
                {searchResults && !hasResults && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No results found for "{searchQuery}"
                  </div>
                )}

                {searchResults && hasResults && (
                  <>
                    {/* Articles Section */}
                    {searchResults.articles.length > 0 && (
                      <div className="p-3">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2.5 mb-1.5 flex items-center justify-between">
                          <span>Articles</span>
                          <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[9px] font-medium font-mono">
                            {searchResults.articles.length}
                          </span>
                        </h4>
                        <div className="space-y-0.5">
                          {searchResults.articles.map(article => (
                            <button
                              key={article.id}
                              onClick={() => {
                                router.push(`/dashboard/articles/${article.id}/view`);
                                setIsOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left p-2 hover:bg-muted/50 rounded-lg flex items-center gap-3 transition-colors group"
                            >
                              {article.featuredImage ? (
                                <img
                                  src={article.featuredImage}
                                  alt=""
                                  className="w-9 h-9 object-cover rounded-md border bg-muted shrink-0"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-md border bg-muted flex items-center justify-center shrink-0">
                                  <span className="text-[10px] text-muted-foreground font-mono">DOC</span>
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                  {article.title}
                                </p>
                                <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded mt-0.5 font-bold ${
                                  article.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {article.status}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Categories Section */}
                    {searchResults.categories.length > 0 && (
                      <div className="p-3">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2.5 mb-1.5 flex items-center justify-between">
                          <span>Categories</span>
                          <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[9px] font-medium font-mono">
                            {searchResults.categories.length}
                          </span>
                        </h4>
                        <div className="space-y-0.5">
                          {searchResults.categories.map(category => (
                            <button
                              key={category.id}
                              onClick={() => {
                                router.push('/dashboard/categories');
                                setIsOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left p-2 hover:bg-muted/50 rounded-lg flex items-center justify-between transition-colors group"
                            >
                              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                {category.name}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono">
                                /{category.slug}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags Section */}
                    {searchResults.tags.length > 0 && (
                      <div className="p-3">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2.5 mb-1.5 flex items-center justify-between">
                          <span>Tags</span>
                          <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[9px] font-medium font-mono">
                            {searchResults.tags.length}
                          </span>
                        </h4>
                        <div className="space-y-0.5">
                          {searchResults.tags.map(tag => (
                            <button
                              key={tag.id}
                              onClick={() => {
                                router.push('/dashboard/tags');
                                setIsOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left p-2 hover:bg-muted/50 rounded-lg flex items-center justify-between transition-colors group"
                            >
                              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                #{tag.name}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono">
                                /{tag.slug}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-80 mt-2 bg-popover border rounded-md shadow-lg z-50 overflow-hidden"
              align="end"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
                <span className="text-sm font-semibold">Notifications</span>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-xs text-primary hover:text-primary/80 flex items-center gap-1 focus:ring-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAllAsReadMutation.mutate();
                      }}
                      disabled={markAllAsReadMutation.isPending}
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                      Mark read
                    </Button>
                  )}
                  {notifications.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-xs text-destructive hover:text-destructive/80 flex items-center gap-1 focus:ring-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearAllNotificationsMutation.mutate();
                      }}
                      disabled={clearAllNotificationsMutation.isPending}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear all
                    </Button>
                  )}
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-border">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 text-left relative transition-colors ${
                        notification.isRead ? 'bg-background hover:bg-muted/10' : 'bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 min-w-0 flex-1">
                          <p className="text-xs font-semibold leading-none text-foreground flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              notification.type === 'SUCCESS' ? 'bg-green-500' :
                              notification.type === 'WARNING' ? 'bg-yellow-500' :
                              notification.type === 'ERROR' ? 'bg-red-500' : 'bg-blue-500'
                            }`} />
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground font-normal break-words leading-snug">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsReadMutation.mutate(notification.id);
                              }}
                              disabled={markAsReadMutation.isPending}
                              title="Mark as read"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotificationMutation.mutate(notification.id);
                            }}
                            disabled={deleteNotificationMutation.isPending}
                            title="Delete notification"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium hidden md:inline">
                  {user?.name || 'User'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 bg-popover border rounded-md shadow-lg z-50" align="end">
              <DropdownMenuLabel className="px-4 py-2">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="px-4 py-2 cursor-pointer hover:bg-accent flex items-center gap-2"
                onClick={() => router.push('/dashboard/profile')}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              {canViewSettings && (
                <DropdownMenuItem
                  className="px-4 py-2 cursor-pointer hover:bg-accent flex items-center gap-2"
                  onClick={() => router.push('/dashboard/settings')}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="px-4 py-2 cursor-pointer hover:bg-accent flex items-center gap-2 text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}