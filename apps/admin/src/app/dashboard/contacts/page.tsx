'use client';

import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Modal';
import {
  Trash2,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Mail,
  MailOpen,
  MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

// Types
interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  metadata: { total: number; page: number; limit: number; totalPages: number };
}

export default function ContactsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isReadFilter, setIsReadFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);

  // Debounce search
  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
    const t = setTimeout(() => setDebouncedSearch(val), 400);
    return () => clearTimeout(t);
  }, []);

  // Queries
  const { data: contactsRes, isLoading, refetch } = useQuery<PaginatedResponse<Contact>>({
    queryKey: ['contacts', page, debouncedSearch, isReadFilter],
    queryFn: async () => {
      const params: Record<string, string | number> = { page, limit: 25 };
      if (debouncedSearch) params['search'] = debouncedSearch;
      if (isReadFilter === 'read') params['isRead'] = 'true';
      if (isReadFilter === 'unread') params['isRead'] = 'false';
      const res = await apiClient.get('/contacts', { params });
      return { data: res.data.data, metadata: res.data.metadata };
    },
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/contacts/${id}`),
    onSuccess: () => {
      toast.success('Message deleted');
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: () => toast.error('Failed to delete message'),
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => apiClient.post('/contacts/bulk-delete', { ids }),
    onSuccess: (_, ids) => {
      toast.success(`${ids.length} messages deleted`);
      setSelectedIds(new Set());
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: () => toast.error('Failed to bulk delete'),
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => apiClient.patch(`/contacts/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const handleViewMessage = (contact: Contact) => {
    setViewingContact(contact);
    if (!contact.isRead) {
      markReadMutation.mutate(contact.id);
    }
  };

  const contacts = contactsRes?.data ?? [];
  const meta = contactsRes?.metadata;

  const allSelected = contacts.length > 0 && contacts.every((c) => selectedIds.has(c.id));
  const toggleAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(contacts.map((c) => c.id)));
  };
  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground mt-1">Manage and read incoming messages from your website.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle className="text-base">Inbox</CardTitle>
            <div className="flex flex-wrap gap-2">
              {selectedIds.size > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  loading={bulkDeleteMutation.isPending}
                  onClick={() => bulkDeleteMutation.mutate(Array.from(selectedIds))}
                  leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                >
                  Delete {selectedIds.size} selected
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => refetch()} leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, email or subject..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 h-9 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div className="flex gap-1 p-0.5 bg-muted rounded-lg h-9">
              {(['all', 'unread', 'read'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => { setIsReadFilter(f); setPage(1); }}
                  className={cn(
                    'px-3 py-1 text-xs font-medium rounded-md transition-all capitalize',
                    isReadFilter === f ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="h-6 w-6 text-primary animate-spin" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground font-medium">No messages found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-4 py-3 text-left w-10">
                      <button onClick={toggleAll} className="text-muted-foreground hover:text-foreground">
                        {allSelected ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sender</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className={cn('hover:bg-muted/20 transition-colors', selectedIds.has(contact.id) && 'bg-primary/5', !contact.isRead && 'bg-muted/10 font-medium')}>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleOne(contact.id)} className="text-muted-foreground hover:text-foreground">
                          {selectedIds.has(contact.id) ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        {contact.isRead ? (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Mail className="h-4 w-4 text-primary" />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div>{contact.name}</div>
                        <div className="text-xs text-muted-foreground font-normal">{contact.email}</div>
                      </td>
                      <td className="px-4 py-3 truncate max-w-[200px]">{contact.subject}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs font-normal hidden sm:table-cell">
                        {new Date(contact.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewMessage(contact)}>View</Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                            onClick={() => {
                              if (confirm(`Delete message from ${contact.name}?`)) deleteMutation.mutate(contact.id);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
              <p className="text-xs text-muted-foreground">
                Showing {((page - 1) * 25) + 1}–{Math.min(page * 25, meta.total)} of {meta.total.toLocaleString()}
              </p>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="flex items-center px-3 text-xs font-medium">{page} / {meta.totalPages}</span>
                <Button variant="outline" size="sm" disabled={page >= meta.totalPages} onClick={() => setPage(p => p + 1)} className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Message Modal */}
      <Dialog open={!!viewingContact} onOpenChange={(open) => !open && setViewingContact(null)}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Contact Message</DialogTitle>
          </DialogHeader>
          {viewingContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                <div>
                  <p className="text-muted-foreground mb-1">From</p>
                  <p className="font-medium">{viewingContact.name}</p>
                  <p className="text-muted-foreground">{viewingContact.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Date</p>
                  <p>{new Date(viewingContact.createdAt).toLocaleString('en-US')}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Subject</p>
                <p className="font-medium">{viewingContact.subject}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Message</p>
                <div className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap text-sm text-foreground border border-border">
                  {viewingContact.message}
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button onClick={() => setViewingContact(null)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
