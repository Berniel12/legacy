import { Shipment, Vessel, Customer, Invoice, TrackingEvent, RoutePoint, Payment, BookingRequest, Document, Quote } from '@/types';

export const ports = [
  { id: 'PORT001', name: 'Port of Rotterdam', country: 'Netherlands', coordinates: { lat: 51.9225, lng: 4.47917 } },
  { id: 'PORT002', name: 'Port of Singapore', country: 'Singapore', coordinates: { lat: 1.29027, lng: 103.851 } },
  { id: 'PORT003', name: 'Port of Shanghai', country: 'China', coordinates: { lat: 31.2304, lng: 121.4737 } },
  { id: 'PORT004', name: 'Port of Los Angeles', country: 'United States', coordinates: { lat: 33.7425, lng: -118.2623 } },
  { id: 'PORT005', name: 'Port of Hamburg', country: 'Germany', coordinates: { lat: 53.5511, lng: 9.9937 } },
  { id: 'PORT006', name: 'Port of Dubai', country: 'UAE', coordinates: { lat: 25.2697, lng: 55.2797 } },
  { id: 'PORT007', name: 'Port of Sydney', country: 'Australia', coordinates: { lat: -33.8688, lng: 151.2093 } },
  { id: 'PORT008', name: 'Port of Mumbai', country: 'India', coordinates: { lat: 18.9220, lng: 72.8347 } },
  { id: 'PORT009', name: 'Port of Cape Town', country: 'South Africa', coordinates: { lat: -33.9180, lng: 18.4233 } },
  { id: 'PORT010', name: 'Port of Santos', country: 'Brazil', coordinates: { lat: -23.9619, lng: -46.3042 } }
];

const portNames = ports.map(port => port.name);

const generateTrackingEvents = (shipmentId: string, count: number = 5): TrackingEvent[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `EVT${String(Math.random() * 10000).padStart(5, '0')}`,
    shipmentId,
    timestamp: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString(),
    location: portNames[Math.floor(Math.random() * portNames.length)],
    status: ['Departed', 'Arrived', 'Customs Check', 'Loading', 'Unloading'][Math.floor(Math.random() * 5)],
    description: 'Event description here'
  }));
};

const generateRoutePoints = (vesselId: string): RoutePoint[] => {
  const statuses: RoutePoint['status'][] = ['Scheduled', 'Completed', 'Delayed', 'Cancelled'];
  return Array.from({ length: 4 }, (_, i) => ({
    id: `RPT${String(Math.random() * 10000).padStart(5, '0')}`,
    vesselId,
    port: portNames[Math.floor(Math.random() * portNames.length)],
    eta: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
    etd: new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }));
};

const generatePaymentHistory = (invoiceId: string): Payment[] => {
  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: `PMT${String(Math.random() * 10000).padStart(5, '0')}`,
    invoiceId,
    amount: Math.floor(Math.random() * 5000) + 1000,
    date: new Date(Date.now() - i * 15 * 24 * 60 * 60 * 1000).toISOString(),
    method: ['Bank Transfer', 'Credit Card', 'Check', 'Cash'][Math.floor(Math.random() * 4)] as Payment['method'],
    reference: `REF${Math.floor(Math.random() * 1000000)}`,
    status: ['Completed', 'Pending', 'Failed'][Math.floor(Math.random() * 3)] as Payment['status']
  }));
};

export const mockShipments: Shipment[] = Array.from({ length: 50 }, (_, i) => {
  const id = `SHP${String(i + 1).padStart(5, '0')}`;
  return {
    id,
    sender: `Company ${i + 1} Ltd.`,
    receiver: `Receiver Corp ${i + 1}`,
    cargoType: ['Container', 'Bulk', 'Liquid', 'Break Bulk'][Math.floor(Math.random() * 4)],
    weight: Math.floor(Math.random() * 50000) + 1000,
    origin: portNames[Math.floor(Math.random() * portNames.length)],
    destination: portNames[Math.floor(Math.random() * portNames.length)],
    status: ['Pending', 'In Transit', 'Delivered', 'Delayed', 'Customs Hold', 'Loading', 'Unloading'][Math.floor(Math.random() * 7)] as Shipment['status'],
    vessel: `VSL${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`,
    eta: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    created: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    containerCount: Math.floor(Math.random() * 100) + 1,
    customsStatus: ['Cleared', 'Pending', 'Inspection Required', 'Documentation Missing'][Math.floor(Math.random() * 4)] as Shipment['customsStatus'],
    hazmatClass: Math.random() > 0.7 ? `Class ${Math.floor(Math.random() * 9) + 1}` : undefined,
    temperature: Math.random() > 0.7 ? Math.floor(Math.random() * 30) : undefined,
    specialInstructions: Math.random() > 0.7 ? 'Handle with care' : undefined,
    trackingEvents: generateTrackingEvents(id)
  };
});

export const mockVessels: Vessel[] = Array.from({ length: 20 }, (_, i) => {
  const id = `VSL${String(i + 1).padStart(3, '0')}`;
  return {
    id,
    name: `MV OCEANIC ${String(i + 1).padStart(2, '0')}`,
    capacity: Math.floor(Math.random() * 50000) + 10000,
    currentLocation: portNames[Math.floor(Math.random() * portNames.length)],
    status: ['Docked', 'In Transit', 'Maintenance', 'Loading', 'Unloading', 'Anchored'][Math.floor(Math.random() * 6)] as Vessel['status'],
    nextDestination: portNames[Math.floor(Math.random() * portNames.length)],
    eta: new Date(Date.now() + Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
    crew: Math.floor(Math.random() * 20) + 10,
    fuelLevel: Math.floor(Math.random() * 100),
    lastMaintenance: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    nextMaintenance: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    currentSpeed: Math.floor(Math.random() * 25) + 5,
    route: generateRoutePoints(id)
  };
});

export const mockCustomers: Customer[] = Array.from({ length: 30 }, (_, i) => ({
  id: `CUS${String(i + 1).padStart(5, '0')}`,
  companyName: `Global Trading ${i + 1} Inc.`,
  contactPerson: `John Smith ${i + 1}`,
  email: `contact${i + 1}@globaltrading.com`,
  phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
  address: `${Math.floor(Math.random() * 1000) + 1} Business Ave, Suite ${i + 100}`,
  accountType: ['Regular', 'Premium', 'VIP'][Math.floor(Math.random() * 3)] as Customer['accountType'],
  creditLimit: Math.floor(Math.random() * 1000000) + 100000,
  paymentTerms: ['Net 30', 'Net 45', 'Net 60'][Math.floor(Math.random() * 3)],
  activeContracts: Math.floor(Math.random() * 5) + 1,
  yearlyShipments: Math.floor(Math.random() * 100) + 10,
  preferredPorts: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
    portNames[Math.floor(Math.random() * portNames.length)]
  )
}));

export const mockInvoices: Invoice[] = mockShipments.map((shipment, i) => {
  const id = `INV${String(i + 1).padStart(5, '0')}`;
  const subtotal = Math.floor(Math.random() * 50000) + 5000;
  const taxRate = 0.2;
  const taxAmount = subtotal * taxRate;
  const discount = Math.random() > 0.7 ? subtotal * 0.1 : 0;
  
  return {
    id,
    shipmentId: shipment.id,
    customerId: mockCustomers[Math.floor(Math.random() * mockCustomers.length)].id,
    subtotal,
    taxAmount,
    discount,
    amount: subtotal + taxAmount - discount,
    status: ['Pending', 'Paid', 'Overdue', 'Cancelled', 'Partially Paid'][Math.floor(Math.random() * 5)] as Invoice['status'],
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    created: shipment.created,
    paymentHistory: generatePaymentHistory(id),
    currency: ['USD', 'EUR', 'GBP'][Math.floor(Math.random() * 3)],
    terms: 'Payment due within 30 days'
  };
});

export const mockBookingRequests: BookingRequest[] = Array.from({ length: 20 }, (_, i) => {
  const id = `BKG${String(i + 1).padStart(5, '0')}`;
  return {
    id,
    customerId: mockCustomers[Math.floor(Math.random() * mockCustomers.length)].id,
    origin: portNames[Math.floor(Math.random() * portNames.length)],
    destination: portNames[Math.floor(Math.random() * portNames.length)],
    cargoType: ['Container', 'Bulk', 'Liquid', 'Break Bulk'][Math.floor(Math.random() * 4)],
    containerType: ['20ft', '40ft', '40ft High Cube', 'Reefer'][Math.floor(Math.random() * 4)],
    weight: Math.floor(Math.random() * 50000) + 1000,
    volume: Math.floor(Math.random() * 1000) + 100,
    pieces: Math.floor(Math.random() * 1000) + 10,
    hazardous: Math.random() > 0.8,
    temperature: Math.random() > 0.7 ? Math.floor(Math.random() * 30) : undefined,
    specialRequirements: Math.random() > 0.7 ? 'Handle with care' : undefined,
    requestedPickupDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    requestedDeliveryDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
    status: ['Draft', 'Submitted', 'Approved', 'Rejected', 'In Progress'][Math.floor(Math.random() * 5)] as BookingRequest['status'],
    documents: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
      id: `DOC${String(Math.random() * 10000).padStart(5, '0')}`,
      bookingId: id,
      type: ['Bill of Lading', 'Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Insurance'][Math.floor(Math.random() * 5)] as Document['type'],
      status: ['Pending', 'Approved', 'Rejected'][Math.floor(Math.random() * 3)] as Document['status'],
      uploadDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      notes: Math.random() > 0.7 ? 'Document notes here' : undefined
    })),
    quotes: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, j) => ({
      id: `QTE${String(Math.random() * 10000).padStart(5, '0')}`,
      bookingId: id,
      amount: Math.floor(Math.random() * 50000) + 5000,
      currency: ['USD', 'EUR', 'GBP'][Math.floor(Math.random() * 3)],
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      transitTime: `${Math.floor(Math.random() * 30) + 5} days`,
      vessel: Math.random() > 0.5 ? mockVessels[Math.floor(Math.random() * mockVessels.length)].name : undefined,
      routeDetails: 'Via Singapore Hub',
      terms: 'Standard shipping terms apply',
      status: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'][Math.floor(Math.random() * 5)] as Quote['status']
    }))
  };
});
