'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockLostFoundItems } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import { Package, Bell, ArrowRight, Map } from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const recentItems = mockLostFoundItems.slice(0, 3);
  const unclaimedCount = mockLostFoundItems.filter((i) => i.status === 'unclaimed').length;

  const stats = {
    itemsFound: mockLostFoundItems.filter((i) => i.status === 'found').length,
    unclaimed: unclaimedCount,
    browsing: mockLostFoundItems.length,
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Manage your lost items and browse found items</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Items Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{stats.browsing}</p>
              <p className="text-xs text-gray-500 mt-1">in the lost & found</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Unclaimed Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">{stats.unclaimed}</p>
              <p className="text-xs text-gray-500 mt-1">awaiting owner claim</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Package className="w-4 h-4" />
                My Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{mockLostFoundItems.length}</p>
              <p className="text-xs text-gray-500 mt-1">reports submitted</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => router.push('/student/lost-found')}
                className="bg-blue-600 hover:bg-blue-700 gap-2 h-auto py-3"
              >
                <Package className="w-4 h-4" />
                <span>Browse Lost Items</span>
              </Button>
              <Button
                onClick={() => router.push('/student/heatmap')}
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 gap-2 h-auto py-3"
              >
                <Map className="w-4 h-4" />
                <span>View Heatmap</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Items Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Listed Items</CardTitle>
            <Button
              variant="ghost"
              onClick={() => router.push('/student/lost-found')}
              className="gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {recentItems.length > 0 ? (
              <div className="space-y-4">
                {recentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push('/student/lost-found')}
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{item.itemName}</h3>
                        <Badge
                          className={`text-xs ${
                            item.status === 'claimed'
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'found'
                              ? 'bg-blue-100 text-blue-800'
                              : item.status === 'unclaimed'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-xs text-gray-500 mt-1">📍 {item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No items listed yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
