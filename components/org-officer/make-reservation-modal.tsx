'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ADNU_VENUES } from '@/lib/mock-data';
import { X } from 'lucide-react';

interface MakeReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReservationFormData) => void;
}

export interface ReservationFormData {
  eventDate: string;
  eventTime: string;
  venue: string;
  attendees: number;
  eventDescription: string;
  requirements: string;
}

export function MakeReservationModal({
  isOpen,
  onClose,
  onSubmit,
}: MakeReservationModalProps) {
  const [formData, setFormData] = useState<ReservationFormData>({
    eventDate: '',
    eventTime: '',
    venue: '',
    attendees: 0,
    eventDescription: '',
    requirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'attendees' ? parseInt(value) || 0 : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
    if (!formData.eventTime) newErrors.eventTime = 'Event time is required';
    if (!formData.venue) newErrors.venue = 'Venue is required';
    if (formData.attendees <= 0) newErrors.attendees = 'Number of attendees must be greater than 0';
    if (!formData.eventDescription.trim())
      newErrors.eventDescription = 'Event description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        eventDate: '',
        eventTime: '',
        venue: '',
        attendees: 0,
        eventDescription: '',
        requirements: '',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Make a Reservation</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new reservation for your organization.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date *
              </label>
              <Input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="border-gray-300"
              />
              {errors.eventDate && (
                <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Time *
              </label>
              <Input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                className="border-gray-300"
              />
              {errors.eventTime && (
                <p className="text-red-500 text-xs mt-1">{errors.eventTime}</p>
              )}
            </div>
          </div>

          {/* Venue and Attendees */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue *
              </label>
              <select
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a venue</option>
                {ADNU_VENUES.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
              {errors.venue && (
                <p className="text-red-500 text-xs mt-1">{errors.venue}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Attendees *
              </label>
              <Input
                type="number"
                name="attendees"
                value={formData.attendees || ''}
                onChange={handleChange}
                placeholder="0"
                className="border-gray-300"
                min="1"
              />
              {errors.attendees && (
                <p className="text-red-500 text-xs mt-1">{errors.attendees}</p>
              )}
            </div>
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Description *
            </label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              placeholder="Describe the nature and purpose of your event..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.eventDescription && (
              <p className="text-red-500 text-xs mt-1">{errors.eventDescription}</p>
            )}
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requirements (Optional)
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Any equipment, setup requirements, or special accommodations needed..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Reservation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
