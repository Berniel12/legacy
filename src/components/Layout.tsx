import React from 'react';
import Link from 'next/link';
import Clock from './Clock';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#008080]">
      {/* Top taskbar */}
      <div className="win98-window fixed top-0 w-full h-8 flex items-center px-2 z-50">
        <Link href="/" className="win98-button mr-2">
          Start
        </Link>
        <div className="flex space-x-2">
          <Link href="/bookings" className="win98-button">
            Bookings
          </Link>
          <Link href="/shipments" className="win98-button">
            Shipments
          </Link>
          <Link href="/vessels" className="win98-button">
            Vessels
          </Link>
          <Link href="/customers" className="win98-button">
            Customers
          </Link>
          <Link href="/invoices" className="win98-button">
            Invoices
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-10 p-4">
        {children}
      </div>

      {/* Clock */}
      <Clock />
    </div>
  );
};

export default Layout;
