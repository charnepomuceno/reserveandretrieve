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
    imageUrl: 'https://i.ebayimg.com/images/g/7FAAAOSwFDtl8l84/s-l400.jpg',
  },
  {
    id: 'item-2',
    itemName: 'Silver Watch',
    category: 'Electronics',
    description: 'Silver analog watch with leather band',
    location: 'Library 2nd Floor, Solo Cubicles',
    dateReported: '2026-05-9',
    status: 'unclaimed',
    imageUrl: 'https://media.istockphoto.com/id/531479124/photo/luxury-wrist-watch-on-desk.jpg?s=612x612&w=0&k=20&c=qUqq3BBofcRbA2tBb87iNZTbRAvRJlOsapr1-0X0tSI=',
  },
  {
    id: 'item-3',
    itemName: 'Student ID Card',
    category: 'Documents',
    description: 'ADNU Student ID, Name: Juan Dela Cruz',
    location: 'Phelan Building Hallway, Near Room P112',
    dateReported: '2026-04-18',
    status: 'claimed',
    imageUrl: 'https://freehindidesign.com/wp-content/uploads/2024/08/IT-comareer-computer-education-marketer-identity-card-template-cdr-and-psd-file-download-030824-min.webp',
  },
  {
    id: 'item-4',
    itemName: 'Black Umbrella',
    category: 'Accessories',
    description: 'Compact black umbrella with ADNU branding',
    location: 'Xavier Hall, Back of the Stage',
    dateReported: '2026-05-7',
    status: 'found',
    imageUrl: 'https://thumbs.dreamstime.com/b/folded-automatic-black-umbrella-lying-wooden-table-view-above-98731589.jpg',
  },
  {
    id: 'item-5',
    itemName: 'Wireless Earbuds',
    category: 'Electronics',
    description: 'White wireless earbuds in charging case',
    location: 'Covered Courts',
    dateReported: '2026-04-16',
    status: 'lost',
    imageUrl: 'https://www.simplyheadsets.com.au/media/wysiwyg/Reviews/EPOS_ADAPT_E1_-_P1060644.jpg',
  },
  {
    id: 'item-6',
    itemName: 'Notebook',
    category: 'Documents',
    description: 'Spiral notebook with math notes',
    location: 'Dolan Building Hallway',
    dateReported: '2026-05-15',
    status: 'unclaimed',
    imageUrl: 'https://img.freepik.com/premium-photo/closed-notebook-wooden-table_1232-5539.jpg',
  },
];

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
