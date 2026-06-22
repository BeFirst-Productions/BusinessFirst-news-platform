// 'use client';

// import React from 'react';
// import { useAuthStore } from '@/store/auth.store';
// import { useUIStore } from '@/store/ui.store';
// import { Bell, Search, Sun, Moon, Menu, ChevronDown } from 'lucide-react';
// import { cn } from '@/lib/utils';

// export function Header() {
//   const { user } = useAuthStore();
//   const { sidebarOpen, toggleSidebar, theme, toggleTheme } = useUIStore();

//   return (
//     <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6">
//       <div className="flex items-center gap-4">
//         <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
//           <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//         </button>
//         <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//           <Search className="h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search articles, users..."
//             className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-gray-400"
//           />
//           <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs text-gray-400 bg-gray-200 dark:bg-gray-700">
//             <span>⌘</span>K
//           </kbd>
//         </div>
//       </div>

//       <div className="flex items-center gap-2">
//         <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
//           {theme === 'light' ? <Moon className="h-5 w-5 text-gray-600" /> : <Sun className="h-5 w-5 text-gray-400" />}
//         </button>
        
//         <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
//           <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
//         </button>

//         <div className="flex items-center gap-3 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
//           <div className="hidden sm:block text-right">
//             <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
//             <p className="text-xs text-gray-500">{user?.role}</p>
//           </div>
//           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//             <span className="text-white text-sm font-medium">
//               {user?.name?.charAt(0)?.toUpperCase()}
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }