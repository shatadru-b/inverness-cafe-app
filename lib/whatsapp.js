// WhatsApp integration utility
// Generates a pre-formatted WhatsApp message from cart items

// Replace with your actual WhatsApp Business number
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447554284033";

export function generateWhatsAppOrderMessage(cartItems, customerInfo, orderType) {
  const lines = [
    "🍕 *NEW ORDER — Inverness Cafe & Pizzeria*",
    "",
    `📋 *Order Type:* ${orderType === 'delivery' ? '🚗 Delivery' : '🏪 Collection'}`,
    "",
    "━━━━━━━━━━━━━━━━━━━",
    "*ORDER ITEMS:*",
    ""
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

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━");
  lines.push(`*TOTAL: £${subtotal.toFixed(2)}*`);
  lines.push("");
  lines.push("*CUSTOMER DETAILS:*");
  lines.push(`👤 Name: ${customerInfo.name}`);
  lines.push(`📞 Phone: ${customerInfo.phone}`);

  if (orderType === 'delivery' && customerInfo.address) {
    lines.push(`📍 Address: ${customerInfo.address}`);
  }

  if (customerInfo.notes) {
    lines.push(`📝 Notes: ${customerInfo.notes}`);
  }

  lines.push("");
  lines.push("Thank you! 🙏");

  return lines.join("\n");
}

export function openWhatsAppOrder(cartItems, customerInfo, orderType) {
  const message = generateWhatsAppOrderMessage(cartItems, customerInfo, orderType);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

export function getWhatsAppLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}

export function getPhoneNumber() {
  return WHATSAPP_NUMBER.replace(/^44/, '+44 ');
}
