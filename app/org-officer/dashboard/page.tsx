'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockReservations, mockNotifications } from '@/lib/mock-data';
import { Calendar, Bell, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function OrgOfficerDashboard() {
  // Get pending and approved reservations
  const pendingReservations = mockReservations.filter((r) => r.status === 'pending');
  const approvedReservations = mockReservations.filter((r) => r.status === 'approved');
  const unreadNotifications = mockNotifications.filter((n) => !n.read);

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s an overview of your organization&apos;s activities.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pending Reservations Card */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-900">Pending Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 mb-2">{pendingReservations.length}</div>
              <p className="text-xs text-blue-700">Awaiting approval</p>
            </CardContent>
          </Card>

          {/* Approved Reservations Card */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-900">Approved Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 mb-2">{approvedReservations.length}</div>
              <p className="text-xs text-green-700">Confirmed events</p>
            </CardContent>
          </Card>

          {/* Unread Notifications Card */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-amber-900">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900 mb-2">{unreadNotifications.length}</div>
              <p className="text-xs text-amber-700">New messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservation Status Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Reservation Status</CardTitle>
                  <CardDescription>Current reservations overview</CardDescription>
                </div>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReservations.slice(0, 3).map((res) => (
                  <div key={res.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{res.organizationName}</h3>
                      <p className="text-sm text-gray-600 mb-2">{res.venue}</p>
                      <p className="text-xs text-gray-500">{res.eventDate} at {res.eventTime}</p>
                    </div>
                    <Badge
                      className={
                        res.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : res.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {res.status === 'approved' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approved
                        </>
                      ) : res.status === 'pending' ? (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </>
                      ) : (
                        'Cancelled'
                      )}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link href="/org-officer/reservations">
                <Button variant="outline" className="w-full mt-4">
                  View All Reservations
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Notifications Preview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Notifications Preview</CardTitle>
                  <CardDescription>Recent updates and alerts</CardDescription>
                </div>
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockNotifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border transition ${
                      notif.read
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        notif.read ? 'bg-gray-400' : 'bg-blue-600'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${
                          notif.read ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notif.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notif.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/org-officer/notifications">
                <Button variant="outline" className="w-full mt-4">
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
