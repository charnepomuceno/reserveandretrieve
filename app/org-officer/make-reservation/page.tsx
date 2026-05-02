'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockReservations } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users } from 'lucide-react';

export default function MakeReservationPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 4)); // May 2024
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    eventTime: '09:00',
    attendees: '',
    eventDescription: '',
    specialRequirements: '',
  });

  // Get approved event dates
  const approvedDates = mockReservations
    .filter((r) => r.status === 'approved')
    .map((r) => new Date(r.eventDate).getDate());

  // Get pending event dates
  const pendingDates = mockReservations
    .filter((r) => r.status === 'pending')
    .map((r) => new Date(r.eventDate).getDate());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!formData.attendees) {
      alert('Please enter number of attendees');
      return;
    }
    alert(`Reservation submitted for ${selectedDate} at ${formData.eventTime}`);
    setShowForm(false);
    setSelectedDate(null);
    setFormData({
      eventTime: '09:00',
      attendees: '',
      eventDescription: '',
      specialRequirements: '',
    });
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Make a Reservation</h1>
        <p className="text-gray-600 mb-8">Click on an available date to create a new event reservation</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
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

                {/* Empty days */}
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {days.map((day) => {
                  const isApproved = approvedDates.includes(day);
                  const isPending = pendingDates.includes(day);
                  const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={day}
                      onClick={() => !isApproved && !isPending && handleDateClick(day)}
                      disabled={isApproved || isPending}
                      className={`aspect-square rounded-lg font-semibold transition-colors ${
                        isApproved
                          ? 'bg-green-100 text-green-900 cursor-not-allowed'
                          : isPending
                          ? 'bg-yellow-100 text-yellow-900 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-blue-50'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Legend */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded border border-green-300" />
                <span className="text-sm text-gray-700">Approved event</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded border border-yellow-300" />
                <span className="text-sm text-gray-700">Pending approval</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded border border-blue-300" />
                <span className="text-sm text-gray-700">Selected</span>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div>
            {selectedDate && showForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <Input
                      type="text"
                      value={selectedDate}
                      disabled
                      className="border-gray-300 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={formData.eventTime}
                      onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Attendees
                    </label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="e.g., 100"
                      value={formData.attendees}
                      onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Description
                    </label>
                    <textarea
                      placeholder="e.g., Academic seminar with stage setup and seating..."
                      value={formData.eventDescription}
                      onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requirements
                    </label>
                    <textarea
                      placeholder="e.g., Booth setup needed, stage required..."
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        setShowForm(false);
                        setSelectedDate(null);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Calendar className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">Select a Date</p>
                  <p className="text-sm text-gray-500">Click on an available date to start creating your reservation</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
