
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  isHairdresser: boolean;
  createdAt: Date;
}

export interface Hairdresser extends User {
  businessName: string;
  bio: string;
  services: Service[];
  location: Location;
  availability: Availability[];
  subscriptionPlan: SubscriptionPlan;
  socialMedia: SocialMedia;
  portfolio: string[];
  isAvailableToday: boolean;
  distance?: number;
}

export interface Customer extends User {
  favoriteHairdressers: string[];
  bookingHistory: Booking[];
  previousHairdressers: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: ServiceCategory;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  hairdresserId: string;
  serviceId: string;
  date: Date;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  rating?: number;
  review?: string;
}

export interface Review {
  id: string;
  customerId: string;
  hairdresserId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
}

export type SubscriptionPlan = 'basic' | 'premium' | 'gold';
export type ServiceCategory = 'haircut' | 'coloring' | 'styling' | 'treatment' | 'other';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type UserType = 'customer' | 'hairdresser';
