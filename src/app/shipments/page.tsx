'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { mockShipments } from '@/data/mockData';
import { Shipment } from '@/types';

export default function ShipmentsPage() {
  const [shipments] = useState<Shipment[]>(mockShipments);
  const [showNewShipmentWindow, setShowNewShipmentWindow] = useState(false);

  return (
    <Layout>
      <div className="space-y-4">
        {/* Control Panel */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Shipment Management</span>
          </div>
          <div className="p-4 flex space-x-2">
            <button 
              className="win98-button"
              onClick={() => setShowNewShipmentWindow(true)}
            >
              New Shipment
            </button>
            <button className="win98-button">Refresh</button>
            <button className="win98-button">Export</button>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>All Shipments</span>
          </div>
          <div className="p-4">
            <table className="win98-table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Cargo Type</th>
                  <th>Weight (kg)</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-100 cursor-pointer">
                    <td>{shipment.id}</td>
                    <td>{shipment.sender}</td>
                    <td>{shipment.receiver}</td>
                    <td>{shipment.cargoType}</td>
                    <td>{shipment.weight.toLocaleString()}</td>
                    <td>{shipment.destination}</td>
                    <td>{shipment.status}</td>
                    <td>{shipment.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Shipment Window */}
        {showNewShipmentWindow && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 win98-window w-96">
            <div className="win98-title-bar flex justify-between">
              <span>New Shipment</span>
              <button 
                className="text-white hover:bg-blue-800 px-2"
                onClick={() => setShowNewShipmentWindow(false)}
              >
                X
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label>Sender:</label>
                <input type="text" className="win98-input w-full" />
              </div>
              <div className="space-y-2">
                <label>Receiver:</label>
                <input type="text" className="win98-input w-full" />
              </div>
              <div className="space-y-2">
                <label>Cargo Type:</label>
                <select className="win98-input w-full">
                  <option>Container</option>
                  <option>Bulk</option>
                  <option>Liquid</option>
                  <option>Break Bulk</option>
                </select>
              </div>
              <div className="space-y-2">
                <label>Weight (kg):</label>
                <input type="number" className="win98-input w-full" />
              </div>
              <div className="space-y-2">
                <label>Destination:</label>
                <select className="win98-input w-full">
                  <option>Rotterdam</option>
                  <option>Singapore</option>
                  <option>Shanghai</option>
                  <option>New York</option>
                  <option>Dubai</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  className="win98-button"
                  onClick={() => setShowNewShipmentWindow(false)}
                >
                  Cancel
                </button>
                <button className="win98-button">Create</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
