'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockLostFoundItems } from '@/lib/mock-data';
import { Search, Plus, Package, AlertCircle } from 'lucide-react';

export default function StudentLostFound() {
  const [items, setItems] = useState(mockLostFoundItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<string | 'all'>('all');

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(items.map((i) => i.category)));

  const statusColors = {
    lost: 'bg-red-100 text-red-800',
    found: 'bg-blue-100 text-blue-800',
    claimed: 'bg-green-100 text-green-800',
    unclaimed: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Lost & Found</h1>
            <p className="text-gray-600">Browse items and file reports</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 gap-2">
            <Plus className="w-4 h-4" />
            Report Lost Item
          </Button>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by item name or description..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Items</option>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                  <option value="unclaimed">Unclaimed</option>
                  <option value="claimed">Claimed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.itemName}
                    className="w-full h-48 object-cover"
                  />
                )}

                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-gray-900">{item.itemName}</h3>
                    <Badge className={statusColors[item.status]}>
                      {item.status === 'unclaimed' ? 'Unclaimed' : item.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
                      <p className="text-gray-700">{item.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                      <p className="text-gray-700">📍 {item.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Reported</p>
                      <p className="text-gray-700">{item.dateReported}</p>
                    </div>
                  </div>

                  {item.status === 'unclaimed' && (
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-sm">
                      Claim This Item
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No items found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setFilterCategory('all');
                setFilterStatus('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
