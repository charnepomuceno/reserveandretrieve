'use client';

import {
  adminAvailableReports,
  adminClaimsResolutionTrend,
  adminLostCategoriesDonut,
  adminReportsSummary,
  adminReservationDailySummary,
} from '@/lib/admin-mock-data';
import { AdminShell } from '@/components/admin/admin-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Archive, ChevronDown, Download, FileBarChart } from 'lucide-react';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function reportIconTone(tone: (typeof adminAvailableReports)[number]['iconTone']) {
  const map = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-800',
    purple: 'bg-purple-100 text-purple-800',
  };
  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${map[tone]}`}>
      <FileBarChart className="h-5 w-5" />
    </div>
  );
}

export default function AdminReportsPage() {
  const trailing = (
    <>
      <Button variant="outline" className="border-gray-300 bg-white shadow-none">
        <Archive className="mr-2 h-4 w-4" />
        Archived Reports
      </Button>
      <Button className="bg-blue-700 hover:bg-blue-800">
        <Download className="mr-2 h-4 w-4" />
        Export Center
      </Button>
    </>
  );

  return (
    <AdminShell trailing={trailing}>
      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Reports & Analytics</h1>
          <p className="mt-1 text-gray-600">Exports and analytics for internal OSA oversight.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-blue-700">Reservations This Month</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{adminReportsSummary.reservationsMonth}</p>
              <p className="mt-2 text-xs font-medium text-green-700">{adminReportsSummary.reservationsDelta}</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-red-700">Pending Claims</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{adminReportsSummary.pendingClaims}</p>
              <p className="mt-2 text-xs font-medium text-gray-600">{adminReportsSummary.pendingClaimsSub}</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-green-700">Open Lost Items</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{adminReportsSummary.openLostItems}</p>
              <p className="mt-2 text-xs font-medium text-gray-600">{adminReportsSummary.openLostSub}</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-red-700">Flagged Users</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{adminReportsSummary.flaggedUsers}</p>
              <p className="mt-2 text-xs font-medium text-gray-600">{adminReportsSummary.flaggedUsersSub}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Available Reports</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-4 pt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-transparent">
                  <TableHead className="pl-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Report name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Last updated
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Key metrics
                  </TableHead>
                  <TableHead className="pr-6 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminAvailableReports.map((rep) => (
                  <TableRow key={rep.id} className="border-gray-100">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        {reportIconTone(rep.iconTone)}
                        <span className="font-medium text-gray-900">{rep.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{rep.lastUpdated}</TableCell>
                    <TableCell>
                      <Badge className="border-0 bg-green-100 font-medium text-green-800 hover:bg-green-100">
                        Up to date
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{rep.metrics}</TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                        Export
                        <ChevronDown className="ml-1 h-4 w-4 opacity-90" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-900">Reservation Summary</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-4 pt-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-transparent">
                    <TableHead className="pl-6 text-xs font-semibold uppercase tracking-wide text-gray-500">Date</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Total</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Endorsed</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Pending</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Cancelled</TableHead>
                    <TableHead className="pr-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Peak time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminReservationDailySummary.map((row) => (
                    <TableRow key={row.date} className="border-gray-100">
                      <TableCell className="pl-6 font-medium text-gray-900">{row.date}</TableCell>
                      <TableCell>{row.total}</TableCell>
                      <TableCell className="font-medium text-green-700">{row.endorsed}</TableCell>
                      <TableCell className="font-medium text-orange-600">{row.pending}</TableCell>
                      <TableCell className="font-medium text-red-600">{row.cancelled}</TableCell>
                      <TableCell className="pr-6 text-gray-700">{row.peak}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">Claims Resolution Rate</CardTitle>
              </CardHeader>
              <CardContent className="h-72 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={adminClaimsResolutionTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #e5e7eb',
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="resolved" name="Resolved %" stroke="#16a34a" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="pending" name="Pending %" stroke="#ea580c" strokeWidth={2} dot />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">Lost Item Categories</CardTitle>
              </CardHeader>
              <CardContent className="h-72 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={adminLostCategoriesDonut}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={56}
                      outerRadius={88}
                      paddingAngle={2}
                    >
                      {adminLostCategoriesDonut.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #e5e7eb',
                        fontSize: 12,
                      }}
                    />
                    <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          All reports reflect live system data. Exports are for internal OSA use only.
        </p>
      </div>
    </AdminShell>
  );
}
