
import { Hairdresser, Customer, Service, Booking } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Men\'s Haircut',
    description: 'Classic men\'s haircut with styling',
    price: 35,
    duration: 45,
    category: 'haircut',
  },
  {
    id: '2',
    name: 'Women\'s Cut & Style',
    description: 'Cut and blow dry styling',
    price: 65,
    duration: 90,
    category: 'haircut',
  },
  {
    id: '3',
    name: 'Hair Coloring',
    description: 'Full color treatment',
    price: 120,
    duration: 180,
    category: 'coloring',
  },
  {
    id: '4',
    name: 'Beard Trim',
    description: 'Professional beard trimming and shaping',
    price: 25,
    duration: 30,
    category: 'haircut',
  },
];

export const mockHairdressers: Hairdresser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@trimz.com',
    phone: '+1234567890',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 127,
    isHairdresser: true,
    businessName: 'Sarah\'s Style Studio',
    bio: 'Passionate hairstylist with 8 years of experience specializing in modern cuts and color.',
    services: [mockServices[0], mockServices[1], mockServices[2]],
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 6, startTime: '10:00', endTime: '16:00', isAvailable: true },
    ],
    subscriptionPlan: 'premium',
    socialMedia: {
      instagram: '@sarahstyles',
      facebook: 'SarahStyleStudio',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=300&h=300&fit=crop',
    ],
    isAvailableToday: true,
    distance: 0.8,
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Marcus Williams',
    email: 'marcus@trimz.com',
    phone: '+1234567891',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 203,
    isHairdresser: true,
    businessName: 'The Barber\'s Den',
    bio: 'Master barber specializing in classic and modern men\'s cuts. 12 years of experience.',
    services: [mockServices[0], mockServices[3]],
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      address: '456 Broadway',
      city: 'New York',
      state: 'NY',
      zipCode: '10013',
    },
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '08:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 6, startTime: '09:00', endTime: '17:00', isAvailable: true },
    ],
    subscriptionPlan: 'gold',
    socialMedia: {
      instagram: '@barbersden',
      website: 'www.barbersden.com',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=300&fit=crop',
    ],
    isAvailableToday: true,
    distance: 1.2,
    createdAt: new Date('2022-08-20'),
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@trimz.com',
    phone: '+1234567892',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 89,
    isHairdresser: true,
    businessName: 'Color & Cut Co.',
    bio: 'Creative colorist and stylist. Specializing in vibrant colors and trendy cuts.',
    services: [mockServices[1], mockServices[2]],
    location: {
      latitude: 40.7505,
      longitude: -73.9934,
      address: '789 5th Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
    },
    availability: [
      { dayOfWeek: 2, startTime: '10:00', endTime: '19:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '10:00', endTime: '19:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '10:00', endTime: '19:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '10:00', endTime: '19:00', isAvailable: true },
      { dayOfWeek: 6, startTime: '09:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 0, startTime: '11:00', endTime: '16:00', isAvailable: true },
    ],
    subscriptionPlan: 'basic',
    socialMedia: {
      instagram: '@colorandcutco',
      tiktok: '@emmadaviscolor',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1560869713-7d0b29837c64?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop',
    ],
    isAvailableToday: false,
    distance: 2.1,
    createdAt: new Date('2023-03-10'),
  },
  {
    id: '4',
    name: 'Alex Thompson',
    email: 'alex@trimz.com',
    phone: '+1234567894',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    reviewCount: 156,
    isHairdresser: true,
    businessName: 'Modern Cuts',
    bio: 'Contemporary stylist with expertise in trendy cuts and styling.',
    services: [mockServices[0], mockServices[1]],
    location: {
      latitude: 40.7282,
      longitude: -74.0776,
      address: '321 West St',
      city: 'New York',
      state: 'NY',
      zipCode: '10014',
    },
    availability: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '10:00', endTime: '18:00', isAvailable: true },
    ],
    subscriptionPlan: 'premium',
    socialMedia: {
      instagram: '@moderncuts',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=300&fit=crop',
    ],
    isAvailableToday: true,
    distance: 1.5,
    createdAt: new Date('2023-05-12'),
  },
];

export const mockCustomer: Customer = {
  id: 'customer1',
  name: 'John Smith',
  email: 'john@example.com',
  phone: '+1234567893',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  rating: 4.5,
  reviewCount: 12,
  isHairdresser: false,
  favoriteHairdressers: ['1', '2'],
  bookingHistory: [],
  previousHairdressers: ['1', '2', '3'],
  createdAt: new Date('2023-06-01'),
};

export const mockBookings: Booking[] = [
  {
    id: '1',
    customerId: 'customer1',
    hairdresserId: '1',
    serviceId: '1',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    status: 'confirmed',
    totalPrice: 35,
    notes: 'Please keep it short on the sides',
  },
  {
    id: '2',
    customerId: 'customer1',
    hairdresserId: '2',
    serviceId: '3',
    date: new Date('2024-01-15T10:00:00'),
    status: 'completed',
    totalPrice: 25,
    rating: 5,
    review: 'Great service, very professional!',
  },
  {
    id: '3',
    customerId: 'customer1',
    hairdresserId: '3',
    serviceId: '2',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: 'pending',
    totalPrice: 65,
    notes: 'Looking for a new style',
  },
];

// Get upcoming bookings (confirmed or pending, in the future)
export const getUpcomingBookings = () => {
  const now = new Date();
  return mockBookings
    .filter(booking => 
      booking.date > now && 
      (booking.status === 'confirmed' || booking.status === 'pending')
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

// Get next upcoming booking
export const getNextUpcomingBooking = () => {
  const upcomingBookings = getUpcomingBookings();
  return upcomingBookings.length > 0 ? upcomingBookings[0] : null;
};

// Get hairdresser by ID
export const getHairdresserById = (id: string) => {
  return mockHairdressers.find(h => h.id === id);
};

// Get service by ID
export const getServiceById = (id: string) => {
  return mockServices.find(s => s.id === id);
};

// Get regular hairdressers (from previous bookings and favorites)
export const getRegularHairdressers = () => {
  const regularIds = [...new Set([
    ...mockCustomer.favoriteHairdressers,
    ...mockCustomer.previousHairdressers
  ])];
  
  return mockHairdressers.filter(h => regularIds.includes(h.id));
};
