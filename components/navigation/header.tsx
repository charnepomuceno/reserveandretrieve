'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { roleColors } from '@/lib/nav-config';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const colors = roleColors[user.role];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getRoleBadgeLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'Administrator',
      'osa-staff': 'OSA Staff',
      'org-officer': 'Organization Officer',
      student: 'Student',
    };
    return labels[role] || role;
  };

  return (
    <header className={`${colors.bg} border-b border-gray-200 sticky top-0 z-40`}>
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${colors.accent} flex items-center justify-center`}>
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className={`font-semibold ${colors.text}`}>{user.name}</p>
            <p className="text-xs text-gray-600">{getRoleBadgeLabel(user.role)}</p>
          </div>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className={`border-${colors.accent} ${colors.text} hover:${colors.bg}`}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}
