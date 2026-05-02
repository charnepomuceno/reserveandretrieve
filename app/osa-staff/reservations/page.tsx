'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockReservations } from '@/lib/mock-data';
import { getMonthCalendarDays } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, Calendar, ChevronLeft, ChevronRight, Send } from 'lucide-react';

export default function OSAStaffReservations() {
  const [reservations, setReservations] = useState(mockReservations);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'cancelled'>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); // April 2026
  const [selectedDateEvent, setSelectedDateEvent] = useState<string | null>(null);

  const groupedReservations = Object.values(
    reservations.reduce((acc, res) => {
      const key = `${res.organizationName}|${res.eventTime}|${res.venue}|${res.status}`;
      if (!acc[key]) {
        acc[key] = { ...res, dates: [res.eventDate] };
      } else {
        acc[key].dates.push(res.eventDate);
      }
      return acc;
    }, {} as Record<string, any>)
  );

  const formatDateRange = (dates: string[]) => {
    const sorted = [...dates].sort();
    if (sorted.length === 1) {
      return new Date(sorted[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return `${new Date(sorted[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(sorted[sorted.length - 1]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const filteredReservations = groupedReservations.filter((res) => {
    if (activeTab === 'all') return true;
    return res.status === activeTab;
  });

  const handleEndorse = (id: string) => {
    setReservations(reservations.map((res) =>
      res.id === id ? { ...res, status: 'approved' as const } : res
    ));
    alert('Reservation endorsed for approval and email sent to higher authority');
  };

  const handleReject = (id: string) => {
    setReservations(reservations.map((res) =>
      res.id === id ? { ...res, status: 'cancelled' as const } : res
    ));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const calendarDays = getMonthCalendarDays(currentMonth);

  const getReservationsByDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return reservations.filter((r) => r.eventDate === dateStr);
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    approved: reservations.filter((r) => r.status === 'approved').length,
    cancelled: reservations.filter((r) => r.status === 'cancelled').length,
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reservation Management</h1>
        <p className="text-gray-600 mb-8">Review and manage all organization reservation requests</p>

        {/* Calendar View */}
        <Card className="mb-8 max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((cell) => {
                const dayReservations = cell.currentMonth ? getReservationsByDate(cell.date) : [];
                const hasApproved = dayReservations.some((r) => r.status === 'approved');
                const hasPending = dayReservations.some((r) => r.status === 'pending');

                return (
                  <button
                    key={cell.date.toISOString()}
                    onClick={() => cell.currentMonth && dayReservations.length > 0 && setSelectedDateEvent(cell.date.toISOString().split('T')[0])}
                    className={`aspect-square p-2 rounded-lg border-2 transition-colors text-sm font-semibold ${
                      cell.currentMonth
                        ? hasApproved
                          ? 'bg-green-50 border-green-300 text-green-900'
                          : hasPending
                          ? 'bg-yellow-50 border-yellow-300 text-yellow-900 cursor-pointer hover:bg-yellow-100'
                          : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        : 'bg-white border-transparent text-gray-300 cursor-default'
                    }`}
                    disabled={!cell.currentMonth}
                  >
                    <div>{cell.label}</div>
                    {dayReservations.length > 0 && (
                      <div className="text-xs mt-1">{dayReservations.length} event{dayReservations.length > 1 ? 's' : ''}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex gap-4 border-b">
              {['all', 'pending', 'approved', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="ml-2 text-sm">({filteredReservations.length})</span>
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {filteredReservations.length > 0 ? (
              <div className="space-y-4">
                {filteredReservations.map((res) => (
                  <div key={res.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{res.organizationName}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          📍 {res.venue} • 📅 {formatDateRange(res.dates)} at {res.eventTime}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          👥 Expected attendees: {res.attendees}
                        </p>
                      </div>
                      <Badge
                        className={`whitespace-nowrap ${
                          res.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : res.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                      </Badge>
                    </div>

                    {res.status === 'pending' && (
                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          onClick={() => handleEndorse(res.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Endorse
                        </Button>
                        <Button
                          onClick={() => handleReject(res.id)}
                          variant="outline"
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No {activeTab} reservations</p>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
