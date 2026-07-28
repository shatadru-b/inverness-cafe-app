'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart, formatCartItemOptions } from '@/lib/CartContext';
import { openWhatsAppOrder } from '@/lib/whatsapp';
import styles from './cart.module.css';

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderType, setOrderType] = useState('collection');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setCustomerInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (orderType === 'delivery' && !customerInfo.address.trim()) newErrors.address = 'Delivery address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppOrder = () => {
    if (!validate()) return;
    openWhatsAppOrder(cartItems, customerInfo, orderType);
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <>
        <div className="page-header">
          <div className="container">
            <h1>🎉 Order Sent!</h1>
          </div>
        </div>
        <section className="section-padding">
          <div className="container" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>✅</div>
            <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
              Thank You, {customerInfo.name}!
            </h2>
            <p style={{ color: 'var(--clr-text-secondary)', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Your order has been sent via WhatsApp. We'll confirm it shortly. If WhatsApp didn't open, please call us directly.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/#menu" className="btn btn-primary">🍕 Order More</Link>
              <Link href="/" className="btn btn-outline">🏠 Back to Home</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (cartCount === 0) {
    return (
      <>
        <div className="page-header">
          <div className="container">
            <div className="breadcrumb"><a href="/">Home</a> <span>/</span> <span>Cart</span></div>
            <h1>Your Cart</h1>
          </div>
        </div>
        <section className="section-padding">
          <div className="container" style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🛒</div>
            <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Your cart is empty</h2>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: '2rem' }}>Browse our menu and add some delicious items!</p>
            <Link href="/#menu" className="btn btn-primary">🍕 View Menu</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/menu">Menu</a> <span>/</span> <span>Cart</span></div>
          <h1>Your Order</h1>
          <p>{cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className={styles.cartGrid}>
            {/* Cart Items */}
            <div>
              <div className={styles.cartHeader}>
                <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem' }}>Cart Items</h2>
                <button className="btn btn-sm btn-danger" onClick={clearCart}>Clear All</button>
              </div>

              {cartItems.map(item => {
                const key = item.cartKey || item.id;
                const options = formatCartItemOptions(item);
                return (
                <div key={key} className={styles.cartItem}>
                  <div className={styles.cartItemInfo}>
                    <h3>{item.name}</h3>
                    {options && (
                      <p style={{ fontSize: '0.875rem', color: 'var(--clr-amber-400)', marginTop: '0.2rem' }}>{options}</p>
                    )}
                    <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>{item.description}</p>
                  </div>
                  <div className={styles.cartItemActions}>
                    <div className={styles.quantityControl}>
                      <button onClick={() => updateQuantity(key, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(key, item.quantity + 1)}>+</button>
                    </div>
                    <span className={styles.cartItemPrice}>£{(item.price * item.quantity).toFixed(2)}</span>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(key)} aria-label="Remove item">✕</button>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Checkout Form */}
            <div className={styles.checkoutPanel}>
              <h2 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Checkout</h2>

              {/* Order Type Toggle */}
              <div className={styles.orderTypeToggle}>
                <button className={`${styles.toggleBtn} ${orderType === 'collection' ? styles.toggleActive : ''}`} onClick={() => setOrderType('collection')}>
                  🏪 Collection
                </button>
                <button className={`${styles.toggleBtn} ${orderType === 'delivery' ? styles.toggleActive : ''}`} onClick={() => setOrderType('delivery')}>
                  🚗 Delivery
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input type="text" name="name" className="form-input" placeholder="John Smith" value={customerInfo.name} onChange={handleInputChange} />
                {errors.name && <span style={{ color: 'var(--clr-red-500)', fontSize: '0.8rem' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" name="phone" className="form-input" placeholder="+44 7700 900000" value={customerInfo.phone} onChange={handleInputChange} />
                {errors.phone && <span style={{ color: 'var(--clr-red-500)', fontSize: '0.8rem' }}>{errors.phone}</span>}
              </div>

              {orderType === 'delivery' && (
                <div className="form-group">
                  <label className="form-label">Delivery Address *</label>
                  <textarea name="address" className="form-input" placeholder="Your full delivery address" value={customerInfo.address} onChange={handleInputChange} />
                  {errors.address && <span style={{ color: 'var(--clr-red-500)', fontSize: '0.8rem' }}>{errors.address}</span>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Special Instructions</label>
                <textarea name="notes" className="form-input" placeholder="Any allergies or special requests?" value={customerInfo.notes} onChange={handleInputChange} style={{ minHeight: '80px' }} />
              </div>

              {/* Order Summary */}
              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow} style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--clr-amber-400)', paddingTop: '0.75rem', borderTop: '1px solid var(--clr-border)' }}>
                  <span>Total</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={handleWhatsAppOrder}>
                💬 Order via WhatsApp
              </button>

              <a href="tel:+441234567890" className="btn btn-outline" style={{ width: '100%', marginTop: '0.75rem', textAlign: 'center', display: 'block' }}>
                📞 Call to Order
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
