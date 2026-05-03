'use client';

import { useMemo, useState } from 'react';
import { adminUserRows } from '@/lib/admin-mock-data';
import { AdminShell } from '@/components/admin/admin-shell';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { Ban, CheckCircle2, Eye, Pencil, Plus, Search, Upload } from 'lucide-react';

function roleBadge(role: (typeof adminUserRows)[number]['role']) {
  const styles: Record<typeof role, string> = {
    Admin: 'border-transparent bg-blue-100 font-medium text-blue-800 hover:bg-blue-100',
    'OSA Staff': 'border-transparent bg-green-100 font-medium text-green-800 hover:bg-green-100',
    Student: 'border-transparent bg-gray-100 font-medium text-gray-800 hover:bg-gray-100',
    'Organization / Officer':
      'border-transparent bg-purple-100 font-medium text-purple-900 hover:bg-purple-100',
  };
  return (
    <Badge variant="outline" className={styles[role]}>
      {role}
    </Badge>
  );
}

export default function AdminUsersPage() {
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [orgFilter, setOrgFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const rows = useMemo(() => {
    return adminUserRows.filter((u) => {
      const hay = `${u.name} ${u.email}`.toLowerCase();
      const matchesQ = !q.trim() || hay.includes(q.trim().toLowerCase());
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || u.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesQ && matchesRole && matchesStatus;
    });
  }, [q, roleFilter, statusFilter, orgFilter]);

  return (
    <AdminShell headerSearch>
      <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Users</h1>
            <p className="mt-1 text-gray-600">Manage student, organization, staff, and admin accounts.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button variant="outline" className="border-gray-300 bg-white shadow-none">
              <Upload className="mr-2 h-4 w-4 rotate-180" />
              Export Users
            </Button>
            <Button className="bg-blue-700 hover:bg-blue-800">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-3 lg:flex-row lg:flex-1 lg:flex-wrap">
                <div className="relative max-w-xs flex-1 min-w-[200px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search name or email..."
                    className="h-10 rounded-lg border-gray-200 pl-9 shadow-none focus-visible:ring-blue-600"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 lg:w-44">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="OSA Staff">OSA Staff</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Organization / Officer">Organization / Officer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={orgFilter} onValueChange={setOrgFilter}>
                  <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 lg:w-52">
                    <SelectValue placeholder="All Organizations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organizations</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 lg:w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-600 whitespace-nowrap">
                {rows.length} of {adminUserRows.length} users
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Name</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Email</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Role</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Last active</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((u) => (
                  <TableRow key={u.id} className="border-gray-100">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-gray-200">
                          <AvatarFallback className="bg-gray-100 text-xs font-semibold text-gray-700">
                            {u.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{u.email}</TableCell>
                    <TableCell>{roleBadge(u.role)}</TableCell>
                    <TableCell>
                      {u.status === 'Active' ? (
                        <Badge className="border-0 bg-green-100 font-medium text-green-800 hover:bg-green-100">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="border-0 bg-red-100 font-medium text-red-800 hover:bg-red-100">
                          Suspended
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm tabular-nums text-gray-600">{u.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-wrap justify-end gap-x-3 gap-y-1">
                        <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline">
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                        <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:underline">
                          <Pencil className="h-4 w-4" />
                          Edit
                        </button>
                        {u.status === 'Active' ? (
                          <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline">
                            <Ban className="h-4 w-4" />
                            Suspend
                          </button>
                        ) : (
                          <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline">
                            <CheckCircle2 className="h-4 w-4" />
                            Unsuspend
                          </button>
                        )}
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
