'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockLostFoundItems } from '@/lib/mock-data';
import { Search, LogIn } from 'lucide-react';

export default function PublicLostFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All Categories');
  
  // Filter to only show unclaimed/found items
  const publicItems = mockLostFoundItems.filter(item => 
    item.status === 'unclaimed' || item.status === 'found'
  );

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
    </div>
  );
}
