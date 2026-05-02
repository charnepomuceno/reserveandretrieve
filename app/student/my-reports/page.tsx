'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockLostFoundItems, mockStudentNotifications } from '@/lib/mock-data';

export default function MyReports() {
  const userReports = mockLostFoundItems; // In a real app, filter by user
  const userNotifications = mockStudentNotifications;
  
  const stats = {
    total: userReports.length,
    found: userReports.filter((i) => i.status === 'claimed').length,
    searching: userReports.filter((i) => i.status !== 'claimed').length,
  };

  const statusColors = {
    lost: 'bg-red-100 text-red-800',
    found: 'bg-blue-100 text-blue-800',
    claimed: 'bg-green-100 text-green-800',
    unclaimed: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Reports & Notifications</h1>
        <p className="text-gray-600 mb-8">Track your lost item reports and recent updates from the losses and claims system.</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">TOTAL REPORTS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">FOUND ITEMS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{stats.found}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">STILL SEARCHING</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{stats.searching}</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Item Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Lost</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900">{report.itemName}</td>
                      <td className="py-4 px-4 text-gray-700">{report.category}</td>
                      <td className="py-4 px-4 text-gray-700">{report.dateReported}</td>
                      <td className="py-4 px-4 text-gray-700">{report.location}</td>
                      <td className="py-4 px-4">
                        <Badge className={statusColors[report.status]}>
                          {report.status === 'unclaimed' ? 'UNCLAIMED' : report.status === 'claimed' ? 'CLAIMED' : report.status.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {userNotifications.length > 0 ? (
              <div className="space-y-4">
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No notifications</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
