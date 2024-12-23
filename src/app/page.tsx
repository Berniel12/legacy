'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import BookingForm from '@/components/BookingForm';
import TrackShipmentModal from '@/components/TrackShipmentModal';
import GenerateReportModal from '@/components/GenerateReportModal';
import { mockShipments, mockVessels } from '@/data/mockData';
import { Shipment, Vessel } from '@/types';

export default function Home() {
  const [recentShipments, setRecentShipments] = useState<Shipment[]>([]);
  const [activeVessels, setActiveVessels] = useState<Vessel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    setRecentShipments(mockShipments.slice(0, 5));
    setActiveVessels(mockVessels.filter(v => v.status === 'In Transit').slice(0, 5));
    setIsLoading(false);
  }, []);

  const handleNewBooking = (bookingData: any) => {
    console.log('New booking:', bookingData);
    setShowBookingForm(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-2 gap-4">
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Shipments */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Recent Shipments</span>
          </div>
          <div className="p-4">
            <table className="win98-table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Destination</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>{shipment.id}</td>
                    <td>{shipment.status}</td>
                    <td>{shipment.destination}</td>
                    <td>{new Date(shipment.eta).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Vessels */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Active Vessels</span>
          </div>
          <div className="p-4">
            <table className="win98-table w-full">
              <thead>
                <tr>
                  <th>Vessel</th>
                  <th>Location</th>
                  <th>Destination</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {activeVessels.map((vessel) => (
                  <tr key={vessel.id}>
                    <td>{vessel.name}</td>
                    <td>{vessel.currentLocation}</td>
                    <td>{vessel.nextDestination}</td>
                    <td>{new Date(vessel.eta).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Quick Actions</span>
          </div>
          <div className="p-4 space-y-2">
            <button 
              className="win98-button w-full"
              onClick={() => setShowBookingForm(true)}
            >
              Create New Shipment
            </button>
            <button 
              className="win98-button w-full"
              onClick={() => setShowTrackingModal(true)}
            >
              Track Shipment
            </button>
            <button 
              className="win98-button w-full"
              onClick={() => setShowReportModal(true)}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>System Status</span>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Shipments:</span>
                <span>{mockShipments.filter(s => s.status === 'In Transit').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Vessels in Transit:</span>
                <span>{mockVessels.filter(v => v.status === 'In Transit').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Deliveries:</span>
                <span>{mockShipments.filter(s => s.status === 'Pending').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBookingForm && (
        <BookingForm 
          onSubmit={handleNewBooking}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {showTrackingModal && (
        <TrackShipmentModal 
          onClose={() => setShowTrackingModal(false)}
        />
      )}

      {showReportModal && (
        <GenerateReportModal 
          onClose={() => setShowReportModal(false)}
        />
      )}
    </Layout>
  );
}
