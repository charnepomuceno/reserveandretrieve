'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockLostFoundItems } from '@/lib/mock-data';
import { CheckCircle, XCircle, Package, Tag } from 'lucide-react';

export default function OSAStaffLostFound() {
  const [items, setItems] = useState(mockLostFoundItems);
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found' | 'claimed' | 'unclaimed'>('all');

  const filteredItems = items.filter((item) => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  const handleClaimApprove = (id: string) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, status: 'claimed' as const } : item
    ));
  };

  const handleClaimReject = (id: string) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, status: 'unclaimed' as const } : item
    ));
  };

  const stats = {
    total: items.length,
    lost: items.filter((i) => i.status === 'lost').length,
    found: items.filter((i) => i.status === 'found').length,
    claimed: items.filter((i) => i.status === 'claimed').length,
    unclaimed: items.filter((i) => i.status === 'unclaimed').length,
  };

  const statusColors = {
    lost: 'bg-red-100 text-red-800',
    found: 'bg-blue-100 text-blue-800',
    claimed: 'bg-green-100 text-green-800',
    unclaimed: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Lost & Found Management</h1>
        <p className="text-gray-600 mb-8">Manage lost and found items and verify ownership claims</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Lost</p>
                  <p className="text-2xl font-bold text-red-600">{stats.lost}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Found</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.found}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Claimed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.claimed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Pending Claims</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.unclaimed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <div className="flex gap-4 border-b overflow-x-auto">
              {['all', 'lost', 'found', 'claimed', 'unclaimed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="ml-2 text-sm">({filteredItems.length})</span>
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    {/* Image */}
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{item.itemName}</h3>
                          <Badge className={`mt-2 ${statusColors[item.status]}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
                          <p className="text-sm text-gray-700">{item.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                          <p className="text-sm text-gray-700">{item.description}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                          <p className="text-sm text-gray-700">📍 {item.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Reported</p>
                          <p className="text-sm text-gray-700">{item.dateReported}</p>
                        </div>
                      </div>

                    {item.status === 'unclaimed' && (
                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          onClick={() => handleClaimApprove(item.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 gap-2 text-xs"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve Claim
                        </Button>
                        <Button
                          onClick={() => handleClaimReject(item.id)}
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 text-xs"
                        >
                          <XCircle className="w-4 h-4" />
                          Deny Claim
                        </Button>
                      </div>
                    )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No {activeTab} items</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
