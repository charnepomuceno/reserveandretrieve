'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockNotifications } from '@/lib/mock-data';
import { Bell, CheckCircle, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reservation':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'claim':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
              : 'All notifications read'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            All
          </Button>
          <Button variant="outline">
            Reservations
          </Button>
          <Button variant="outline">
            Claims
          </Button>
          <Button variant="outline">
            System
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {mockNotifications.length > 0 ? (
            mockNotifications.map((notif) => (
              <Card
                key={notif.id}
                className={`transition ${
                  notif.read
                    ? 'border-gray-200 bg-white'
                    : 'border-blue-300 bg-blue-50'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notif.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`text-lg font-semibold ${
                            notif.read ? 'text-gray-900' : 'text-gray-900 font-bold'
                          }`}>
                            {notif.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {notif.message}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-xs text-gray-500">{notif.date}</span>
                        <Badge
                          variant="secondary"
                          className={
                            notif.type === 'reservation'
                              ? 'bg-blue-100 text-blue-800'
                              : notif.type === 'claim'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }
                        >
                          {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    {!notif.read && (
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        Mark as read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
                <p className="text-gray-600">You&apos;re all caught up! Check back later.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

import { Calendar } from 'lucide-react';
