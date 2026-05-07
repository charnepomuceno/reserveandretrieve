'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockReservations } from '@/lib/mock-data';
import { getMonthCalendarDays } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users } from 'lucide-react';

export default function StudentMakeReservation() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); // April 2026
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    startTime: '09:00',
    endTime: '17:00',
    attendees: '',
    eventDescription: '',
    specialRequirements: '',
  });

  // Get approved event dates
  const approvedDates = mockReservations
    .filter((r) => r.status === 'approved')
    .map((r) => r.eventDate);

  // Get pending event dates
  const pendingDates = mockReservations
    .filter((r) => r.status === 'pending')
    .map((r) => r.eventDate);

  const calendarDays = getMonthCalendarDays(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];

    if (selectedDates.length === 0) {
      setSelectedDates([dateStr]);
    } else if (selectedDates.length === 1) {
      const start = new Date(selectedDates[0]);
      const end = new Date(dateStr);

      if (end < start) {
        setSelectedDates([dateStr, selectedDates[0]]);
      } else {
        setSelectedDates([selectedDates[0], dateStr]);
      }
      setShowForm(true);
    } else {
      setSelectedDates([dateStr]);
    }
  };

  const isDateInRange = (date: Date): boolean => {
    if (selectedDates.length < 2) return false;
    const dateStr = date.toISOString().split('T')[0];
    const start = new Date(selectedDates[0]);
    const current = new Date(dateStr);
    const end = new Date(selectedDates[1]);
    return current >= start && current <= end;
  };

  const isDateSelected = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return selectedDates.includes(dateStr);
  };

  const handleSubmit = () => {
    if (!formData.attendees) {
      alert('Please enter number of attendees');
      return;
    }
    const dateRange = selectedDates.length === 1 ? selectedDates[0] : `${selectedDates[0]} to ${selectedDates[1]}`;
    alert(`Reservation submitted for ${dateRange} from ${formData.startTime} to ${formData.endTime}`);
    setShowForm(false);
    setSelectedDates([]);
    setFormData({
      startTime: '09:00',
      endTime: '17:00',
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
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded border border-green-300" />
                    <span className="text-sm text-gray-700">Approved event</span>
                    <div className="w-6 h-6 bg-yellow-100 rounded border border-yellow-300" />
                    <span className="text-sm text-gray-700">Pending approval</span>
                    <div className="w-6 h-6 bg-blue-100 rounded border border-blue-300" />
                    <span className="text-sm text-gray-700">Selected</span>
                  </div>
                </div>

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
                    const dateStr = cell.date.toISOString().split('T')[0];
                    const isApproved = approvedDates.includes(dateStr);
                    const isPending = pendingDates.includes(dateStr);
                    const isSelected = isDateSelected(cell.date);
                    const inRange = isDateInRange(cell.date);

                    return (
                      <button
                        key={cell.date.toISOString()}
                        onClick={() =>
                          cell.currentMonth && !isApproved && !isPending && handleDateClick(cell.date)
                        }
                        disabled={!cell.currentMonth || isApproved || isPending}
                        className={`aspect-square rounded-lg font-semibold transition-colors ${
                          cell.currentMonth
                            ? isApproved
                              ? 'bg-green-100 text-green-900 cursor-not-allowed'
                              : isPending
                              ? 'bg-yellow-100 text-yellow-900 cursor-not-allowed'
                              : isSelected
                              ? 'bg-blue-600 text-white'
                              : inRange
                              ? 'bg-blue-200 text-blue-900'
                              : 'bg-gray-100 text-gray-900 hover:bg-blue-50'
                            : 'bg-white border border-gray-200 text-gray-400 cursor-default'
                        }`}
                      >
                        {cell.label}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reservation Form */}
          <div>
            {selectedDates.length > 0 && showForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Range
                    </label>
                    <Input
                      type="text"
                      value={selectedDates.length === 1 ? selectedDates[0] : `${selectedDates[0]} to ${selectedDates[1]}`}
                      disabled
                      className="border-gray-300 bg-gray-50"
                    />
                    {selectedDates.length === 1 && (
                      <p className="text-xs text-gray-500 mt-1">Click another date to select a range, or submit for single day</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <Input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <Input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Attendees
                    </label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="e.g., 50"
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
                      placeholder="e.g., Study group meeting, club activity..."
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
                      placeholder="e.g., Projector needed, tables required..."
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
                        setSelectedDates([]);
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
