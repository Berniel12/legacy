'use client';

import { useState } from 'react';
import { mockShipments, mockVessels, mockCustomers, mockInvoices } from '@/data/mockData';

interface GenerateReportModalProps {
  onClose: () => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ onClose }) => {
  const [reportType, setReportType] = useState('shipments');
  const [dateRange, setDateRange] = useState('7');
  const [showPreview, setShowPreview] = useState(false);

  const generateReportData = () => {
    const now = new Date();
    const startDate = new Date(now.getTime() - parseInt(dateRange) * 24 * 60 * 60 * 1000);

    switch (reportType) {
      case 'shipments':
        return mockShipments
          .filter(s => new Date(s.created) >= startDate)
          .map(s => ({
            id: s.id,
            status: s.status,
            origin: s.origin,
            destination: s.destination,
            created: new Date(s.created).toLocaleDateString()
          }));
      case 'vessels':
        return mockVessels.map(v => ({
          id: v.id,
          name: v.name,
          status: v.status,
          location: v.currentLocation,
          nextPort: v.nextDestination
        }));
      case 'customers':
        return mockCustomers.map(c => ({
          id: c.id,
          name: c.companyName,
          type: c.accountType,
          shipments: c.yearlyShipments
        }));
      case 'invoices':
        return mockInvoices
          .filter(i => new Date(i.created) >= startDate)
          .map(i => ({
            id: i.id,
            amount: i.amount,
            status: i.status,
            created: new Date(i.created).toLocaleDateString()
          }));
      default:
        return [];
    }
  };

  const handleGenerateReport = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    const data = generateReportData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="win98-window w-[800px]">
        <div className="win98-title-bar flex justify-between">
          <span>Generate Report</span>
          <button 
            className="text-white hover:bg-blue-800 px-2"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* Report Configuration */}
          <div className="win98-window">
            <div className="win98-title-bar">
              <span>Report Settings</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <label className="block">
                Report Type:
                <select 
                  className="win98-input w-full mt-1"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="shipments">Shipments Report</option>
                  <option value="vessels">Vessel Status Report</option>
                  <option value="customers">Customer Analytics</option>
                  <option value="invoices">Financial Report</option>
                </select>
              </label>

              <label className="block">
                Date Range (days):
                <select 
                  className="win98-input w-full mt-1"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>
              </label>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="win98-window">
              <div className="win98-title-bar">
                <span>Report Preview</span>
              </div>
              <div className="p-4">
                <pre className="bg-white p-2 overflow-auto max-h-60">
                  {JSON.stringify(generateReportData(), null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <button 
              className="win98-button"
              onClick={handleGenerateReport}
            >
              Preview
            </button>
            <button 
              className="win98-button"
              onClick={handleDownload}
              disabled={!showPreview}
            >
              Download Report
            </button>
            <button 
              className="win98-button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportModal;
