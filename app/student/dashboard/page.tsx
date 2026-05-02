'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockNotifications, mockLostFoundItems } from '@/lib/mock-data';
import { Bell, Package, AlertCircle, Eye } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const recentLostFound = mockLostFoundItems.slice(0, 2);
  const recentNotifications = mockNotifications.slice(0, 3);

  const statusColors = {
    lost: 'bg-red-100 text-red-800',
    found: 'bg-blue-100 text-blue-800',
    claimed: 'bg-green-100 text-green-800',
    unclaimed: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Student Portal - Track lost items and stay updated</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Stats */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Reports</p>
                  <p className="text-3xl font-bold text-gray-900">{mockLostFoundItems.length}</p>
                </div>
                <Package className="w-10 h-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Unread Alerts</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockNotifications.filter((n) => !n.read).length}
                  </p>
                </div>
                <Bell className="w-10 h-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Items Claimed</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockLostFoundItems.filter((i) => i.status === 'claimed').length}
                  </p>
                </div>
                <AlertCircle className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lost & Found Activity */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-red-600" />
                  Recent Lost & Found Items
                </CardTitle>
                <Link href="/student/lost-found">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLostFound.length > 0 ? (
                  recentLostFound.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.itemName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-gray-900">{item.itemName}</h3>
                          <Badge className={statusColors[item.status]}>
                            {item.status === 'unclaimed' ? 'Unclaimed' : item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                        <p className="text-xs text-gray-500 mt-1">📍 {item.location}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No recent items</p>
                )}
              </div>
              <Link href="/student/lost-found">
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Browse All Items
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-red-600" />
                  Recent Notifications
                </CardTitle>
                <Link href="/student/notifications">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.length > 0 ? (
                  recentNotifications.map((notif) => (
                    <div key={notif.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{notif.title}</h4>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-1"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notif.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No notifications</p>
                )}
              </div>
              <Link href="/student/notifications">
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                  View All Notifications
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
