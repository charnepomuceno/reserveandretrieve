'use client';

import { format } from 'date-fns';
import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

type AdminHeaderProps = {
  showGlobalSearch?: boolean;
  /** Extra controls on the right, before date (e.g. Reports action buttons) */
  trailing?: React.ReactNode;
};

export function AdminHeader({ showGlobalSearch = false, trailing }: AdminHeaderProps) {
  const { user } = useAuth();
  const initial =
    user?.name
      ?.split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'A';

  return (
    <header className="shrink-0 border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {showGlobalSearch ? (
          <div className="relative max-w-xl flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search records..."
              className="h-10 rounded-lg border-gray-200 bg-gray-50 pl-9 shadow-none focus-visible:ring-blue-600"
            />
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex flex-wrap items-center justify-end gap-4">
          {trailing}
          <time className="text-sm text-gray-600 tabular-nums">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </time>
          <button
            type="button"
            className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
            <Avatar className="h-9 w-9 border border-gray-200 bg-blue-600 text-white">
              <AvatarFallback className="bg-blue-600 text-sm font-semibold text-white">{initial}</AvatarFallback>
            </Avatar>
            <span className={cn('hidden text-sm font-medium text-gray-900 sm:inline')}>
              {user?.role === 'admin' ? 'Admin' : user?.name ?? 'User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
