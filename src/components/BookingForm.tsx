'use client';

import { useState } from 'react';
import { mockCustomers, ports } from '@/data/mockData';
import { BookingRequest } from '@/types';

interface BookingFormProps {
  onSubmit: (data: Partial<BookingRequest>) => void;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Partial<BookingRequest>>({
    customerId: '',
    origin: '',
    destination: '',
    cargoType: 'Container',
    containerType: '20ft',
    weight: 0,
    volume: 0,
    hazardous: false,
    requestedPickupDate: '',
    requestedDeliveryDate: '',
    specialRequirements: '',
    hazmatClass: '',
    temperature: undefined,
    status: 'Submitted'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              type === 'number' ? (value ? Number(value) : undefined) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="win98-window w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="win98-title-bar flex justify-between">
          <span>New Booking Request</span>
          <button 
            className="text-white hover:bg-blue-800 px-2"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Customer Information */}
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Customer Information</span>
            </div>
            <div className="p-4">
              <label className="block">
                Customer:
                <select
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                >
                  <option value="">Select Customer</option>
                  {mockCustomers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.companyName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Route Information */}
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Route Information</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <label className="block">
                Origin Port:
                <select
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                >
                  <option value="">Select Origin Port</option>
                  {ports.map(port => (
                    <option key={port.id} value={port.name}>
                      {port.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                Destination Port:
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                >
                  <option value="">Select Destination Port</option>
                  {ports.map(port => (
                    <option key={port.id} value={port.name}>
                      {port.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                Requested Pickup Date:
                <input
                  type="date"
                  name="requestedPickupDate"
                  value={formData.requestedPickupDate}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                />
              </label>

              <label className="block">
                Requested Delivery Date:
                <input
                  type="date"
                  name="requestedDeliveryDate"
                  value={formData.requestedDeliveryDate}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                />
              </label>
            </div>
          </div>

          {/* Cargo Information */}
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Cargo Information</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <label className="block">
                Cargo Type:
                <select
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                >
                  <option value="Container">Container</option>
                  <option value="Bulk">Bulk</option>
                  <option value="Liquid">Liquid</option>
                  <option value="Break Bulk">Break Bulk</option>
                </select>
              </label>

              <label className="block">
                Container Type:
                <select
                  name="containerType"
                  value={formData.containerType}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                >
                  <option value="20ft">20ft Standard</option>
                  <option value="40ft">40ft Standard</option>
                  <option value="40ft High Cube">40ft High Cube</option>
                  <option value="Reefer">Reefer</option>
                </select>
              </label>

              <label className="block">
                Weight (kg):
                <input
                  type="number"
                  name="weight"
                  value={formData.weight || ''}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                  min="0"
                />
              </label>

              <label className="block">
                Volume (m³):
                <input
                  type="number"
                  name="volume"
                  value={formData.volume || ''}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  required
                  min="0"
                />
              </label>

              <label className="block">
                Temperature (°C):
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature || ''}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  placeholder="If applicable"
                />
              </label>

              <label className="block">
                Hazardous:
                <input
                  type="checkbox"
                  name="hazardous"
                  checked={formData.hazardous}
                  onChange={handleChange}
                  className="win98-checkbox ml-2"
                />
              </label>

              <label className="block">
                Hazmat Class:
                <input
                  type="text"
                  name="hazmatClass"
                  value={formData.hazmatClass}
                  onChange={handleChange}
                  className="win98-input w-full mt-1"
                  placeholder="If applicable"
                  disabled={!formData.hazardous}
                />
              </label>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Special Requirements</span>
            </div>
            <div className="p-4">
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                className="win98-input w-full h-24"
                placeholder="Enter any special requirements or notes..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="win98-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="win98-button"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
