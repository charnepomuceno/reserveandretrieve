'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockLostFoundItems } from '@/lib/mock-data';

export default function LostItemReportsPage() {
  const lostReports = mockLostFoundItems.filter((item) => item.status === 'lost');

  const stats = {
    totalReports: lostReports.length,
    foundItems: mockLostFoundItems.filter((item) => item.status === 'claimed').length,
    stillSearching: lostReports.length - mockLostFoundItems.filter((item) => item.status === 'claimed').length,
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Lost Item Reports</h1>
        <p className="text-gray-600 mb-8">Track your lost item reports and search progress.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">TOTAL REPORTS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{stats.totalReports}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">FOUND ITEMS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{stats.foundItems}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">STILL SEARCHING</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{Math.max(stats.stillSearching, 0)}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lost Item Reports</CardTitle>
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
                  {lostReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900">{report.itemName}</td>
                      <td className="py-4 px-4 text-gray-700">{report.category}</td>
                      <td className="py-4 px-4 text-gray-700">{report.dateReported}</td>
                      <td className="py-4 px-4 text-gray-700">{report.location}</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-red-100 text-red-800">SEARCHING</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {lostReports.length === 0 && (
              <p className="text-gray-600 text-center py-6">No lost item reports yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
