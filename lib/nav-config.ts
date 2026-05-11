import { UserRole } from './auth-context';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  User,
  BarChart3,
  Map,
  Users,
  Settings,
  Package,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

export const roleNavigation: Record<UserRole, NavItem[]> = {
  'org-officer': [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/org-officer/dashboard',
    },
    {
      id: 'make-reservation',
      label: 'Make Reservation',
      icon: Calendar,
      path: '/org-officer/make-reservation',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      path: '/org-officer/notifications',
    },
    {
      id: 'reservations',
      label: 'My Reservations',
      icon: Calendar,
      path: '/org-officer/reservations',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/org-officer/profile',
    },
  ],
  'osa-staff': [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/osa-staff/dashboard',
    },
    {
      id: 'reservations',
      label: 'Reservation Management',
      icon: Calendar,
      path: '/osa-staff/reservations',
    },
    {
      id: 'lost-found',
      label: 'Lost & Found',
      icon: Package,
      path: '/osa-staff/lost-found',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      path: '/osa-staff/notifications',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/osa-staff/profile',
    },
  ],
  student: [
    {
      id: 'browse-items',
      label: 'Browse Items',
      icon: Package,
      path: '/student/lost-found',
    },
    {
      id: 'heatmap',
      label: 'Heatmap',
      icon: Map,
      path: '/student/heatmap',
    },
  ],
  admin: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      id: 'reservations',
      label: 'Reservation Oversight',
      icon: Calendar,
      path: '/admin/reservations',
    },
    {
      id: 'lost-found',
      label: 'Lost & Found Oversight',
      icon: Package,
      path: '/admin/lost-found',
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      path: '/admin/reports',
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      path: '/admin/users',
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ],
};

export const roleColors: Record<UserRole, { bg: string; text: string; accent: string }> = {
  'org-officer': {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    accent: 'bg-blue-600',
  },
  'osa-staff': {
    bg: 'bg-green-50',
    text: 'text-green-900',
    accent: 'bg-green-600',
  },
  student: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    accent: 'bg-blue-600',
  },
  admin: {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    accent: 'bg-purple-600',
  },
};
