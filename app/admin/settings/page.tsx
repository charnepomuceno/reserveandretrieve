'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSettings() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600 mb-8">Configure system-wide settings and preferences</p>
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900">Coming Soon</h3>
            <p className="text-gray-600">System settings configuration in development</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
