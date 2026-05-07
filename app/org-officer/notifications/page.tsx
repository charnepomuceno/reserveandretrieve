'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockOrgNotifications } from '@/lib/mock-data';
import { Bell, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'reservation' | 'system'>('all');
  const filteredNotifications = mockOrgNotifications.filter((notif) => {
    if (filter === 'all') return true;
    return filter === 'reservation' ? notif.type === 'reservation' : notif.type === 'system';
  });

  const unreadCount = filteredNotifications.filter((n) => !n.read).length;

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

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              filter === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({mockOrgNotifications.length})
          </button>
          <button
            onClick={() => setFilter('reservation')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              filter === 'reservation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Reservations ({mockOrgNotifications.filter((n) => n.type === 'reservation').length})
          </button>
          <button
            onClick={() => setFilter('system')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              filter === 'system'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            System ({mockOrgNotifications.filter((n) => n.type === 'system').length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
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
