'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockReservations, mockLostFoundItems, mockNotifications } from '@/lib/mock-data';
import { CheckCircle, Clock, AlertCircle, Calendar, Package, Bell } from 'lucide-react';

export default function OSAStaffDashboard() {
  const pendingReservations = mockReservations.filter((r) => r.status === 'pending');
  const pendingClaims = mockLostFoundItems.filter((i) => i.status === 'unclaimed');
  const unreadNotifications = mockNotifications.filter((n) => !n.read);

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">OSA Staff Management Overview</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Reservations</p>
                  <p className="text-3xl font-bold text-gray-900">{pendingReservations.length}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Claims</p>
                  <p className="text-3xl font-bold text-gray-900">{pendingClaims.length}</p>
                </div>
                <Package className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Unread Alerts</p>
                  <p className="text-3xl font-bold text-gray-900">{unreadNotifications.length}</p>
                </div>
                <Bell className="w-10 h-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Reservations</p>
                  <p className="text-3xl font-bold text-gray-900">{mockReservations.length}</p>
                </div>
                <Calendar className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reservations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                Pending Reservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReservations.length > 0 ? (
                  pendingReservations.map((res) => (
                    <div key={res.id} className="border-l-4 border-yellow-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{res.organizationName}</h3>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                          Pending
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{res.venue} • {res.eventDate} at {res.eventTime}</p>
                      <p className="text-xs text-gray-500">{res.attendees} attendees</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No pending reservations</p>
                )}
                {pendingReservations.length > 0 && (
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Review All Requests
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Claims */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Pending Lost & Found Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingClaims.length > 0 ? (
                  pendingClaims.map((item) => (
                    <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{item.itemName}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.location}</p>
                      <p className="text-xs text-gray-500">Reported: {item.dateReported}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No pending claims</p>
                )}
                {pendingClaims.length > 0 && (
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Verify Claims
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Recent Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map((notif) => (
                  <div key={notif.id} className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-gray-900">{notif.title}</h4>
                      <span className="text-xs text-gray-500">{notif.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{notif.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No unread alerts</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
