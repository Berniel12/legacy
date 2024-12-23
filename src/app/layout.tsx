import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maritime ERP System',
  description: 'Windows 98-style Maritime ERP System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
