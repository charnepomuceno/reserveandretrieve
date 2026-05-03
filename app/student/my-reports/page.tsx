'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { mockLostFoundItems } from '@/lib/mock-data';

type FoundFilter = 'all' | 'claimed' | 'unclaimed' | 'pending';

export default function FoundItemReportsPage() {
  const [activeFilter, setActiveFilter] = useState<FoundFilter>('all');
  const foundReports = mockLostFoundItems.filter((item) =>
    ['found', 'claimed', 'unclaimed'].includes(item.status)
  );

  const stats = {
    totalFoundItems: foundReports.length,
    claimed: 'bg-green-100 text-green-800',
    unclaimed: 'bg-yellow-100 text-yellow-800',
  };

  const statusColors = {
    found: 'bg-blue-100 text-blue-800',
    claimed: 'bg-green-100 text-green-800',
    unclaimed: 'bg-yellow-100 text-yellow-800',
  };

  const filteredReports = useMemo(() => {
    if (activeFilter === 'all') return foundReports;
    if (activeFilter === 'pending') {
      return foundReports.filter((item) => item.status === 'found');
    }
    return foundReports.filter((item) => item.status === activeFilter);
  }, [activeFilter, foundReports]);

  const statusLabel = (status: string) => {
    if (status === 'unclaimed') return 'UNCLAIMED';
    if (status === 'claimed') return 'CLAIMED';
    return 'PENDING';
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Found Item Reports</h1>
        <p className="text-gray-600 mb-8">Track your found item reports and current claim status.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">TOTAL FOUND ITEMS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{stats.totalFoundItems}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">FOUND ITEMS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{foundReports.filter((i) => i.status === 'claimed').length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">UNCLAIMED</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{foundReports.filter((i) => i.status === 'unclaimed').length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              {(['all', 'claimed', 'unclaimed', 'pending'] as const).map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  className={activeFilter === filter ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Item Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Found</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900">{report.itemName}</td>
                      <td className="py-4 px-4 text-gray-700">{report.category}</td>
                      <td className="py-4 px-4 text-gray-700">{report.dateReported}</td>
                      <td className="py-4 px-4 text-gray-700">{report.location}</td>
                      <td className="py-4 px-4">
                        <Badge className={statusColors[report.status as keyof typeof statusColors] ?? 'bg-blue-100 text-blue-800'}>
                          {statusLabel(report.status)}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="outline" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredReports.length === 0 && (
              <p className="text-gray-600 text-center py-6">No reports found for this filter.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
