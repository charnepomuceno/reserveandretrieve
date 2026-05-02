'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function DashboardRoot() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/');
      return;
    }

    // Route to role-specific dashboard
    const dashboardRoutes: Record<string, string> = {
      'org-officer': '/org-officer/dashboard',
      'osa-staff': '/osa-staff/dashboard',
      student: '/student/dashboard',
      admin: '/admin/dashboard',
    };

    const targetRoute = dashboardRoutes[user.role];
    if (targetRoute) {
      router.push(targetRoute);
    }
  }, [user, isAuthenticated, router]);

  return <DashboardLayout>{null}</DashboardLayout>;
}
