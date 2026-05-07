/** Static demo data for admin UI — mirrors mockups */

export const adminSummaryCards = {
  pendingHallRequests: 2,
  endorsedThisWeek: 3,
  pendingClaims: 3,
  newLostReportsToday: 1,
};

export const adminNeedsAttention = [
  {
    id: '1',
    tone: 'warning' as const,
    label: 'Claim dispute',
  },
  {
    id: '2',
    tone: 'orange' as const,
    label: 'Suspicious post flagged',
  },
  {
    id: '3',
    tone: 'danger' as const,
    label: 'Claim appointment no-show',
  },
  {
    id: '4',
    tone: 'info' as const,
    label: 'Unverified item report',
  },
];

export const adminTodayActivity = [
  { id: '1', time: '8:15 AM', tone: 'blue' as const, text: 'Reservation endorsed — Leadership Seminar (JPIA)' },
  { id: '2', time: '9:02 AM', tone: 'red' as const, text: 'Lost report flagged for review' },
  { id: '3', time: '10:45 AM', tone: 'green' as const, text: 'Claim resolved — Student ID pickup confirmed' },
  { id: '4', time: '11:20 AM', tone: 'blue' as const, text: 'New Xavier Hall booking submitted' },
];

export const adminReservationsByWeek = [
  { week: 'Week 1', count: 4 },
  { week: 'Week 2', count: 7 },
  { week: 'Week 3', count: 5 },
  { week: 'Week 4', count: 6 },
];

export const adminLostFoundWeeklyTrend = [
  { day: 'Mon', lost: 3, found: 2 },
  { day: 'Tue', lost: 2, found: 4 },
  { day: 'Wed', lost: 4, found: 3 },
  { day: 'Thu', lost: 1, found: 5 },
  { day: 'Fri', lost: 2, found: 3 },
];

export const adminStaffLogs = [
  {
    id: '1',
    staffName: 'Maria Santos',
    action: 'Approved reservation request',
    actionIcon: 'check' as const,
    module: 'Reservations' as const,
    time: '8:15 AM',
  },
  {
    id: '2',
    staffName: 'Renz Alvarez',
    action: 'Updated lost item visibility',
    actionIcon: 'pencil' as const,
    module: 'Lost & Found',
    time: '9:40 AM',
  },
  {
    id: '3',
    staffName: 'OSA Administrator',
    action: 'Suspended user account',
    actionIcon: 'x' as const,
    module: 'Users',
    time: '10:05 AM',
  },
  {
    id: '4',
    staffName: 'Maria Santos',
    action: 'Exported monthly report',
    actionIcon: 'check' as const,
    module: 'Reports',
    time: '11:52 AM',
  },
  {
    id: '5',
    staffName: 'Renz Alvarez',
    action: 'Verified found item posting',
    actionIcon: 'check' as const,
    module: 'Lost & Found',
    time: '1:18 PM',
  },
  {
    id: '6',
    staffName: 'OSA Administrator',
    action: 'Reset notification preferences',
    actionIcon: 'pencil' as const,
    module: 'Users',
    time: '3:30 PM',
  },
];

export type AdminReservationRow = {
  id: string;
  dateLabel: string;
  timeSlot: string;
  organization: string;
  eventName: string;
  requestor: string;
  status: 'pending' | 'approved' | 'rejected';
};

export const adminReservationRows: AdminReservationRow[] = [
  {
    id: 'r1',
    dateLabel: 'Apr 28, 2026',
    timeSlot: '8:00 AM – 10:00 AM',
    organization: 'JPIA',
    eventName: 'Leadership Seminar',
    requestor: 'Maria Santos',
    status: 'pending',
  },
  {
    id: 'r2',
    dateLabel: 'Apr 28, 2026',
    timeSlot: '1:00 PM – 4:00 PM',
    organization: 'COGS',
    eventName: 'Student Fair',
    requestor: 'Paul Ramos',
    status: 'approved',
  },
  {
    id: 'r3',
    dateLabel: 'Apr 29, 2026',
    timeSlot: '9:00 AM – 12:00 PM',
    organization: 'ABBS',
    eventName: 'General Assembly',
    requestor: 'Ana Gomez',
    status: 'pending',
  },
  {
    id: 'r4',
    dateLabel: 'Apr 30, 2026',
    timeSlot: '5:00 PM – 8:00 PM',
    organization: 'JPIA',
    eventName: 'Team Planning',
    requestor: 'Maria Santos',
    status: 'rejected',
  },
];

export type AdminLnFRow = {
  id: string;
  itemName: string;
  location: string;
  imageUrl: string;
  postedBy: string;
  type: 'FOUND' | 'LOST';
  status: string;
  visibility: 'Public' | 'Private';
  claims: number | null;
};

export const adminLnFRows: AdminLnFRow[] = [
  {
    id: 'lnf1',
    itemName: 'Black iPhone 13',
    location: "James O'Brien Library - 2nd Floor Study Area",
    imageUrl:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=120&h=120&fit=crop',
    postedBy: 'Library Staff',
    type: 'FOUND',
    status: 'Pending Claim',
    visibility: 'Public',
    claims: 2,
  },
  {
    id: 'lnf2',
    itemName: 'Blue Backpack',
    location: 'Xavier Hall — Lobby',
    imageUrl:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop',
    postedBy: 'Renz Alvarez',
    type: 'LOST',
    status: 'Lost',
    visibility: 'Private',
    claims: null,
  },
  {
    id: 'lnf3',
    itemName: 'Wireless Earbuds',
    location: 'Covered Courts — Bench Area',
    imageUrl:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&h=120&fit=crop',
    postedBy: 'Library Staff',
    type: 'FOUND',
    status: 'Pending Claim',
    visibility: 'Public',
    claims: 1,
  },
];

export const adminReportsSummary = {
  reservationsMonth: 18,
  reservationsDelta: '+3 from last month',
  pendingClaims: 3,
  pendingClaimsSub: '2 with disputes',
  openLostItems: 3,
  openLostSub: 'Unresolved this week',
  flaggedUsers: 1,
  flaggedUsersSub: 'Carlos Tan — suspended',
};

export const adminAvailableReports = [
  {
    id: 'rep1',
    name: 'Xavier Hall Reservation Report',
    iconTone: 'blue' as const,
    lastUpdated: 'Apr 28, 2026 · 8:10 AM',
    metrics: '18 bookings · 3 pending',
  },
  {
    id: 'rep2',
    name: 'Lost & Found Report',
    iconTone: 'green' as const,
    lastUpdated: 'Apr 28, 2026 · 7:55 AM',
    metrics: '42 items · 6 claims',
  },
  {
    id: 'rep3',
    name: 'Claims Report',
    iconTone: 'orange' as const,
    lastUpdated: 'Apr 27, 2026 · 4:30 PM',
    metrics: '12 resolved · 3 open',
  },
  {
    id: 'rep4',
    name: 'User Activity Report',
    iconTone: 'purple' as const,
    lastUpdated: 'Apr 26, 2026 · 6:00 PM',
    metrics: '240 actions logged',
  },
];

export const adminReservationDailySummary = [
  { date: 'Apr 23', total: 5, endorsed: 4, pending: 1, cancelled: 0, peak: '2:00 PM' },
  { date: 'Apr 24', total: 4, endorsed: 3, pending: 1, cancelled: 0, peak: '10:00 AM' },
  { date: 'Apr 25', total: 6, endorsed: 5, pending: 0, cancelled: 1, peak: '4:00 PM' },
  { date: 'Apr 26', total: 3, endorsed: 2, pending: 1, cancelled: 0, peak: '11:00 AM' },
  { date: 'Apr 27', total: 7, endorsed: 6, pending: 1, cancelled: 0, peak: '3:00 PM' },
  { date: 'Apr 28', total: 5, endorsed: 4, pending: 1, cancelled: 0, peak: '9:00 AM' },
];

export const adminClaimsResolutionTrend = [
  { month: 'Feb', resolved: 72, pending: 28 },
  { month: 'Mar', resolved: 78, pending: 22 },
  { month: 'Apr', resolved: 84, pending: 16 },
];

export const adminLostCategoriesDonut = [
  { name: 'Electronics', value: 38, fill: '#2563eb' },
  { name: 'Personal Items', value: 28, fill: '#16a34a' },
  { name: 'Accessories', value: 22, fill: '#ea580c' },
  { name: 'Documents', value: 12, fill: '#9333ea' },
];

export type AdminUserDetail = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: 'Admin' | 'OSA Staff' | 'Organization / Officer' | 'Student';
  status: 'Active' | 'Suspended';
  accountRestriction?: {
    status: 'Suspended';
    suspendedBy: string;
    date: string;
    reason: string;
  };
  basicInfo: {
    fullName: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
    createdDate: string;
    department: string;
  };
  activitySummary: {
    reservationsSubmitted: number;
    claimsMade: number;
    lostFoundPosts: number;
    device: string;
  };
  quickActions: Array<{ label: string; type: 'edit' | 'role' | 'password' | 'unsuspend' }>;
  recentActivity: Array<{ id: string; text: string; date: string }>;
};

export const adminUserDetailData: AdminUserDetail = {
  id: 'u6',
  name: 'Carlos Tan',
  email: 'ctan@gbox.adnu.edu.ph',
  initials: 'CT',
  role: 'Student',
  status: 'Suspended',
  accountRestriction: {
    status: 'Suspended',
    suspendedBy: 'Admin User',
    date: 'April 20, 2026',
    reason: 'Repeated false claims in Lost & Found submissions after 3 verified incidents within 30 days.',
  },
  basicInfo: {
    fullName: 'Carlos Tan',
    email: 'ctan@gbox.adnu.edu.ph',
    role: 'Student',
    status: 'Suspended',
    lastActive: 'Apr 20, 2026 9:00 AM',
    createdDate: 'Jan 15, 2026',
    department: '—',
  },
  activitySummary: {
    reservationsSubmitted: 0,
    claimsMade: 3,
    lostFoundPosts: 1,
    device: 'Chrome on Android',
  },
  quickActions: [
    { label: 'Edit Profile', type: 'edit' },
    { label: 'Change Role', type: 'role' },
    { label: 'Reset Password', type: 'password' },
    { label: 'Unsuspend Account', type: 'unsuspend' },
  ],
  recentActivity: [
    { id: '1', text: 'Claim attempt flagged (Apr 19)', date: '' },
    { id: '2', text: 'L&F post flagged (Apr 15)', date: '' },
  ],
};

export type AdminLnFItemDetail = {
  id: string;
  itemName: string;
  location: string;
  imageUrl: string;
  postedBy: string;
  dateReported: string;
  type: 'FOUND' | 'LOST';
  status: string;
  visibility: 'Public' | 'Private';
  description: string;
  claims: Array<{
    id: string;
    name: string;
    email: string;
    date: string;
    proof: string;
  }>;
};

export const adminLnFItemDetailData: AdminLnFItemDetail = {
  id: 'lnf1',
  itemName: 'Black iPhone 13',
  location: "James O'Brien Library — 2nd Floor Study Area",
  imageUrl:
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop',
  postedBy: 'Library Staff',
  dateReported: 'April 25, 2026',
  type: 'FOUND',
  status: 'Pending Claim',
  visibility: 'Public',
  description:
    'Black iPhone 13 Pro with a cracked screen protector. No case. Found on a study table.',
  claims: [
    {
      id: 'c1',
      name: 'Mark Villanueva',
      email: 'mvillanueva@gbox.adnu.edu.ph',
      date: '2026-04-25',
      proof: 'Described lock screen wallpaper and last app open correctly',
    },
    {
      id: 'c2',
      name: 'Joy Lim',
      email: 'jlim@gbox.adnu.edu.ph',
      date: '2026-04-26',
      proof: 'Claims to have bought it last month, no receipt',
    },
  ],
};

export type AdminUserRow = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: 'Admin' | 'OSA Staff' | 'Organization / Officer' | 'Student';
  status: 'Active' | 'Suspended';
  lastActive: string;
};

export const adminUserRows: AdminUserRow[] = [
  {
    id: 'u1',
    name: 'OSA Administrator',
    initials: 'OA',
    email: 'osa@adnu.edu.ph',
    role: 'Admin',
    status: 'Active',
    lastActive: 'Apr 28, 2026 · 9:30 AM',
  },
  {
    id: 'u2',
    name: 'Maria Santos',
    initials: 'MS',
    email: 'msantos@adnu.edu.ph',
    role: 'OSA Staff',
    status: 'Active',
    lastActive: 'Apr 28, 2026 · 8:45 AM',
  },
  {
    id: 'u3',
    name: 'Renz Alvarez',
    initials: 'RA',
    email: 'ralvarez@adnu.edu.ph',
    role: 'OSA Staff',
    status: 'Active',
    lastActive: 'Apr 27, 2026 · 4:10 PM',
  },
  {
    id: 'u4',
    name: 'TACTICS Organization',
    initials: 'TO',
    email: 'tactics_org@adnu.edu.ph',
    role: 'Organization / Officer',
    status: 'Active',
    lastActive: 'Apr 26, 2026 · 2:00 PM',
  },
  {
    id: 'u5',
    name: 'Juan Dela Cruz',
    initials: 'JD',
    email: 'student@adnu.edu.ph',
    role: 'Student',
    status: 'Active',
    lastActive: 'Apr 25, 2026 · 11:20 AM',
  },
  {
    id: 'u6',
    name: 'Carlos Tan',
    initials: 'CT',
    email: 'ctan@adnu.edu.ph',
    role: 'Student',
    status: 'Suspended',
    lastActive: 'Apr 20, 2026 · 6:15 PM',
  },
  {
    id: 'u7',
    name: 'COGS Officer',
    initials: 'CO',
    email: 'cogs@adnu.edu.ph',
    role: 'Organization / Officer',
    status: 'Active',
    lastActive: 'Apr 28, 2026 · 7:05 AM',
  },
  {
    id: 'u8',
    name: 'ABBS Officer',
    initials: 'AO',
    email: 'abbs@adnu.edu.ph',
    role: 'Organization / Officer',
    status: 'Active',
    lastActive: 'Apr 24, 2026 · 3:40 PM',
  },
];
