'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Shield, Bell } from 'lucide-react';

export default function StudentProfile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600 mb-8">Manage your student account and preferences</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-red-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <Badge className="bg-red-100 text-red-800 mb-4">Student</Badge>
                <p className="text-sm text-gray-600 mb-6">{user.email}</p>
                <Button className="w-full bg-red-600 hover:bg-red-700 mb-2">Edit Profile</Button>
                <Button variant="outline" className="w-full">Change Password</Button>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Student Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Student ID</p>
                  <p className="font-semibold text-gray-900">2024-0042</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Program</p>
                  <p className="font-semibold text-gray-900">BS Computer Science</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input defaultValue={user.name.split(' ')[0]} className="border-gray-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input defaultValue={user.name.split(' ').slice(1).join(' ')} className="border-gray-300" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input defaultValue={user.email} disabled className="border-gray-300 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input placeholder="+63 (XXX) XXX-XXXX" className="border-gray-300" />
                </div>
                <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-red-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Control how you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Lost & Found Updates</p>
                    <p className="text-sm text-gray-600">Get notified when items matching your reports are found</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Claim Notifications</p>
                    <p className="text-sm text-gray-600">Get notified when someone claims an item you reported</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">System Announcements</p>
                    <p className="text-sm text-gray-600">Important updates from the system</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 mt-4">Update Preferences</Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Password</p>
                    <p className="text-sm text-gray-600">Last changed 60 days ago</p>
                  </div>
                  <Button variant="outline" className="text-red-600">Change</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add extra security to your account</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
