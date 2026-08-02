// WhatsApp integration — restaurant name/number from config

import { getActiveRestaurant } from '@/lib/restaurants';

function whatsappNumber() {
  return getActiveRestaurant().whatsapp.number;
}

export function generateWhatsAppOrderMessage(cartItems, customerInfo, orderType) {
  const restaurant = getActiveRestaurant();
  const lines = [
    `🍕 *NEW ORDER — ${restaurant.name}*`,
    '',
    `📋 *Order Type:* ${orderType === 'delivery' ? '🚗 Delivery' : '🏪 Collection'}`,
    '',
    '━━━━━━━━━━━━━━━━━━━',
    '*ORDER ITEMS:*',
    '',
  ];

  let subtotal = 0;
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    let label = item.name;
    if (item.pastaTypeName) label += ` (${item.pastaTypeName})`;
    if (item.toppings?.length) {
      label += ` + ${item.toppings.map((t) => t.name).join(', ')}`;
    }
    lines.push(`${index + 1}. ${label} x${item.quantity} — £${itemTotal.toFixed(2)}`);
  });

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━');
  lines.push(`*TOTAL: £${subtotal.toFixed(2)}*`);
  lines.push('');
  lines.push('*CUSTOMER DETAILS:*');
  lines.push(`👤 Name: ${customerInfo.name}`);
  lines.push(`📞 Phone: ${customerInfo.phone}`);

  if (orderType === 'delivery' && customerInfo.address) {
    lines.push(`📍 Address: ${customerInfo.address}`);
  }

  if (customerInfo.notes) {
    lines.push(`📝 Notes: ${customerInfo.notes}`);
  }

  lines.push('');
  lines.push('Thank you! 🙏');

  return lines.join('\n');
}

export function openWhatsAppOrder(cartItems, customerInfo, orderType) {
  const message = generateWhatsAppOrderMessage(cartItems, customerInfo, orderType);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${whatsappNumber()}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

export function getWhatsAppLink() {
  return `https://wa.me/${whatsappNumber()}`;
}
