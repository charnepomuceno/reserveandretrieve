'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockLostFoundItems } from '@/lib/mock-data';
import { Search, X, Mail } from 'lucide-react';

export default function StudentLostFound() {
  const router = useRouter();
  const [items] = useState(mockLostFoundItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All Categories');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPingModal, setShowPingModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [pingEmail, setPingEmail] = useState('');
  const [claimDate, setClaimDate] = useState('');
  const [claimTime, setClaimTime] = useState('');

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All Categories' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All Categories', ...Array.from(new Set(items.map((i) => i.category)))];

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
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Lost Items</h1>
        <p className="text-gray-600 mb-8">Search for items that match your lost items</p>


        {/* Search */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by item name, category..."
              className="pl-10 border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Buttons */}
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

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {item.imageUrl && (
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-full h-40 object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${statusColors[item.status]}`}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                )}

                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-4">{item.itemName}</h3>

                  <div className="space-y-3 mb-4">
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
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-gray-600">No items found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Ping Modal */}
      {showPingModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <CardTitle>Ping Possible Owner</CardTitle>
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
              <p className="text-sm text-gray-600">
                Send a notification email to a student&apos;s gbox account letting them know this item might be theirs
              </p>

              <Input
                placeholder="e.g ecbathan@gbox.adnu.edu.ph"
                value={pingEmail}
                onChange={(e) => setPingEmail(e.target.value)}
                className="border-gray-300"
              />

              <Button
                onClick={handlePingOwner}
                className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Ping
              </Button>

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">PREVIOUSLY PINGED</p>
                <p className="text-sm text-gray-700">rabad@gbox.adnu.edu.ph</p>
                <p className="text-xs text-gray-500">Apr 27, 3:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Claim Modal */}
      {showClaimModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
    </DashboardLayout>
  );
}
