'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ReportLostItemPage() {
  const router = useRouter();
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [dateLost, setDateLost] = useState('');

  const handleSubmit = () => {
    if (!itemName || !category || !location || !dateLost) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Lost item report submitted. Check Lost Item Reports for updates.');
    router.push('/student/lost-item-reports');
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Report Lost Item</h1>
        <p className="text-gray-600 mb-8">Submit details so staff can help locate your lost item.</p>

        <Card>
          <CardHeader>
            <CardTitle>Lost Item Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <Input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Blue backpack"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Accessories"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Lost</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Xavier Hall - Lobby"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Lost</label>
                <Input
                  type="date"
                  value={dateLost}
                  onChange={(e) => setDateLost(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the item and any distinguishing details"
                className="min-h-[120px]"
              />
            </div>

            <div className="flex justify-end">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleSubmit}>
                Submit Lost Item Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
