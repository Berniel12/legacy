'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import BookingForm from '@/components/BookingForm';
import { mockBookingRequests, mockCustomers } from '@/data/mockData';
import { BookingRequest } from '@/types';

export default function BookingsPage() {
  const [bookings] = useState<BookingRequest[]>(mockBookingRequests);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDetailsWindow, setShowDetailsWindow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);

  const handleBookingClick = (booking: BookingRequest) => {
    setSelectedBooking(booking);
    setShowDetailsWindow(true);
  };

  const handleNewBooking = (bookingData: Partial<BookingRequest>) => {
    console.log('New booking:', bookingData);
    setShowBookingForm(false);
  };

  const getCustomerName = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    return customer ? customer.companyName : 'Unknown Customer';
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Control Panel */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Booking Management</span>
          </div>
          <div className="p-4 flex space-x-2">
            <button 
              className="win98-button"
              onClick={() => setShowBookingForm(true)}
            >
              New Booking
            </button>
            <button className="win98-button">Export Data</button>
          </div>
        </div>

        {/* Booking Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Total Bookings</span>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl">{bookings.length}</div>
            </div>
          </div>
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Pending Approval</span>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl">
                {bookings.filter(b => b.status === 'Submitted').length}
              </div>
            </div>
          </div>
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>In Progress</span>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl">
                {bookings.filter(b => b.status === 'In Progress').length}
              </div>
            </div>
          </div>
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Completed</span>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl">
                {bookings.filter(b => b.status === 'Approved').length}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>All Bookings</span>
          </div>
          <div className="p-4">
            <table className="win98-table w-full">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Cargo Type</th>
                  <th>Pickup Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleBookingClick(booking)}
                  >
                    <td>{booking.id}</td>
                    <td>{getCustomerName(booking.customerId)}</td>
                    <td>{booking.origin} → {booking.destination}</td>
                    <td>{booking.cargoType}</td>
                    <td>{new Date(booking.requestedPickupDate).toLocaleDateString()}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <BookingForm 
            onSubmit={handleNewBooking}
            onClose={() => setShowBookingForm(false)}
          />
        )}

        {/* Booking Details Window */}
        {showDetailsWindow && selectedBooking && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 win98-window w-[800px]">
            <div className="win98-title-bar flex justify-between">
              <span>Booking Details - {selectedBooking.id}</span>
              <button 
                className="text-white hover:bg-blue-800 px-2"
                onClick={() => setShowDetailsWindow(false)}
              >
                X
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Booking Information */}
              <div className="win98-window">
                <div className="win98-title-bar">
                  <span>Booking Information</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-bold">Customer: </span>
                      {getCustomerName(selectedBooking.customerId)}
                    </div>
                    <div>
                      <span className="font-bold">Origin: </span>
                      {selectedBooking.origin}
                    </div>
                    <div>
                      <span className="font-bold">Destination: </span>
                      {selectedBooking.destination}
                    </div>
                    <div>
                      <span className="font-bold">Status: </span>
                      {selectedBooking.status}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-bold">Cargo Type: </span>
                      {selectedBooking.cargoType}
                    </div>
                    <div>
                      <span className="font-bold">Weight: </span>
                      {selectedBooking.weight} kg
                    </div>
                    <div>
                      <span className="font-bold">Pickup Date: </span>
                      {new Date(selectedBooking.requestedPickupDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-bold">Delivery Date: </span>
                      {new Date(selectedBooking.requestedDeliveryDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="win98-window">
                <div className="win98-title-bar">
                  <span>Documents</span>
                </div>
                <div className="p-4">
                  <table className="win98-table w-full">
                    <thead>
                      <tr>
                        <th>Document Type</th>
                        <th>Status</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBooking.documents.map((doc) => (
                        <tr key={doc.id}>
                          <td>{doc.type}</td>
                          <td>{doc.status}</td>
                          <td>{new Date(doc.uploadDate).toLocaleDateString()}</td>
                          <td>
                            <button className="win98-button text-sm">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quotes */}
              <div className="win98-window">
                <div className="win98-title-bar">
                  <span>Quotes</span>
                </div>
                <div className="p-4">
                  <table className="win98-table w-full">
                    <thead>
                      <tr>
                        <th>Quote ID</th>
                        <th>Amount</th>
                        <th>Transit Time</th>
                        <th>Status</th>
                        <th>Valid Until</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBooking.quotes.map((quote) => (
                        <tr key={quote.id}>
                          <td>{quote.id}</td>
                          <td>{quote.amount} {quote.currency}</td>
                          <td>{quote.transitTime}</td>
                          <td>{quote.status}</td>
                          <td>{new Date(quote.validUntil).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="win98-button">Update Status</button>
                <button className="win98-button">Add Document</button>
                <button className="win98-button">Generate Quote</button>
                <button 
                  className="win98-button"
                  onClick={() => setShowDetailsWindow(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
