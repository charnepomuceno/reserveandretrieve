'use client';

import {
  adminNeedsAttention,
  adminLostFoundWeeklyTrend,
  adminReservationsByWeek,
  adminStaffLogs,
  adminSummaryCards,
  adminTodayActivity,
} from '@/lib/admin-mock-data';
import { AdminShell } from '@/components/admin/admin-shell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Flag,
  Pencil,
  X,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function SummaryCard({
  icon: Icon,
  iconClass,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  label: string;
  value: number;
}) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="flex items-start gap-4 p-6">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 ${iconClass}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function attentionIcon(tone: (typeof adminNeedsAttention)[number]['tone']) {
  const wrap = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg';
  switch (tone) {
    case 'warning':
      return (
        <div className={`${wrap} bg-amber-100 text-amber-700`}>
          <AlertTriangle className="h-5 w-5" />
        </div>
      );
    case 'orange':
      return (
        <div className={`${wrap} bg-orange-100 text-orange-700`}>
          <Flag className="h-5 w-5" />
        </div>
      );
    case 'danger':
      return (
        <div className={`${wrap} bg-red-100 text-red-700`}>
          <AlertTriangle className="h-5 w-5" />
        </div>
      );
    default:
      return (
        <div className={`${wrap} bg-blue-100 text-blue-700`}>
          <FileText className="h-5 w-5" />
        </div>
      );
  }
}

function activityDot(tone: (typeof adminTodayActivity)[number]['tone']) {
  const colors = {
    blue: 'bg-blue-600',
    red: 'bg-red-500',
    green: 'bg-green-600',
  };
  return <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${colors[tone]}`} />;
}

function logActionIcon(kind: (typeof adminStaffLogs)[number]['actionIcon']) {
  const wrap =
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700';
  switch (kind) {
    case 'check':
      return (
        <div className={wrap}>
          <Check className="h-4 w-4 text-green-600" />
        </div>
      );
    case 'x':
      return (
        <div className={wrap}>
          <X className="h-4 w-4 text-red-600" />
        </div>
      );
    default:
      return (
        <div className={wrap}>
          <Pencil className="h-4 w-4 text-blue-600" />
        </div>
      );
  }
}

function moduleBadge(mod: (typeof adminStaffLogs)[number]['module']) {
  const styles: Record<typeof mod, string> = {
    Reservations: 'border-transparent bg-blue-100 text-blue-800',
    'Lost & Found': 'border-transparent bg-green-100 text-green-800',
    Users: 'border-transparent bg-purple-100 text-purple-800',
    Reports: 'border-transparent bg-amber-100 text-amber-900',
  };
  return (
    <Badge variant="outline" className={styles[mod]}>
      {mod}
    </Badge>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Dashboard</h1>
          <p className="mt-1 text-gray-600">Overview of reservations and lost & found activity.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={Clock}
            iconClass="text-blue-600"
            label="Pending Xavier Hall Requests"
            value={adminSummaryCards.pendingHallRequests}
          />
          <SummaryCard
            icon={CheckCircle2}
            iconClass="text-green-600"
            label="Endorsed This Week"
            value={adminSummaryCards.endorsedThisWeek}
          />
          <SummaryCard
            icon={FileText}
            iconClass="text-blue-600"
            label="Pending Claims"
            value={adminSummaryCards.pendingClaims}
          />
          <SummaryCard
            icon={AlertTriangle}
            iconClass="text-amber-500"
            label="New Lost Reports Today"
            value={adminSummaryCards.newLostReportsToday}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Needs Attention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {adminNeedsAttention.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/80 px-4 py-3"
                >
                  {attentionIcon(item.tone)}
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Today&apos;s Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="relative space-y-0 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gray-200">
                {adminTodayActivity.map((row) => (
                  <li key={row.id} className="relative flex gap-4 pb-6 last:pb-0">
                    {activityDot(row.tone)}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500">{row.time}</p>
                      <p className="mt-1 text-sm text-gray-800">{row.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Xavier Hall Reservations This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminReservationsByWeek} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(37, 99, 235, 0.06)' }}
                    contentStyle={{
                      borderRadius: 8,
                      border: '1px solid #e5e7eb',
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Lost vs Found Reports This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={adminLostFoundWeeklyTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: '1px solid #e5e7eb',
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="line"
                    wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
                  />
                  <Line type="monotone" dataKey="lost" name="Lost Items" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="found" name="Found Items" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-lg font-semibold text-gray-900">OSA Staff Activity Logs</CardTitle>
            <p className="text-sm text-gray-600">Today — {adminStaffLogs.length} actions logged</p>
          </CardHeader>
          <CardContent className="px-0 pb-2 pt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-transparent">
                  <TableHead className="pl-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Staff name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action performed
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">Module</TableHead>
                  <TableHead className="pr-6 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Timestamp
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminStaffLogs.map((log) => (
                  <TableRow key={log.id} className="border-gray-100">
                    <TableCell className="pl-6 font-medium text-gray-900">{log.staffName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {logActionIcon(log.actionIcon)}
                        <span className="text-sm text-gray-800">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>{moduleBadge(log.module)}</TableCell>
                    <TableCell className="pr-6 text-right text-sm tabular-nums text-gray-600">{log.time}</TableCell>
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
