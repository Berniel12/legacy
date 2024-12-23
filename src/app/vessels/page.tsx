'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { mockVessels } from '@/data/mockData';
import { Vessel } from '@/types';

export default function VesselsPage() {
  const [vessels] = useState<Vessel[]>(mockVessels);
  const [showVesselDetailsWindow, setShowVesselDetailsWindow] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);

  const handleVesselClick = (vessel: Vessel) => {
    setSelectedVessel(vessel);
    setShowVesselDetailsWindow(true);
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Control Panel */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Vessel Management</span>
          </div>
          <div className="p-4 flex space-x-2">
            <button className="win98-button">Track Vessel</button>
            <button className="win98-button">Schedule Maintenance</button>
            <button className="win98-button">Export Data</button>
          </div>
        </div>

        {/* Vessels Table */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Fleet Overview</span>
          </div>
          <div className="p-4">
            <table className="win98-table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vessel Name</th>
                  <th>Capacity (TEU)</th>
                  <th>Current Location</th>
                  <th>Status</th>
                  <th>Next Destination</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {vessels.map((vessel) => (
                  <tr 
                    key={vessel.id} 
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleVesselClick(vessel)}
                  >
                    <td>{vessel.id}</td>
                    <td>{vessel.name}</td>
                    <td>{vessel.capacity.toLocaleString()}</td>
                    <td>{vessel.currentLocation}</td>
                    <td>{vessel.status}</td>
                    <td>{vessel.nextDestination}</td>
                    <td>{vessel.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vessel Details Window */}
        {showVesselDetailsWindow && selectedVessel && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 win98-window w-96">
            <div className="win98-title-bar flex justify-between">
              <span>Vessel Details - {selectedVessel.name}</span>
              <button 
                className="text-white hover:bg-blue-800 px-2"
                onClick={() => setShowVesselDetailsWindow(false)}
              >
                X
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-bold">Vessel ID:</div>
                <div>{selectedVessel.id}</div>
                <div className="font-bold">Capacity:</div>
                <div>{selectedVessel.capacity.toLocaleString()} TEU</div>
                <div className="font-bold">Current Location:</div>
                <div>{selectedVessel.currentLocation}</div>
                <div className="font-bold">Status:</div>
                <div>{selectedVessel.status}</div>
                <div className="font-bold">Next Destination:</div>
                <div>{selectedVessel.nextDestination}</div>
                <div className="font-bold">ETA:</div>
                <div>{selectedVessel.eta}</div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button className="win98-button">View Route</button>
                <button 
                  className="win98-button"
                  onClick={() => setShowVesselDetailsWindow(false)}
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
