import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata = {
  title: {
    default: 'Inverness Cafe & Pizzeria — Authentic Italian in the Highlands',
    template: '%s | Inverness Cafe & Pizzeria',
  },
  description: 'Handcrafted pizzas, fresh pasta, gourmet burgers & Scottish classics in the heart of Inverness. Order online or book a table.',
  keywords: ['Inverness', 'cafe', 'pizzeria', 'pizza', 'pasta', 'burgers', 'restaurant', 'Scottish Highlands', 'Italian food'],
  authors: [{ name: 'Inverness Cafe & Pizzeria' }],
  openGraph: {
    title: 'Inverness Cafe & Pizzeria',
    description: 'Authentic Italian meets Scottish Highland hospitality. Handcrafted pizzas, fresh pasta, and gourmet burgers.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Inverness Cafe & Pizzeria',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Inverness Cafe & Pizzeria",
              "image": "/images/hero-banner.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Academy Street",
                "addressLocality": "Inverness",
                "addressRegion": "Scottish Highlands",
                "postalCode": "IV1 1LU",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 57.4804113,
                "longitude": -4.2261793
              },
              "hasMap": "https://maps.app.goo.gl/kEYAozW9M2BLXfwQ8",
              "servesCuisine": ["Italian", "Scottish", "Pizza", "Pasta", "Burgers"],
              "priceRange": "££",
              "openingHoursSpecification": [
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"], "opens": "11:00", "closes": "22:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday", "Saturday"], "opens": "11:00", "closes": "23:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "12:00", "closes": "21:00" }
              ],
              "hasMenu": {
                "@type": "Menu",
                "name": "Main Menu",
                "url": "/#menu"
              }
            })
          }}
        />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
