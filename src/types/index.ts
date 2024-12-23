export interface Shipment {
  id: string;
  sender: string;
  receiver: string;
  cargoType: string;
  weight: number;
  destination: string;
  origin: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Delayed' | 'Customs Hold' | 'Loading' | 'Unloading';
  vessel: string;
  eta: string;
  created: string;
  containerCount?: number;
  customsStatus?: 'Cleared' | 'Pending' | 'Inspection Required' | 'Documentation Missing';
  hazmatClass?: string;
  temperature?: number;
  specialInstructions?: string;
  trackingEvents: TrackingEvent[];
}

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

export interface Vessel {
  id: string;
  name: string;
  capacity: number;
  currentLocation: string;
  status: 'Docked' | 'In Transit' | 'Maintenance' | 'Loading' | 'Unloading' | 'Anchored';
  nextDestination: string;
  eta: string;
  crew: number;
  fuelLevel: number;
  lastMaintenance: string;
  nextMaintenance: string;
  currentSpeed?: number;
  route: RoutePoint[];
}

export interface RoutePoint {
  id: string;
  vesselId: string;
  port: string;
  eta: string;
  etd: string;
  status: 'Scheduled' | 'Completed' | 'Delayed' | 'Cancelled';
}

export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  accountType: 'Regular' | 'Premium' | 'VIP';
  creditLimit: number;
  paymentTerms: string;
  activeContracts: number;
  yearlyShipments: number;
  preferredPorts: string[];
}

export interface Invoice {
  id: string;
  shipmentId: string;
  customerId: string;
  amount: number;
  status: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled' | 'Partially Paid';
  dueDate: string;
  created: string;
  paymentHistory: Payment[];
  currency: string;
  taxAmount: number;
  subtotal: number;
  discount?: number;
  terms: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  date: string;
  method: 'Bank Transfer' | 'Credit Card' | 'Check' | 'Cash';
  reference: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface BookingRequest {
  id: string;
  customerId: string;
  origin: string;
  destination: string;
  cargoType: string;
  containerType?: string;
  weight: number;
  volume?: number;
  pieces?: number;
  hazardous: boolean;
  hazmatClass?: string;
  temperature?: number;
  specialRequirements?: string;
  requestedPickupDate: string;
  requestedDeliveryDate: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'In Progress';
  documents: Document[];
  quotes: Quote[];
}

export interface Document {
  id: string;
  bookingId: string;
  type: 'Bill of Lading' | 'Commercial Invoice' | 'Packing List' | 'Certificate of Origin' | 'Insurance';
  status: 'Pending' | 'Approved' | 'Rejected';
  uploadDate: string;
  expiryDate?: string;
  notes?: string;
}

export interface Quote {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  validUntil: string;
  transitTime: string;
  vessel?: string;
  routeDetails: string;
  terms: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
}
