'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { mockCustomers, mockShipments } from '@/data/mockData';
import { Customer } from '@/types';

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [showCustomerDetailsWindow, setShowCustomerDetailsWindow] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetailsWindow(true);
  };

  const getCustomerShipments = (customerId: string) => {
    return mockShipments.filter(
      shipment => shipment.sender.includes(customerId) || shipment.receiver.includes(customerId)
    );
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Control Panel */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Customer Management</span>
          </div>
          <div className="p-4 flex space-x-2">
            <button className="win98-button">Add Customer</button>
            <button className="win98-button">Generate Report</button>
            <button className="win98-button">Export Data</button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Customer Directory</span>
          </div>
          <div className="p-4">
            <table className="win98-table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company Name</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCustomerClick(customer)}
                  >
                    <td>{customer.id}</td>
                    <td>{customer.companyName}</td>
                    <td>{customer.contactPerson}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Details Window */}
        {showCustomerDetailsWindow && selectedCustomer && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 win98-window w-[800px]">
            <div className="win98-title-bar flex justify-between">
              <span>Customer Details - {selectedCustomer.companyName}</span>
              <button 
                className="text-white hover:bg-blue-800 px-2"
                onClick={() => setShowCustomerDetailsWindow(false)}
              >
                X
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Customer Information */}
                <div className="win98-window">
                  <div className="win98-title-bar">
                    <span>Contact Information</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-bold">Customer ID:</div>
                      <div>{selectedCustomer.id}</div>
                      <div className="font-bold">Company Name:</div>
                      <div>{selectedCustomer.companyName}</div>
                      <div className="font-bold">Contact Person:</div>
                      <div>{selectedCustomer.contactPerson}</div>
                      <div className="font-bold">Email:</div>
                      <div>{selectedCustomer.email}</div>
                      <div className="font-bold">Phone:</div>
                      <div>{selectedCustomer.phone}</div>
                      <div className="font-bold">Address:</div>
                      <div>{selectedCustomer.address}</div>
                    </div>
                  </div>
                </div>

                {/* Customer Shipments */}
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
                        {getCustomerShipments(selectedCustomer.id).slice(0, 5).map((shipment) => (
                          <tr key={shipment.id}>
                            <td>{shipment.id}</td>
                            <td>{shipment.status}</td>
                            <td>{shipment.destination}</td>
                            <td>{shipment.eta}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="win98-button">Edit</button>
                <button className="win98-button">View All Shipments</button>
                <button 
                  className="win98-button"
                  onClick={() => setShowCustomerDetailsWindow(false)}
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
