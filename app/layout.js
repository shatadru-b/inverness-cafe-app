import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import { RestaurantProvider } from '@/lib/RestaurantContext';
import { buildJsonLd, buildMetadata, getActiveRestaurant } from '@/lib/restaurants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartFloat from '@/components/CartFloat';

const restaurant = getActiveRestaurant();

export const metadata = buildMetadata(restaurant);

export default function RootLayout({ children }) {
  const jsonLd = buildJsonLd(restaurant);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        {/* Provider loads config on the client — no server→client function props */}
        <RestaurantProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
            <CartFloat />
          </CartProvider>
        </RestaurantProvider>
      </body>
    </html>
  );
}
