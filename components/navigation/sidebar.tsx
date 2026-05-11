'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { roleNavigation, roleColors } from '@/lib/nav-config';
import { cn } from '@/lib/utils';
import { LogOut, User } from 'lucide-react';

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const navItems = roleNavigation[user.role];
  const colors = roleColors[user.role];

  return (
    <aside className={`w-64 ${colors.bg} border-r border-gray-200 h-screen sticky top-0 overflow-y-auto flex flex-col`}>
      {/* Logo at top */}
      <div className="p-6 border-b border-gray-300">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ADNU%20RSRV-Q9NV1tx9pjEuyCfTsW109f4kLCzAwJ.png"
          alt="OSA Reserve & Retrieve"
          className="w-full h-auto"
        />
      </div>

      {/* Navigation items - expandable */}
      <nav className="px-3 py-6 space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                isActive
                  ? `${colors.accent} text-white`
                  : `${colors.text} hover:${colors.bg} hover:opacity-80`
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User info at bottom */}
      <div className={`border-t border-gray-300 p-4 space-y-3`}>
        <div className={`flex items-center gap-3 px-3 py-2`}>
          <div className={`w-10 h-10 rounded-full ${colors.accent} flex items-center justify-center text-white`}>
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-semibold ${colors.text} truncate`}>{user.name}</p>
            <p className={`text-xs opacity-70 ${colors.text} truncate`}>{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${colors.text} hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm font-medium`}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
