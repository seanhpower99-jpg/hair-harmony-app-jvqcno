import { Customer, Hairdresser, Booking } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '555-1234',
    role: 'customer',
  },
  {
    id: 2,
    name: 'Brian Smith',
    email: 'brian@example.com',
    phone: '555-5678',
    role: 'customer',
  },
];

export const mockHairdressers: Hairdresser[] = [
  {
    id: 100,
    name: 'Sophia Styles',
    email: 'sophia@trimz.com',
    phone: '555-2222',
    role: 'hairdresser',
    salon: 'Downtown Cuts',
    rating: 4.8,
  },
  {
    id: 101,
    name: 'Liam Fade',
    email: 'liam@trimz.com',
    phone: '555-3333',
    role: 'hairdresser',
    salon: 'Uptown Barber Lounge',
    rating: 4.6,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 1,
    customerId: 1,
    customerName: 'Alice Johnson',
    hairdresserId: 100,
    hairdresserName: 'Sophia Styles',
    service: 'Women’s Haircut',
    date: '2025-10-02 14:00',
    status: 'confirmed',
  },
  {
    id: 2,
    customerId: 1,
    customerName: 'Alice Johnson',
    hairdresserId: 101,
    hairdresserName: 'Liam Fade',
    service: 'Hair Coloring',
    date: '2025-10-05 10:30',
    status: 'pending',
  },
  {
    id: 3,
    customerId: 2,
    customerName: 'Brian Smith',
    hairdresserId: 100,
    hairdresserName: 'Sophia Styles',
    service: 'Men’s Fade Cut',
    date: '2025-10-07 16:00',
    status: 'confirmed',
  },
  {
    id: 4,
    customerId: 2,
    customerName: 'Brian Smith',
    hairdresserId: 101,
    hairdresserName: 'Liam Fade',
    service: 'Beard Trim',
    date: '2025-10-10 18:00',
    status: 'cancelled',
  },
  {
    id: 5,
    customerId: 1,
    customerName: 'Alice Johnson',
    hairdresserId: 100,
    hairdresserName: 'Sophia Styles',
    service: 'Blow Dry & Styling',
    date: '2025-10-15 12:00',
    status: 'confirmed',
  },
];

// Demo earnings data for hairdressers
export const mockEarnings = [
  {
    id: 100,
    hairdresserName: 'Sophia Styles',
    totalEarnings: 450.0,
    recent: [
      { service: 'Women’s Haircut', amount: 120, date: '2025-10-02' },
      { service: 'Men’s Fade Cut', amount: 80, date: '2025-10-07' },
      { service: 'Blow Dry & Styling', amount: 150, date: '2025-10-15' },
    ],
  },
  {
    id: 101,
    hairdresserName: 'Liam Fade',
    totalEarnings: 220.0,
    recent: [
      { service: 'Hair Coloring', amount: 180, date: '2025-10-05' },
      { service: 'Beard Trim', amount: 40, date: '2025-10-10' },
    ],
  },
];
