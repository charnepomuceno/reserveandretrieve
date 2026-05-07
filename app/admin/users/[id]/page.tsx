'use client';

import { useRouter } from 'next/navigation';
import { adminUserDetailData } from '@/lib/admin-mock-data';
import { AdminShell } from '@/components/admin/admin-shell';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, ArrowLeft, Edit, Key, Lock, Shield, Undo2 } from 'lucide-react';

export default function AdminUserDetailPage() {
  const router = useRouter();
  const user = adminUserDetailData;

  return (
    <AdminShell>
      <div className="mx-auto max-w-4xl space-y-6 p-6 md:p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </button>

        {/* User Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-gray-300">
              <AvatarFallback className="bg-red-100 text-lg font-bold text-red-700">{user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className="border-gray-300 bg-white text-gray-700">
                  {user.role}
                </Badge>
                {user.status === 'Suspended' ? (
                  <Badge className="border-0 bg-red-100 font-medium text-red-800 hover:bg-red-100">Suspended</Badge>
                ) : (
                  <Badge className="border-0 bg-green-100 font-medium text-green-800 hover:bg-green-100">Active</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button className="bg-blue-700 hover:bg-blue-800" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 bg-white">
              <Shield className="mr-2 h-4 w-4" />
              Change Role
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 bg-white">
              <Key className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
            {user.status === 'Suspended' ? (
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Undo2 className="mr-2 h-4 w-4" />
                Unsuspend Account
              </Button>
            ) : (
              <Button variant="destructive" size="sm">
                <Lock className="mr-2 h-4 w-4" />
                Suspend
              </Button>
            )}
          </div>
        </div>

        {/* Account Restriction Alert */}
        {user.accountRestriction && (
          <Card className="border-amber-200 bg-amber-50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-amber-900">Account Restriction Details</h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-800">Status</span>
                      <span className="font-medium text-amber-900">{user.accountRestriction.status}</span>
                    </div>
                    <Separator className="bg-amber-200" />
                    <div className="flex justify-between">
                      <span className="text-amber-800">Suspended By</span>
                      <span className="text-amber-900">{user.accountRestriction.suspendedBy}</span>
                    </div>
                    <Separator className="bg-amber-200" />
                    <div className="flex justify-between">
                      <span className="text-amber-800">Date</span>
                      <span className="text-amber-900">{user.accountRestriction.date}</span>
                    </div>
                    <Separator className="bg-amber-200" />
                    <div>
                      <span className="text-amber-800">Reason</span>
                      <p className="mt-1 text-amber-900">{user.accountRestriction.reason}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit Reason
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Undo2 className="mr-2 h-3 w-3" />
                      Remove Suspension
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Basic Info and Activity Summary */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-xs font-semibold uppercase text-gray-500">Full Name</span>
                <span className="text-gray-900">{user.basicInfo.fullName}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-xs font-semibold uppercase text-gray-500">Email</span>
                <span className="text-gray-900">{user.basicInfo.email}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-xs font-semibold uppercase text-gray-500">Role</span>
                <span className="text-gray-900">{user.basicInfo.role}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-xs font-semibold uppercase text-gray-500">Status</span>
                <span className="text-gray-900">{user.basicInfo.status}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-xs font-semibold uppercase text-gray-500">Last Active</span>
                <span className="text-gray-900">{user.basicInfo.lastActive}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-xs font-semibold uppercase text-gray-500">Created Date</span>
                <span className="text-gray-900">{user.basicInfo.createdDate}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-xs font-semibold uppercase text-gray-500">Department</span>
                <span className="text-gray-900">{user.basicInfo.department}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Activity Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Reservations Submitted</p>
                <p className="text-2xl font-bold text-gray-900">{user.activitySummary.reservationsSubmitted}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500">Claims Made</p>
                <p className="text-2xl font-bold text-red-600">{user.activitySummary.claimsMade}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500">Lost & Found Posts</p>
                <p className="text-2xl font-bold text-gray-900">{user.activitySummary.lostFoundPosts}</p>
              </div>
              <Separator />
              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-1">Chrome on Android</p>
                <p className="text-sm text-gray-700">{user.activitySummary.device}</p>
              </div>

              <div className="mt-6 space-y-2">
                <h4 className="text-xs font-semibold uppercase text-gray-700">Quick Actions</h4>
                <div className="space-y-1.5">
                  <Button className="w-full justify-start border-gray-200 bg-white hover:bg-gray-50 text-gray-700" variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button className="w-full justify-start border-gray-200 bg-white hover:bg-gray-50 text-gray-700" variant="outline" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Change Role
                  </Button>
                  <Button className="w-full justify-start border-gray-200 bg-white hover:bg-gray-50 text-gray-700" variant="outline" size="sm">
                    <Key className="mr-2 h-4 w-4" />
                    Reset Password
                  </Button>
                  <Button className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700" variant="outline" size="sm">
                    <Undo2 className="mr-2 h-4 w-4" />
                    Unsuspend Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {user.recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-300" />
                  <span className="text-gray-700">{activity.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
