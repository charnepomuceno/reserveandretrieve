'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockOsaStaffNotifications } from '@/lib/mock-data';
import { CheckCircle, Trash2, Calendar, Package, AlertCircle, Bell } from 'lucide-react';

export default function OSAStaffNotifications() {
  const [notifications, setNotifications] = useState(mockOsaStaffNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const typeIcons = {
    reservation: <Calendar className="w-5 h-5 text-blue-600" />,
    claim: <Package className="w-5 h-5 text-green-600" />,
    system: <AlertCircle className="w-5 h-5 text-red-600" />,
  };

  const typeColors = {
    reservation: 'bg-blue-50 border-blue-200',
    claim: 'bg-green-50 border-green-200',
    system: 'bg-red-50 border-red-200',
  };

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Approval requests, claim notifications, and system alerts</p>
          </div>
          {stats.unread > 0 && (
            <Badge className="bg-red-100 text-red-800 text-lg px-3 py-1">
              {stats.unread} Unread
            </Badge>
          )}
        </div>

        {/* Filter Tabs */}
        <Card className="mb-8 mt-8">
          <CardHeader>
            <div className="flex gap-4 border-b">
              {['all', 'unread', 'read'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab as any)}
                  className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                    filter === tab
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="ml-2 text-sm">({filteredNotifications.length})</span>
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`border rounded-lg p-4 ${typeColors[notif.type]} ${
                      !notif.read ? 'border-l-4' : 'border-l'
                    } transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{typeIcons[notif.type]}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className={`font-semibold text-gray-900 ${!notif.read ? 'font-bold' : ''}`}>
                            {notif.title}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{notif.date}</span>
                        </div>

                        <p className="text-sm text-gray-700 mb-4">{notif.message}</p>

                        <div className="flex gap-2">
                          {!notif.read && (
                            <Button
                              onClick={() => handleMarkAsRead(notif.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDelete(notif.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No {filter} notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
