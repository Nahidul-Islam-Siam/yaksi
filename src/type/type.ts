// types/administration.ts

export type Role = "User" | "Admin" | "Administrator";

export interface AdministrationMember {
  _id: string;
  role: Role;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  introduction?: string;
  images?: string;
}

export interface JetSki {
  id: number;
  name: string;
  model: string;
  hp: number;
  price: number;
  description: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SubscriptionType = "DAY_RENTALS" | "ADVENTURE_PACK" | "MEMBERSHIP";

export interface Subscription {
  id: number;
  userId: number;
  type: SubscriptionType;
  title: string;
  totalRides: number;
  ridesCompleted: number;
  ridesLeft: number;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
}

// In your types
export interface User {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  country: string;
  phone: string;
  subscriptions?: Subscription[];
  role?: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface UsersApiResponse {
  success: boolean;
  data: User[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  message: string;
}

export interface ContactFormValues {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface JWTPayload {
  id: string;
  userEmail: string;
  role: Role;
  iat: number;
  exp: number;
}

// Types based on your API responses
export interface UserRegisterRequest {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  country?: string;
  drivingLicense?: string;
}

export interface AdminRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  country?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  image?: File;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
export interface TUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  password?: string;
  __v?: number;

  // Optional / extra fields
  avatar?: string;
  images?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  introduction?: string;

  // Fields from your API response
  adventurePurchaseId?: string[];
  subscriptionPurchaseId?: string[];
  purchesCredits?: number;
  remainingCredits?: number;
}

// API Response structure (Note: Capital "Data")
export interface TApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  Data: T;
  length: number;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Jet Ski interfaces
export interface TJetSki {
  _id: string;
  name: string;
  model: string;
  hp: number;
  price: number;
  description: string;
  images: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// Booking status + payment status enums
export type BookingStatus = "active" | "cancelled" | "pending";
export type PaymentStatus = "paid" | "unpaid" | "refunded";

export interface AdventurePurchase {
  _id: string;
  userId: string;
  adventurePackId: string;
  model: string;
  ridesNumber: number;
  purchesCredits: number;
  remainingCredits: number;
  type: "onetime" | "recurring";
  stripePaymentIntentId: string;
  startDate: string;
  expiryDate: string;
  status: BookingStatus;
  price: number;
  totalPrice: number;
  refundableDeposit: number;
  refundableBound: boolean;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface TBooking {
  _id: string;
  userId: TUser | null; // now full user object
  jetSkyId: TJetSki;
  rentPackId: Rent;
  adventurePurchaseId?: AdventurePurchase; // optional, because not all bookings may have it
  model: string;
  bookingDate: string; // ISO string
  drivingLicense: string;
  status: BookingStatus;
  price: number;
  totalPrice: number;
  refundableDeposit?: number;
  refundableBound: boolean;
  paymentStatus: PaymentStatus;
  subscriptionPurchaseId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllJetParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

// Request interfaces for create/update
export interface CreateJetSkiRequest {
  name: string;
  model: string;
  hp: number | string;
  price: number | string;
  description: string;
  image: File;
}

export interface UpdateJetSkiRequest {
  name?: string;
  model?: string;
  hp?: number | string;
  price?: number | string;
  description?: string;
  image?: File;
}

export interface FeatureListItem {
  value: string;
}

export interface Rent {
  _id: string;
  jet_skyId: TJetSki;
  model: string;
  hp: number;
  price: number;
  feature_list: string[];
  createdAt: string;
  updatedAt: string;
  bookingDate?: [];
}

/* ------------------------ Request payload types ------------------------- */
export interface CreateRentRequest {
  jet_skyId: string;
  model: string;
  hp: number;
  price: number;
  feature_list: string[];
}

export interface UpdateRentRequest {
  jet_skyId?: string;
  model?: string;
  hp?: number;
  price?: number;
  feature_list?: string[];
}
