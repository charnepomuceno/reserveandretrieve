'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockPublicLostFoundItems } from '@/lib/mock-data';
import { Search, LogIn, Mail, X } from 'lucide-react';

export default function PublicLostFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All Categories');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPingModal, setShowPingModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [pingEmail, setPingEmail] = useState('');
  const [claimDate, setClaimDate] = useState('');
  const [claimTime, setClaimTime] = useState('');
  
  const publicItems = mockPublicLostFoundItems;

  const filteredItems = publicItems.filter((item) => {
    const matchesSearch = 
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      filterCategory === 'All Categories' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All Categories', ...Array.from(new Set(publicItems.map((i) => i.category)))];

  const statusColors = {
    lost: 'bg-red-100 text-red-800',
    found: 'bg-blue-100 text-blue-800',
    claimed: 'bg-green-100 text-green-800',
    unclaimed: 'bg-yellow-100 text-yellow-800',
  };

  const handlePingOwner = () => {
    if (pingEmail) {
      alert(`Ping sent to ${pingEmail} about "${selectedItem.itemName}"`);
      setPingEmail('');
      setShowPingModal(false);
    }
  };

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

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={() => window.location.href = '/login'}>
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Browse Lost & Found Items</h1>
          <p className="text-lg text-gray-600">Help reunite lost items with their owners. Search our database of reported lost and found items.</p>
        </div>

        {/* Search & Filter */}
        <Card className="mb-8 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by item name..."
                className="pl-10 h-12 border-gray-300 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Filter by Category:</p>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={filterCategory === cat ? 'default' : 'outline'}
                    onClick={() => setFilterCategory(cat)}
                    className={filterCategory === cat ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredItems.length} of {publicItems.length} items
        </p>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                {item.imageUrl && (
                  <div className="relative h-40 bg-gray-200">
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.fallbackApplied) {
                          img.dataset.fallbackApplied = '1';
                          img.src = '/item-placeholder.svg';
                        }
                      }}
                    />
                    <Badge className={`absolute top-2 right-2 ${statusColors[item.status]}`}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                )}

                <CardContent className="pt-4 grow flex flex-col">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.itemName}</h3>
                  
                  <div className="space-y-2 mb-4 grow">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
                      <p className="text-sm font-medium text-gray-700">{item.category}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowClaimModal(true);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-sm"
                    >
                      Claim Item
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowPingModal(true);
                      }}
                      variant="outline"
                      className="w-full text-blue-600 border-blue-300 hover:bg-blue-50 text-sm"
                    >
                      Ping Possible Owner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No items found matching your search.</p>
            <p className="text-gray-500">Try adjusting your search or browse all categories.</p>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="font-semibold text-gray-900 mb-2">Browse Items</h3>
                <p className="text-sm text-gray-600">Search our database of lost and found items reported by staff and visitors.</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">Report an Item</h3>
                <p className="text-sm text-gray-600">Found something? Report it without logging in. Just provide your email.</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">Claim or Resolve</h3>
                <p className="text-sm text-gray-600">Contact the OSA office to claim your item or provide more information.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Ping Modal */}
      {showPingModal && selectedItem && (
        <div className="fixed inset-0 bg-black/35 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <div>
                <CardTitle>Ping Possible Owner</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Send a notification email to a student&apos;s gbox account letting them know this item might be theirs.
                </p>
              </div>
              <button
                aria-label="Close ping modal"
                onClick={() => {
                  setShowPingModal(false);
                  setPingEmail('');
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="e.g ecbathan@gbox.adnu.edu.ph"
                  value={pingEmail}
                  onChange={(e) => setPingEmail(e.target.value)}
                  className="border-gray-300 h-11"
                />
                <Button
                  onClick={handlePingOwner}
                  className="bg-blue-600 hover:bg-blue-700 gap-2 h-11 sm:px-6"
                >
                  <Mail className="w-4 h-4" />
                  Send Ping
                </Button>
              </div>

              <div className="border-t pt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">PREVIOUSLY PINGED</p>
                  <p className="text-sm text-gray-700">rabad@gbox.adnu.edu.ph</p>
                </div>
                <p className="text-xs text-gray-500">Apr 27, 3:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Claim Modal */}
      {showClaimModal && selectedItem && (
        <div className="fixed inset-0 bg-black/35 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <CardTitle>Claim Item</CardTitle>
              <button
                aria-label="Close claim modal"
                onClick={() => {
                  setShowClaimModal(false);
                  setClaimDate('');
                  setClaimTime('');
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-gray-600">
                Select a date and time to claim your item. Office hours are 7:30 AM - 12:00 PM and 1:00 PM - 5:00 PM.
              </p>

              <div>
                <label htmlFor="claim-date" className="block text-sm font-medium text-gray-700 mb-2">Claim Date</label>
                <Input
                  id="claim-date"
                  type="date"
                  value={claimDate}
                  onChange={(e) => setClaimDate(e.target.value)}
                  className="border-gray-300"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label htmlFor="claim-time" className="block text-sm font-medium text-gray-700 mb-2">Claim Time</label>
                <select
                  id="claim-time"
                  value={claimTime}
                  onChange={(e) => setClaimTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time</option>
                  <optgroup label="Morning (7:30 AM - 12:00 PM)">
                    <option value="07:30">7:30 AM</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="08:30">8:30 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="09:30">9:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                  </optgroup>
                  <optgroup label="Afternoon (1:00 PM - 5:00 PM)">
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="16:30">4:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </optgroup>
                </select>
              </div>

              <Button
                onClick={() => {
                  if (claimDate && claimTime) {
                    alert(`Claim scheduled for ${claimDate} at ${claimTime}. You will be notified when ready.`);
                    setShowClaimModal(false);
                    setClaimDate('');
                    setClaimTime('');
                  } else {
                    alert('Please select both date and time.');
                  }
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Schedule Claim
              </Button>

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">CLAIM LOCATION</p>
                <p className="text-sm text-gray-700">ADNU Office of Student Affairs Office</p>
                <p className="text-sm text-gray-700">Xavier Hall, 2nd Floor</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
