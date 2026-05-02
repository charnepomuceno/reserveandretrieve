'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockReservations } from '@/lib/mock-data';
import { Calendar, Plus, CheckCircle, Clock, X } from 'lucide-react';
import { MakeReservationModal, type ReservationFormData } from '@/components/org-officer/make-reservation-modal';

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'cancelled'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservations, setReservations] = useState(mockReservations);

  const handleMakeReservation = (formData: ReservationFormData) => {
    // Create new reservation object
    const newReservation = {
      id: `res-${Date.now()}`,
      organizationName: 'TACTICS Organization', // This would come from user context in production
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      venue: formData.venue,
      status: 'pending' as const,
      createdDate: new Date().toISOString().split('T')[0],
      attendees: formData.attendees,
    };

    // Add to reservations list
    setReservations([newReservation, ...reservations]);

    // Close modal
    setIsModalOpen(false);

    // Show success message (in a real app, this would be a toast notification)
    console.log('[v0] Reservation submitted successfully:', newReservation);
  };

  const filteredReservations = reservations.filter((res) => {
    if (activeTab === 'all') return true;
    return res.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reservations</h1>
            <p className="text-gray-600">Manage and view all your organization&apos;s reservations</p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Plus className="w-4 h-4" />
            Make Reservation
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['all', 'pending', 'approved', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 text-sm">
                ({reservations.filter((r) => activeTab === 'all' || r.status === tab).length})
              </span>
            </button>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservations List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res) => (
                <Card key={res.id} className="hover:shadow-lg transition">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {res.organizationName}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{res.eventDate} at {res.eventTime}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Venue:</strong> {res.venue}
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Attendees:</strong> {res.attendees}
                          </div>
                          <div className="text-xs text-gray-500 mt-3">
                            Created on {res.createdDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-4">
                        <Badge className={`${getStatusColor(res.status)} gap-1`}>
                          {getStatusIcon(res.status)}
                          {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {res.status === 'pending' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reservations</h3>
                  <p className="text-gray-600 mb-4">You don&apos;t have any {activeTab} reservations.</p>
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Your First Reservation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Calendar & Quick Actions */}
          <div className="space-y-6">
            {/* Calendar Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Month Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">May 2024</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">←</Button>
                      <Button variant="ghost" size="sm">→</Button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((date) => (
                      <button
                        key={date}
                        className={`aspect-square rounded text-sm font-medium transition ${
                          [10, 15, 22].includes(date)
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>

                  {/* Event Indicators */}
                  <div className="pt-4 border-t space-y-2">
                    <p className="text-xs font-semibold text-gray-900 mb-2">Upcoming Events:</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">May 10 - Sports Federation</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">May 15 - Debate Club</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">May 22 - Culture Night</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Reservations Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Total Reservations</span>
                  <span className="text-2xl font-bold text-gray-900">{reservations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Pending Review</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    {reservations.filter((r) => r.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Approved Events</span>
                  <span className="text-2xl font-bold text-green-600">
                    {reservations.filter((r) => r.status === 'approved').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Make Reservation Modal */}
        <MakeReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleMakeReservation}
        />
      </div>
    </DashboardLayout>
  );
}
