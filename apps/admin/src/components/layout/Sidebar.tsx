// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useAuthStore } from '@/store/auth.store';
// import { useUIStore } from '@/store/ui.store';
// import { cn } from '@/lib/utils';
// import {
//   LayoutDashboard, FileText, FolderTree, Tags, Megaphone, Users, Settings,
//   Mail, MessageSquare, BarChart3, Image, Search, Shield, LogOut,
//   ChevronDown, ChevronRight, ChevronLeft, Menu, X, Bell, Sun, Moon
// } from 'lucide-react';

// const navigationGroups = [
//   {
//     title: 'MAIN',
//     items: [
//       { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//       { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
//     ],
//   },
//   {
//     title: 'CONTENT',
//     items: [
//       { title: 'Articles', href: '/dashboard/articles', icon: FileText },
//       { title: 'Categories', href: '/dashboard/categories', icon: FolderTree },
//       { title: 'Tags', href: '/dashboard/tags', icon: Tags },
//       { title: 'Media Library', href: '/dashboard/media', icon: Image },
//     ],
//   },
//   {
//     title: 'MANAGEMENT',
//     items: [
//       { title: 'Users', href: '/dashboard/users', icon: Users },
//       { title: 'Ads', href: '/dashboard/ads', icon: Megaphone },
//       { title: 'Comments', href: '/dashboard/comments', icon: MessageSquare },
//       { title: 'Newsletter', href: '/dashboard/newsletter', icon: Mail },
//     ],
//   },
//   {
//     title: 'CONFIGURATION',
//     items: [
//       { title: 'SEO', href: '/dashboard/seo', icon: Search },
//       { title: 'Settings', href: '/dashboard/settings', icon: Settings },
//     ],
//   },
// ];

// export function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user, logout } = useAuthStore();
//   const { sidebarOpen, toggleSidebar } = useUIStore();
//   const [expandedGroups, setExpandedGroups] = React.useState<string[]>(['MAIN', 'CONTENT']);

//   const toggleGroup = (title: string) => {
//     setExpandedGroups(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
//   };

//   const handleLogout = () => {
//     logout();
//     router.push('/login');
//   };

//   return (
//     <aside className={cn(
//       'fixed lg:static inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300',
//       sidebarOpen ? 'w-64' : 'w-20'
//     )}>
//       {/* Logo */}
//       <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
//         <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
//           <span className="text-white font-bold text-lg">BF</span>
//         </div>
//         {sidebarOpen && (
//           <div className="ml-3">
//             <h1 className="font-semibold text-gray-900 dark:text-white text-sm">BusinessFirst</h1>
//             <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
//         {navigationGroups.map((group) => (
//           <div key={group.title}>
//             {sidebarOpen && (
//               <h2 className="px-3 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
//                 {group.title}
//               </h2>
//             )}
//             <div className="space-y-1">
//               {group.items.map((item) => {
//                 const isActive = pathname === item.href;
//                 return (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     className={cn(
//                       'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
//                       isActive
//                         ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-sm'
//                         : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
//                     )}
//                     title={!sidebarOpen ? item.title : undefined}
//                   >
//                     <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-blue-600')} />
//                     {sidebarOpen && <span>{item.title}</span>}
//                     {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </nav>

//       {/* User Section */}
//       <div className="p-4 border-t border-gray-200 dark:border-gray-800">
//         <div className={cn('flex items-center', sidebarOpen ? 'justify-between' : 'justify-center')}>
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
//               <Shield className="h-4 w-4 text-white" />
//             </div>
//             {sidebarOpen && (
//               <div className="min-w-0">
//                 <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//               </div>
//             )}
//           </div>
//           {sidebarOpen && (
//             <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors">
//               <LogOut className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// }