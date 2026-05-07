'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { adminLnFRows } from '@/lib/admin-mock-data';
import { AdminShell } from '@/components/admin/admin-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
                        <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200 text-gray-600" aria-label="Flag">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
