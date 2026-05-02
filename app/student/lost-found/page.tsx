'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockLostFoundItems } from '@/lib/mock-data';
import { Search, X, Mail } from 'lucide-react';

export default function StudentLostFound() {
  const [items] = useState(mockLostFoundItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All Categories');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPingModal, setShowPingModal] = useState(false);
  const [pingEmail, setPingEmail] = useState('');

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
                        setShowPingModal(true);
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
              <button onClick={() => {
                setShowPingModal(false);
                setPingEmail('');
              }}>
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
    </DashboardLayout>
  );
}
