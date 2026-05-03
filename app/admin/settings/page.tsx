'use client';

import { AdminShell } from '@/components/admin/admin-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-3xl space-y-8 p-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Settings</h1>
          <p className="mt-1 text-gray-600">Configure system-wide preferences for OSA Reserve & Retrieval.</p>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Organization profile</CardTitle>
            <CardDescription>Displayed on exports and internal dashboards.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="osa-name">Office name</Label>
              <Input id="osa-name" defaultValue="ADNU Office of Student Affairs" className="border-gray-200" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="support-email">Support email</Label>
              <Input id="support-email" type="email" defaultValue="osa@adnu.edu.ph" className="border-gray-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Notifications</CardTitle>
            <CardDescription>Choose what triggers alerts for admins and staff.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Reservation submissions</p>
                <p className="text-xs text-gray-500">Notify when new Xavier Hall requests arrive.</p>
              </div>
              <Switch defaultChecked aria-label="Reservation submissions" />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Lost & found disputes</p>
                <p className="text-xs text-gray-500">Escalations on flagged posts or claims.</p>
              </div>
              <Switch defaultChecked aria-label="Lost and found disputes" />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">User moderation</p>
                <p className="text-xs text-gray-500">Suspensions and risky account activity.</p>
              </div>
              <Switch aria-label="User moderation" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="border-gray-300 bg-white shadow-none">
            Discard
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800">Save changes</Button>
        </div>
      </div>
    </AdminShell>
  );
}
