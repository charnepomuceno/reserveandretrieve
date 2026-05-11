'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { adminLnFRows } from '@/lib/admin-mock-data';
import { AdminShell } from '@/components/admin/admin-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockLostFoundItems } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Flag, MessageCircle, Search } from 'lucide-react';

export default function AdminLostFoundPage() {
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const rows = useMemo(() => {
    return adminLnFRows.filter((r) => {
      const matchesQ =
        !q.trim() ||
        [r.itemName, r.location, r.postedBy].some((f) => f.toLowerCase().includes(q.trim().toLowerCase()));
      const matchesType = typeFilter === 'all' || r.type === typeFilter;
      const matchesStatus =
        statusFilter === 'all' || r.status.toLowerCase().replace(/\s+/g, '') === statusFilter.toLowerCase();
      return matchesQ && matchesType && matchesStatus;
    });
  }, [q, typeFilter, statusFilter]);

  const CAMPUS_ZONES = [
    'Xavier Hall',
    'Bonoan Building',
    'Library',
    'Phelan Building',
    'Dolan Building',
    'Covered Courts',
  ];

  const getZoneName = (location: string) => {
    const normalized = location.toLowerCase();
    if (normalized.includes('xavier')) return 'Xavier Hall';
    if (normalized.includes('bonoan')) return 'Bonoan Building';
    if (normalized.includes('library')) return 'Library';
    if (normalized.includes('phelan')) return 'Phelan Building';
    if (normalized.includes('dolan')) return 'Dolan Building';
    if (normalized.includes('covered')) return 'Covered Courts';
    return 'Other';
  };

  const ZONE_COORDINATES: Record<string, { x: string; y: string }> = {
    'Xavier Hall': { x: '29%', y: '73%' },
    'Bonoan Building': { x: '57%', y: '33%' },
    Library: { x: '43%', y: '20%' },
    'Phelan Building': { x: '25%', y: '56%' },
    'Dolan Building': { x: '20%', y: '26%' },
    'Covered Courts': { x: '77%', y: '40%' },
  };

  const CAMPUS_MAP_SRC = '/adnu-campus-map.png';

  const zoneCounts = CAMPUS_ZONES.map((zone) => ({
    zone,
    count: mockLostFoundItems.filter((item) => getZoneName(item.location) === zone).length,
  }));

  const maxCount = Math.max(...zoneCounts.map((zone) => zone.count), 0);
  const heatPoints = zoneCounts.map((zone) => {
    const marker = ZONE_COORDINATES[zone.zone];
    const normalizedIntensity = maxCount === 0 ? 0.4 : zone.count / maxCount;

    return {
      zone: zone.zone,
      x: Number(marker.x.replace('%', '')),
      y: Number(marker.y.replace('%', '')),
      intensity: Math.max(normalizedIntensity, 0.3),
    };
  });

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Lost & Found Oversight</h1>
          <p className="mt-1 text-gray-600">Verify and manage all lost and found reports.</p>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative max-w-md flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search items..."
                  className="h-10 rounded-lg border-gray-200 pl-9 shadow-none focus-visible:ring-blue-600"
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 sm:w-40">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="FOUND">FOUND</SelectItem>
                    <SelectItem value="LOST">LOST</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 sm:w-44">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pendingclaim">Pending Claim</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Item</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Posted by</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Type</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Visibility</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Claims</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} className="border-gray-100">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                          <Image src={r.imageUrl} alt="" fill className="object-cover" sizes="48px" unoptimized />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900">{r.itemName}</p>
                          <p className="truncate text-xs text-gray-500">{r.location}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{r.postedBy}</TableCell>
                    <TableCell>
                      <span
                        className={
                          r.type === 'FOUND' ? 'text-sm font-semibold text-blue-600' : 'text-sm font-semibold text-red-600'
                        }
                      >
                        {r.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      {r.status === 'Pending Claim' ? (
                        <Badge className="border-0 bg-amber-100 font-medium text-amber-900 hover:bg-amber-100">
                          Pending Claim
                        </Badge>
                      ) : (
                        <Badge className="border-0 bg-red-100 font-medium text-red-800 hover:bg-red-100">Lost</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {r.visibility === 'Public' ? (
                        <Badge className="border-0 bg-blue-100 font-medium text-blue-800 hover:bg-blue-100">Public</Badge>
                      ) : (
                        <Badge className="border-0 bg-green-100 font-medium text-green-800 hover:bg-green-100">
                          Private
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {r.claims != null ? (
                        <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                          <MessageCircle className="h-4 w-4 text-gray-400" />
                          {r.claims}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/lost-found/${r.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1 text-blue-700 hover:bg-blue-50">
                            View
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campus Hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img
                src={CAMPUS_MAP_SRC}
                alt="Ateneo de Naga University campus map"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 pointer-events-none">
                {heatPoints.map((point) => {
                  const diameter = 130 + point.intensity * 170;
                  const opacity = 0.35 + point.intensity * 0.35;

                  return (
                    <div
                      key={`glow-${point.zone}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: `${diameter}px`,
                        height: `${diameter}px`,
                        opacity,
                        background:
                          'radial-gradient(circle, rgba(255,0,0,0.95) 0%, rgba(255,165,0,0.85) 35%, rgba(255,255,0,0.75) 55%, rgba(0,191,255,0.45) 78%, rgba(0,191,255,0) 100%)',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heatmap Color Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full mb-4">
              <div className="h-5 rounded-full border border-slate-200 bg-[linear-gradient(to_right,#38bdf8_0%,#fde047_50%,#f97316_75%,#ef4444_100%)]" />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-sky-400" />
                Low density (Cool)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-yellow-300" />
                Moderate density
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-orange-500" />
                High density
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-red-500" />
                Very high density (Hotspot)
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {zoneCounts.map((zone) => (
                <div
                  key={zone.zone}
                  className="rounded-lg p-4 bg-blue-50 border border-blue-200 text-blue-900"
                >
                  <p className="text-sm font-medium text-blue-700">Location</p>
                  <p className="text-lg font-semibold">{zone.zone}</p>
                  <p className="text-sm mt-2 text-blue-800">
                    {zone.count} {zone.count === 1 ? 'report' : 'reports'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
