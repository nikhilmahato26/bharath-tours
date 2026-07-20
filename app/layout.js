import './globals.css'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Bharath Tours and Consultancy | Travel Agency & Visa Consultancy | Andhra Pradesh',
  description: 'Bharath Tours and Consultancy offers domestic and international tour packages, visa consultancy, flight booking, hotel booking, passport assistance, travel insurance, and customized holiday packages from Annamayya District, Andhra Pradesh.',
  keywords: 'Bharath Tours and Consultancy, Travel Agency Andhra Pradesh, Visa Consultancy Andhra Pradesh, International Tour Packages, Domestic Tour Packages, Flight Ticket Booking, Hotel Booking, Passport Assistance, Travel Insurance, Holiday Packages',
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  )
}
