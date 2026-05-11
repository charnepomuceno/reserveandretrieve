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
    organizationName: 'Dugong Atenista',
    eventDate: '2026-04-16',
    eventTime: '8:00 AM - 4:00 PM',
    venue: 'Xavier Hall',
    status: 'approved',
    createdDate: '2026-04-10',
    attendees: 100,
  },
  {
    id: 'res-2',
    organizationName: 'National Business Law Summit',
    eventDate: '2026-04-17',
    eventTime: '8:00 AM - 5:00 PM',
    venue: 'Xavier Hall',
    status: 'approved',
    createdDate: '2026-04-05',
    attendees: 200,
  },
  {
    id: 'res-3',
    organizationName: 'National Business Law Summit',
    eventDate: '2026-04-18',
    eventTime: '8:00 AM - 5:00 PM',
    venue: 'Xavier Hall',
    status: 'approved',
    createdDate: '2026-04-05',
    attendees: 200,
  },
  {
    id: 'res-4',
    organizationName: 'National Business Law Summit',
    eventDate: '2026-04-19',
    eventTime: '8:00 AM - 5:00 PM',
    venue: 'Xavier Hall',
    status: 'approved',
    createdDate: '2026-04-05',
    attendees: 200,
  },
  {
    id: 'res-5',
    organizationName: 'Trade Fair 2026',
    eventDate: '2026-04-21',
    eventTime: '8:00 AM - 5:00 PM',
    venue: 'Xavier Hall',
    status: 'pending',
    createdDate: '2026-04-15',
    attendees: 300,
  },
  {
    id: 'res-6',
    organizationName: 'Trade Fair 2026',
    eventDate: '2026-04-22',
    eventTime: '8:00 AM - 5:00 PM',
    venue: 'Xavier Hall',
    status: 'pending',
    createdDate: '2026-04-15',
    attendees: 300,
  },
  {
    id: 'res-7',
    organizationName: 'Trade Fair 2026',
    eventDate: '2026-04-23',
    eventTime: '8:00 AM - 5:00 PM',
    venue: 'Xavier Hall',
    status: 'pending',
    createdDate: '2026-04-15',
    attendees: 300,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'reservation',
    title: 'Reservation Approved',
    message: 'Your Dugong Atenista reservation for April 16 at Xavier Hall has been approved.',
    date: '2026-04-15',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'system',
    title: 'Upcoming Event Reminder',
    message: 'Your National Business Law Summit is scheduled for April 17-19. Please confirm final details.',
    date: '2026-04-10',
    read: false,
  },
  {
    id: 'notif-4',
    type: 'reservation',
    title: 'Reservation Pending Review',
    message: 'Your Trade Fair 2026 reservation for April 21-23 is pending staff review.',
    date: '2026-04-16',
    read: true,
  },
];

export const mockOrgNotifications: Notification[] = mockNotifications.filter((n) => n.type !== 'claim');

export const mockStudentNotifications: Notification[] = mockNotifications.filter((n) => n.type !== 'reservation');

export const mockOsaStaffNotifications: Notification[] = [
  {
    id: 'notif-osa-1',
    type: 'claim',
    title: 'New Claim Request',
    message: 'A student requested to claim a lost item on April 28 at 10:00 AM. Review the pickup schedule and confirm it.',
    date: '2026-04-27',
    read: false,
  },
  {
    id: 'notif-osa-2',
    type: 'system',
    title: 'Claim Desk Reserved',
    message: 'The claim desk is reserved for student pick-ups on April 29 from 8:00 AM to 12:00 PM.',
    date: '2026-04-26',
    read: true,
  },
];

export const mockLostFoundItems: LostFoundItem[] = [
  {
    id: 'item-1',
    itemName: 'Blue Backpack',
    category: 'Accessories',
    description: 'Navy blue backpack with ADNU logo',
    location: 'Bonoan 1st Floor - Near the Stairs',
    dateReported: '2026-06-02',
    status: 'lost',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-2',
    itemName: 'Silver Watch',
    category: 'Electronics',
    description: 'Silver analog watch with leather band',
    location: 'Library 2nd Floor, Solo Cubicles',
    dateReported: '2026-05-9',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-3',
    itemName: 'Student ID Card',
    category: 'Documents',
    description: 'ADNU Student ID, Name: Juan Dela Cruz',
    location: 'Phelan Building Hallway, Near Room P112',
    dateReported: '2026-04-18',
    status: 'claimed',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-4',
    itemName: 'Black Umbrella',
    category: 'Accessories',
    description: 'Compact black umbrella with ADNU branding',
    location: 'Xavier Hall, Back of the Stage',
    dateReported: '2026-05-7',
    status: 'found',
    imageUrl: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-5',
    itemName: 'Wireless Earbuds',
    category: 'Electronics',
    description: 'White wireless earbuds in charging case',
    location: 'Covered Courts',
    dateReported: '2026-04-16',
    status: 'lost',
    imageUrl: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-6',
    itemName: 'Notebook',
    category: 'Documents',
    description: 'Spiral notebook with math notes',
    location: 'Dolan Building Hallway',
    dateReported: '2026-05-15',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-7',
    itemName: 'Black Wallet',
    category: 'Accessories',
    description: 'Slim black leather wallet with a small zipper pocket',
    location: 'Cafeteria - Cashier Area',
    dateReported: '2026-05-21',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-8',
    itemName: 'House Keys (Blue Keychain)',
    category: 'Accessories',
    description: 'Two keys with a blue plastic keychain',
    location: 'Rizal Building - Lobby Bench',
    dateReported: '2026-05-22',
    status: 'found',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-9',
    itemName: 'Water Bottle (Stainless Steel)',
    category: 'Personal Items',
    description: 'Silver stainless bottle, 750ml, with a dent near the base',
    location: 'Gym - Bleachers',
    dateReported: '2026-05-24',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-10',
    itemName: 'Calculator',
    category: 'Electronics',
    description: 'Scientific calculator with clear case',
    location: 'Engineering Building - Room E203',
    dateReported: '2026-05-25',
    status: 'found',
    imageUrl: 'https://images.unsplash.com/photo-1564473185935-5818b1b2d37d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-11',
    itemName: 'Eyeglasses (Black Frame)',
    category: 'Personal Items',
    description: 'Black rectangular frame in a soft pouch',
    location: 'Library 1st Floor - Reading Area',
    dateReported: '2026-05-26',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-12',
    itemName: 'Pencil Case',
    category: 'School Supplies',
    description: 'Gray fabric pencil case with multiple compartments',
    location: 'SHS Building - Room S104',
    dateReported: '2026-05-27',
    status: 'found',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-13',
    itemName: 'Phone Charger (USB-C)',
    category: 'Electronics',
    description: 'White USB-C cable with 20W adapter',
    location: 'CICS Building - Computer Lab',
    dateReported: '2026-05-28',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330a33?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'item-14',
    itemName: 'Ring Binder (Blue)',
    category: 'Documents',
    description: 'Blue A4 ring binder with printed lecture notes inside',
    location: 'Bonoan 2nd Floor - Hallway Shelf',
    dateReported: '2026-05-29',
    status: 'found',
    imageUrl: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1200&q=80',
  },
];

export const mockPublicLostFoundItems: LostFoundItem[] = mockLostFoundItems.filter(
  (item) => item.status === 'unclaimed' || item.status === 'found'
);

export const calendarDates = [
  { date: 16, hasEvent: true, event: 'Dugong Atenista' },
  { date: 17, hasEvent: true, event: 'National Business Law Summit' },
  { date: 18, hasEvent: true, event: 'National Business Law Summit' },
  { date: 19, hasEvent: true, event: 'National Business Law Summit' },
  { date: 21, hasEvent: true, event: 'Trade Fair 2026' },
  { date: 22, hasEvent: true, event: 'Trade Fair 2026' },
  { date: 23, hasEvent: true, event: 'Trade Fair 2026' },
];

export const ADNU_VENUES = [
  'Xavier Hall',
];
