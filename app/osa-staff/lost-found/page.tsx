'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockLostFoundItems } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader as ModalHeader,
  DialogTitle as ModalTitle,
} from '@/components/ui/dialog';
import { CheckCircle, Package, Plus, Upload } from 'lucide-react';

export default function OSAStaffLostFound() {
  const [items, setItems] = useState(mockLostFoundItems);
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found' | 'claimed' | 'unclaimed'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    status: 'lost' as 'lost' | 'found' | 'claimed' | 'unclaimed',
    dateReported: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const resetAddForm = () => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl('');
    setErrors({});
    setForm({
      itemName: '',
      category: '',
      status: 'lost',
      dateReported: '',
      description: '',
    });
  };

  const validateAddForm = () => {
    const next: Record<string, string> = {};
    if (!form.itemName.trim()) next.itemName = 'Item name is required';
    if (!form.category.trim()) next.category = 'Category is required';
    if (!form.dateReported) next.dateReported = 'Date lost is required';
    if (!form.description.trim()) next.description = 'Description is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddForm()) return;

    const nextItem = {
      id: `item-${Date.now()}`,
      itemName: form.itemName.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      location: '—',
      dateReported: form.dateReported,
      status: form.status,
      imageUrl: imagePreviewUrl || undefined,
    } as const;

    setItems((prev) => [nextItem as any, ...prev]);
    setIsAddOpen(false);
    resetAddForm();
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Lost & Found Management</h1>
            <p className="text-gray-600">Manage lost and found items and verify ownership claims</p>
          </div>
        </div>

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

        <Dialog open={isAddOpen} onOpenChange={(open) => {
          setIsAddOpen(open);
          if (!open) resetAddForm();
        }}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <ModalHeader>
              <ModalTitle>Upload Lost/Lost Item</ModalTitle>
              <DialogDescription>Submit details so students can help locate your lost item.</DialogDescription>
            </ModalHeader>

            <form onSubmit={handleAddSubmit} className="space-y-5">
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                <span className="font-semibold">Be as specific as possible</span> with details and upload clear images to help match your item.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Item Name</label>
                  <Input
                    value={form.itemName}
                    onChange={(e) => setForm((p) => ({ ...p, itemName: e.target.value }))}
                    placeholder="e.g. Blue backpack"
                    className="border-gray-300"
                  />
                  {errors.itemName && <p className="text-xs text-red-600">{errors.itemName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select category</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Documents">Documents</option>
                    <option value="Personal Items">Personal Items</option>
                    <option value="School Supplies">School Supplies</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && <p className="text-xs text-red-600">{errors.category}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date Lost</label>
                  <Input
                    type="date"
                    value={form.dateReported}
                    onChange={(e) => setForm((p) => ({ ...p, dateReported: e.target.value }))}
                    className="border-gray-300"
                  />
                  {errors.dateReported && <p className="text-xs text-red-600">{errors.dateReported}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Item Status Category</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as any }))}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                    <option value="unclaimed">Unclaimed</option>
                    <option value="claimed">Claimed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Describe the item and any distinguishing details"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Upload Image</label>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center hover:bg-gray-100">
                    <Upload className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {imagePreviewUrl ? 'Click to change image' : 'Click to upload image of the item'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
                        setImagePreviewUrl(URL.createObjectURL(file));
                      }}
                    />
                  </label>
                  {imagePreviewUrl && (
                    <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                      <img src={imagePreviewUrl} alt="Preview" className="w-full max-h-64 object-contain bg-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddOpen(false);
                    resetAddForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Submit Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4 border-b">
              <div className="flex gap-4 overflow-x-auto">
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
              <Button
                onClick={() => setIsAddOpen(true)}
                className="bg-green-600 hover:bg-green-700 gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    {/* Image */}
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-full h-36 object-cover"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (!img.dataset.fallbackApplied) {
                            img.dataset.fallbackApplied = '1';
                            img.src = '/item-placeholder.svg';
                          }
                        }}
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
