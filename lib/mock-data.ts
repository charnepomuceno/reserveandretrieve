export interface Reservation {
  id: string;
  organizationName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  status: 'pending' | 'approved' | 'cancelled';
  createdDate: string;
  attendees: number;
}

export interface Notification {
  id: string;
  type: 'reservation' | 'claim' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface LostFoundItem {
  id: string;
  itemName: string;
  category: string;
  description: string;
  location: string;
  dateReported: string;
  status: 'lost' | 'found' | 'claimed' | 'unclaimed';
  imageUrl?: string;
}

export const mockReservations: Reservation[] = [
  {
    id: 'res-1',
    organizationName: 'Debate Club',
    eventDate: '2024-05-15',
    eventTime: '14:00',
    venue: 'Xavier Hall',
    status: 'approved',
    createdDate: '2024-04-20',
    attendees: 50,
  },
  {
    id: 'res-2',
    organizationName: 'TACTICS Organization',
    eventDate: '2024-05-22',
    eventTime: '18:00',
    venue: 'Xavier Hall',
    status: 'pending',
    createdDate: '2024-04-22',
    attendees: 200,
  },
  {
    id: 'res-3',
    organizationName: 'Student Research Conference',
    eventDate: '2024-05-10',
    eventTime: '09:00',
    venue: 'Xavier Hall',
    status: 'approved',
    createdDate: '2024-04-18',
    attendees: 150,
  },
  {
    id: 'res-4',
    organizationName: 'Women\'s Month Celebration',
    eventDate: '2024-06-01',
    eventTime: '10:00',
    venue: 'Xavier Hall',
    status: 'pending',
    createdDate: '2024-04-24',
    attendees: 300,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'reservation',
    title: 'Reservation Approved',
    message: 'Your Student Research Conference reservation for May 10 at Xavier Hall has been approved.',
    date: '2024-04-23',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'system',
    title: 'Upcoming Event Reminder',
    message: 'Your Debate Club meeting is scheduled for May 22. Please confirm final details.',
    date: '2024-04-22',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'claim',
    title: 'Lost Item Update',
    message: 'Someone has claimed a lost item matching your report.',
    date: '2024-04-21',
    read: true,
  },
  {
    id: 'notif-4',
    type: 'reservation',
    title: 'Reservation Pending Review',
    message: 'Your Women\'s Month Celebration reservation for June 1 is pending staff review.',
    date: '2024-04-20',
    read: true,
  },
];

export const mockLostFoundItems: LostFoundItem[] = [
  {
    id: 'item-1',
    itemName: 'Blue Backpack',
    category: 'Accessories',
    description: 'Navy blue backpack with ADNU logo',
    location: 'Xavier Hall - Entrance',
    dateReported: '2024-04-20',
    status: 'lost',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
  },
  {
    id: 'item-2',
    itemName: 'Silver Watch',
    category: 'Electronics',
    description: 'Silver analog watch with leather band',
    location: 'Xavier Hall - Cafeteria',
    dateReported: '2024-04-19',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
  },
  {
    id: 'item-3',
    itemName: 'Student ID Card',
    category: 'Documents',
    description: 'ADNU Student ID, Name: Juan Dela Cruz',
    location: 'Xavier Hall - Information Desk',
    dateReported: '2024-04-18',
    status: 'claimed',
    imageUrl: 'https://images.unsplash.com/photo-1488090661541-f48722b34f7d?w=300&h=300&fit=crop',
  },
];

export const calendarDates = [
  { date: 10, hasEvent: true, event: 'Student Research Conference' },
  { date: 15, hasEvent: true, event: 'Debate Club Meeting' },
  { date: 22, hasEvent: true, event: 'TACTICS Seminar' },
  { date: 1, hasEvent: true, event: 'Women\'s Month Celebration', month: 'next' },
];

export const ADNU_VENUES = [
  'Xavier Hall',
];
