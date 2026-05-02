'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">System-wide management and analytics</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600" />
                Admin Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">The Admin interface provides full system control:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ System-wide Dashboard & Analytics</li>
                <li>✓ Reservation Oversight</li>
                <li>✓ Lost & Found Oversight</li>
                <li>✓ Reports & Analytics</li>
                <li>✓ User Management</li>
                <li>✓ System Settings</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">All systems operational. Check reports for detailed analytics.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
