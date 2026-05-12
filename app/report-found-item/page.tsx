'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, AlertTriangle, Info, MapPin, ArrowLeft, X } from 'lucide-react';

const LOCATION_PRESETS = [
  'Ateneo Main Building',
  'Bonoan Building',
  'Dolan Building',
  'Xavier Hall',
  'Library',
  'Covered Courts',
  'Chemistry Lab',
  'Phelan Building',
  'Other',
];

const CATEGORIES = [
  'Electronics',
  'Accessories',
  'Documents',
  'Personal Items',
  'Clothing',
  'Books',
  'Other',
];

const LOCATION_MARKERS: Record<string, { left: string; top: string }> = {
  'Ateneo Main Building': { left: '50%', top: '55%' },
  'Bonoan Building': { left: '58%', top: '34%' },
  'Dolan Building': { left: '26%', top: '28%' },
  'Xavier Hall': { left: '31%', top: '74%' },
  Library: { left: '44%', top: '20%' },
  'Covered Courts': { left: '78%', top: '43%' },
  'Chemistry Lab': { left: '69%', top: '66%' },
  'Phelan Building': { left: '24%', top: '57%' },
  Other: { left: '50%', top: '52%' },
};

export default function ReportFoundItem() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: '',
    dateFound: new Date().toISOString().split('T')[0],
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.dateFound) {
      newErrors.dateFound = 'Date found is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setShowSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  const selectedMarker = LOCATION_MARKERS[formData.location || 'Other'] || LOCATION_MARKERS.Other;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-green-500">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for reporting this found item. It will be safely stored at the OSA office for the owner to claim.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to home page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/adnu-rsrv-logo.png" 
            alt="Reserve and Retrieve Logo" 
            className="h-16"
          />
          <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Browse</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="border border-gray-200">
          <CardHeader className="border-b">
            <CardTitle className="text-4xl">Report Found Item</CardTitle>
            <p className="text-gray-600 mt-2">Share the details of the item you found so it can be reunited with its owner.</p>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Warning Banners */}
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">
                  <strong>Do not include sensitive details.</strong> Found items will be physically surrendered to the OSA office.
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Please bring the item to the OSA office within 48 hours for proper documentation and storage.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Found Item Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Found Item Details</h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location Found <span className="text-red-600">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`grow px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select location</option>
                        {LOCATION_PRESETS.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                      <Button
                        type="button"
                        className="gap-2 bg-blue-600 hover:bg-blue-700 whitespace-nowrap h-11"
                        onClick={() => setShowMapModal(true)}
                      >
                        <MapPin className="w-4 h-4" />
                        Map
                      </Button>
                    </div>
                    {errors.location && (
                      <p className="text-sm text-red-600 mt-1">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dateFound" className="block text-sm font-medium text-gray-700 mb-2">
                      Date Found <span className="text-red-600">*</span>
                    </label>
                    <Input
                      id="dateFound"
                      name="dateFound"
                      type="date"
                      value={formData.dateFound}
                      onChange={handleChange}
                      className={`h-11 ${errors.dateFound ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.dateFound && (
                      <p className="text-sm text-red-600 mt-1">{errors.dateFound}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-gray-600 text-sm">Click to upload image of the item</p>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contact Information</h3>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-11 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 justify-end">
                <Link href="/">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white gap-2 px-6"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Found Item Report'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <Card className="w-full max-w-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
              <div>
                <CardTitle className="text-xl">Location Preview</CardTitle>
                <p className="mt-1 text-sm text-gray-600">
                  {formData.location || 'Ateneo de Naga University'}
                </p>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                aria-label="Close map preview"
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative overflow-hidden rounded-lg border border-gray-200">
                <img
                  src="/adnu-campus-map.png"
                  alt="ADNU campus map"
                  className="h-auto w-full"
                />
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: selectedMarker.left, top: selectedMarker.top }}
                >
                  <div className="relative">
                    <MapPin className="h-8 w-8 fill-red-500 text-red-500 drop-shadow" />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white/95 px-2 py-0.5 text-xs font-medium text-gray-700 shadow">
                      {formData.location || 'Selected location'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
