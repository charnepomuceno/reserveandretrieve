'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { adminLnFItemDetailData } from '@/lib/admin-mock-data';
import { AdminShell } from '@/components/admin/admin-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Archive, ArrowLeft, Eye, Lock, MapPin, MessageSquare, Trash2 } from 'lucide-react';

export default function AdminLnFItemDetailPage() {
  const router = useRouter();
  const item = adminLnFItemDetailData;

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl space-y-6 p-6 md:p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Item Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{item.itemName}</h1>
          <p className="mt-1 flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            {item.location}
          </p>
        </div>

        {/* Image and Details Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Image */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="relative h-96 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.itemName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <div className="space-y-4">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500 mb-1">Location</p>
                  <p className="text-gray-900">{item.location}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-xs font-semibold uppercase text-gray-500">Date Reported</span>
                  <span className="text-gray-900">{item.dateReported}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-xs font-semibold uppercase text-gray-500">Posted By</span>
                  <span className="text-gray-900">{item.postedBy}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-xs font-semibold uppercase text-gray-500">Status</span>
                  <Badge className="border-0 bg-amber-100 font-medium text-amber-900 hover:bg-amber-100">
                    {item.status}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-xs font-semibold uppercase text-gray-500">Visibility</span>
                  <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800">
                    {item.visibility}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{item.description}</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button size="sm" className="gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                <Eye className="h-4 w-4" />
                Make Private
              </Button>
              <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                <MessageSquare className="h-4 w-4" />
                Mark Claimed
              </Button>
              <Button size="sm" className="gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                <Archive className="h-4 w-4" />
                Archive
              </Button>
            </div>
          </div>
        </div>

        {/* Claims Section */}
        {item.claims.length > 0 && (
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">
                Claim Requests ({item.claims.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.claims.map((claim) => (
                <div key={claim.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{claim.name}</h4>
                      <p className="text-xs text-gray-600">{claim.email}</p>
                    </div>
                    <p className="text-xs font-medium text-gray-500">{claim.date}</p>
                  </div>
                  <p className="mb-3 text-sm text-gray-700">{claim.proof}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                      <MessageSquare className="h-4 w-4" />
                      Approve Claim
                    </Button>
                    <Button size="sm" className="gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                      <Lock className="h-4 w-4" />
                      Reject Claim
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminShell>
  );
}
