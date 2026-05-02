'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLostFound() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Lost & Found Oversight</h1>
        <p className="text-gray-600 mb-8">Monitor all items and claims across the system</p>
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900">Coming Soon</h3>
            <p className="text-gray-600">System-wide lost & found oversight in development</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
