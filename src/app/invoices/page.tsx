'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { mockInvoices, mockCustomers, mockShipments } from '@/data/mockData';
import { Invoice } from '@/types';

export default function InvoicesPage() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [showInvoiceDetailsWindow, setShowInvoiceDetailsWindow] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetailsWindow(true);
  };

  const getCustomerName = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    return customer ? customer.companyName : 'Unknown Customer';
  };

  const getShipmentDetails = (shipmentId: string) => {
    return mockShipments.find(s => s.id === shipmentId);
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Control Panel */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>Invoice Management</span>
          </div>
          <div className="p-4 flex space-x-2">
            <button className="win98-button">Generate Invoice</button>
            <button className="win98-button">Print Selected</button>
            <button className="win98-button">Export to Excel</button>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="grid grid-cols-4 gap-4">
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Total Invoices</span>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl">{invoices.length}</div>
            </div>
          </div>
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Pending Payment</span>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl">
                {invoices.filter(i => i.status === 'Pending').length}
              </div>
            </div>
          </div>
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Paid</span>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl">
                {invoices.filter(i => i.status === 'Paid').length}
              </div>
            </div>
          </div>
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Overdue</span>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl">
                {invoices.filter(i => i.status === 'Overdue').length}
              </div>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="win98-window">
          <div className="win98-title-bar">
            <span>All Invoices</span>
          </div>
          <div className="p-4">
            <table className="win98-table w-full">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr 
                    key={invoice.id} 
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleInvoiceClick(invoice)}
                  >
                    <td>{invoice.id}</td>
                    <td>{getCustomerName(invoice.customerId)}</td>
                    <td>${invoice.amount.toLocaleString()}</td>
                    <td>{invoice.status}</td>
                    <td>{invoice.dueDate}</td>
                    <td>{invoice.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Details Window */}
        {showInvoiceDetailsWindow && selectedInvoice && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 win98-window w-[600px]">
            <div className="win98-title-bar flex justify-between">
              <span>Invoice Details - {selectedInvoice.id}</span>
              <button 
                className="text-white hover:bg-blue-800 px-2"
                onClick={() => setShowInvoiceDetailsWindow(false)}
              >
                X
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Invoice Information */}
              <div className="win98-window">
                <div className="win98-title-bar">
                  <span>Invoice Information</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-2">
                  <div className="font-bold">Invoice ID:</div>
                  <div>{selectedInvoice.id}</div>
                  <div className="font-bold">Customer:</div>
                  <div>{getCustomerName(selectedInvoice.customerId)}</div>
                  <div className="font-bold">Amount:</div>
                  <div>${selectedInvoice.amount.toLocaleString()}</div>
                  <div className="font-bold">Status:</div>
                  <div>{selectedInvoice.status}</div>
                  <div className="font-bold">Due Date:</div>
                  <div>{selectedInvoice.dueDate}</div>
                  <div className="font-bold">Created:</div>
                  <div>{selectedInvoice.created}</div>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="win98-window">
                <div className="win98-title-bar">
                  <span>Related Shipment</span>
                </div>
                <div className="p-4">
                  {(() => {
                    const shipment = getShipmentDetails(selectedInvoice.shipmentId);
                    return shipment ? (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="font-bold">Shipment ID:</div>
                        <div>{shipment.id}</div>
                        <div className="font-bold">Status:</div>
                        <div>{shipment.status}</div>
                        <div className="font-bold">Destination:</div>
                        <div>{shipment.destination}</div>
                        <div className="font-bold">ETA:</div>
                        <div>{shipment.eta}</div>
                      </div>
                    ) : (
                      <div>Shipment not found</div>
                    );
                  })()}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="win98-button">Print Invoice</button>
                <button className="win98-button">Mark as Paid</button>
                <button 
                  className="win98-button"
                  onClick={() => setShowInvoiceDetailsWindow(false)}
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
