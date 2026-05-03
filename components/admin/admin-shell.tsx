'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

type AdminShellProps = {
  children: React.ReactNode;
  /** Wide search in top bar (Users / Reservations mockups) */
  headerSearch?: boolean;
  trailing?: React.ReactNode;
};

export function AdminShell({ children, headerSearch, trailing }: AdminShellProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && user && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader showGlobalSearch={headerSearch} trailing={trailing} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
