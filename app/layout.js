import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import { RestaurantProvider } from '@/lib/RestaurantContext';
import { buildJsonLd, buildMetadata, getActiveRestaurant } from '@/lib/restaurants';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartFloat from '@/components/CartFloat';

const restaurant = getActiveRestaurant();

export const metadata = buildMetadata(restaurant, { path: '/' });

export default function RootLayout({ children }) {
  const jsonLd = buildJsonLd(restaurant);

  return (
    <html lang="en">
      <body>
        <JsonLd data={jsonLd} />
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
