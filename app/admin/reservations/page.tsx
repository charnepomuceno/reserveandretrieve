'use client';

import { useMemo, useState } from 'react';
import { adminReservationRows } from '@/lib/admin-mock-data';
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
import { Eye, Search } from 'lucide-react';

function statusBadge(status: (typeof adminReservationRows)[number]['status']) {
  if (status === 'pending') {
    return (
      <Badge className="border-0 bg-amber-100 font-medium text-amber-900 hover:bg-amber-100">Pending</Badge>
    );
  }
  if (status === 'approved') {
    return (
      <Badge className="border-0 bg-green-100 font-medium text-green-800 hover:bg-green-100">Approved</Badge>
    );
  }
  return (
    <Badge className="border-0 bg-red-100 font-medium text-red-800 hover:bg-red-100">Rejected</Badge>
  );
}

export default function AdminReservationsPage() {
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const rows = useMemo(() => {
    return adminReservationRows.filter((r) => {
      const matchesQ =
        !q.trim() ||
        [r.eventName, r.organization, r.requestor, r.dateLabel].some((f) =>
          f.toLowerCase().includes(q.trim().toLowerCase()),
        );
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchesQ && matchesStatus;
    });
  }, [q, statusFilter]);

  return (
    <AdminShell headerSearch>
      <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Xavier Hall Reservations</h1>
          <p className="mt-1 text-gray-600">Manage all Xavier Hall booking requests.</p>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search events, orgs..."
                  className="h-10 rounded-lg border-gray-200 pl-9 shadow-none focus-visible:ring-blue-600"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 md:w-44">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Date</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Time slot</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Organization
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Event name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Requestor
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Status</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} className="border-gray-100">
                    <TableCell className="font-medium text-gray-900">{r.dateLabel}</TableCell>
                    <TableCell className="text-gray-700">{r.timeSlot}</TableCell>
                    <TableCell className="text-gray-700">{r.organization}</TableCell>
                    <TableCell className="text-gray-900">{r.eventName}</TableCell>
                    <TableCell className="text-gray-700">{r.requestor}</TableCell>
                    <TableCell>{statusBadge(r.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-1.5 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
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
