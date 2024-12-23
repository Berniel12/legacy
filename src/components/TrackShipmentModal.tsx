'use client';

import { useState } from 'react';
import { mockShipments } from '@/data/mockData';
import { Shipment } from '@/types';

interface TrackShipmentModalProps {
  onClose: () => void;
}

const TrackShipmentModal: React.FC<TrackShipmentModalProps> = ({ onClose }) => {
  const [searchId, setSearchId] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const found = mockShipments.find(s => s.id === searchId);
    if (found) {
      setShipment(found);
      setError('');
    } else {
      setShipment(null);
      setError('Shipment not found');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="win98-window w-[600px]">
        <div className="win98-title-bar flex justify-between">
          <span>Track Shipment</span>
          <button 
            className="text-white hover:bg-blue-800 px-2"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              className="win98-input flex-grow"
              placeholder="Enter Shipment ID (e.g., SHP00001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button 
              className="win98-button"
              onClick={handleSearch}
            >
              Track
            </button>
          </div>

          {error && (
            <div className="win98-window bg-red-100">
              <div className="p-2 text-red-600">
                {error}
              </div>
            </div>
          )}

          {shipment && (
            <div className="space-y-4">
              {/* Shipment Overview */}
              <div className="win98-window">
                <div className="win98-title-bar">
                  <span>Shipment Details</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-2">
                  <div><strong>Status:</strong> {shipment.status}</div>
                  <div><strong>Origin:</strong> {shipment.origin}</div>
                  <div><strong>Destination:</strong> {shipment.destination}</div>
                  <div><strong>ETA:</strong> {new Date(shipment.eta).toLocaleDateString()}</div>
                  <div><strong>Vessel:</strong> {shipment.vessel}</div>
                  <div><strong>Cargo Type:</strong> {shipment.cargoType}</div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="win98-window">
                <div className="win98-title-bar">
                  <span>Tracking Events</span>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {shipment.trackingEvents.map((event) => (
                      <div key={event.id} className="win98-window">
                        <div className="p-2">
                          <div className="font-bold">
                            {new Date(event.timestamp).toLocaleString()}
                          </div>
                          <div>{event.status} - {event.location}</div>
                          <div className="text-sm">{event.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackShipmentModal;
