'use client';

import React, { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  action?: () => void;
  children?: NavItem[];
}

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function AdminLayout({
  children,
  currentPage,
  onPageChange,
}: AdminLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['products']);
  const adminEmail = 'admin@glovantaexim.com';

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      action: () => {
        onPageChange('dashboard');
        setSidebarOpen(false);
      },
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      children: [
        {
          id: 'products-spices',
          label: '🌶️ Spices',
          icon: Package,
          action: () => {
            onPageChange('products-spices');
            setSidebarOpen(false);
          },
        },
        {
          id: 'products-dehydrated',
          label: '🥬 Dehydrated',
          icon: Package,
          action: () => {
            onPageChange('products-dehydrated');
            setSidebarOpen(false);
          },
        },
        {
          id: 'products-textile',
          label: '🧣 Textile',
          icon: Package,
          action: () => {
            onPageChange('products-textile');
            setSidebarOpen(false);
          },
        },
      ],
    },
    {
      id: 'blogs',
      label: 'Blog',
      icon: FileText,
      action: () => {
        onPageChange('blogs');
        setSidebarOpen(false);
      },
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      icon: MessageSquare,
      action: () => {
        onPageChange('inquiries');
        setSidebarOpen(false);
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => {
        onPageChange('settings');
        setSidebarOpen(false);
      },
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const isItemActive = (id: string) => currentPage === id || currentPage.startsWith(id + '-');

  return (
    <div className="flex h-screen bg-slate-50" suppressHydrationWarning>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        suppressHydrationWarning
      >
        <div className="p-4 border-b border-slate-700">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.png" 
              alt="Glovanta Exim" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="font-bold text-white">Glovanta Exim</div>
              <div className="text-xs text-slate-400">Admin Panel</div>
            </div>
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2" suppressHydrationWarning>
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.id);
                  } else if (item.action) {
                    item.action();
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isItemActive(item.id)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
                suppressHydrationWarning
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.children && (
                  <ChevronDown
                    className={`w-4 h-4 ml-auto transition-transform ${
                      expandedMenus.includes(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.children && expandedMenus.includes(item.id) && (
                <div className="ml-4 mt-2 space-y-1 border-l border-slate-700 pl-4">
                  {item.children.map((subitem) => (
                    <button
                      key={subitem.id}
                      onClick={subitem.action}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                        isItemActive(subitem.id)
                          ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      suppressHydrationWarning
                    >
                      <subitem.icon className="w-4 h-4" />
                      <span>{subitem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-slate-700 space-y-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center font-bold text-slate-900">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">Administrator</div>
                <div className="text-xs text-slate-400 truncate">{adminEmail}</div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-400/30 text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20" suppressHydrationWarning>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                suppressHydrationWarning
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent ml-2 outline-none text-sm text-slate-700 placeholder-slate-500 w-32"
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
