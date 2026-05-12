'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ReportFoundItemPage() {
  const router = useRouter();
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [dateFound, setDateFound] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (!itemName || !category || !location || !dateFound) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Found item report submitted. Staff will review and list it in the lost and found catalog.');
    router.push('/student/found-item-reports');
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Report Found Item</h1>
        <p className="text-gray-600 mb-8">Share the details of the item you found so it can be reunited with its owner.</p>

        <Card>
          <CardHeader>
            <CardTitle>Found Item Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <Input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Silver headphones"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Electronics"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Found</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Xavier Hall - Study Area"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Found</label>
                <Input
                  type="date"
                  value={dateFound}
                  onChange={(e) => setDateFound(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the item and any identifying marks"
                className="min-h-[120px]"
              />
            </div>

            <div className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                Submit Found Item Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
