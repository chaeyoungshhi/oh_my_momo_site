// ===== Checkout Page — Oh My Momo! =====

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { OrderSummary } from './Cart';
import './Checkout.css';

const PAYMENT_METHODS = [
  {
    id: 'upi',
    label: 'UPI Payment',
    sub: 'Google Pay, PhonePe, Paytm, BHIM',
    icon: '📱',
    popular: true,
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    sub: 'Pay when your order arrives',
    icon: '💵',
    popular: false,
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    sub: 'Visa, Mastercard, RuPay',
    icon: '💳',
    popular: false,
  },
  {
    id: 'wallet',
    label: 'Paytm Wallet',
    sub: 'Pay using your Paytm balance',
    icon: '👛',
    popular: false,
  },
];

export default function Checkout() {
  const { cart, cartGrandTotal, clearCart, user } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:          user?.name  || '',
    phone:         user?.phone || '',
    email:         user?.email || '',
    address:       '',
    city:          '',
    pincode:       '',
    landmark:      '',
    paymentMethod: 'upi',
    upiId:         '',
    notes:         '',
  });
  const [errors,     setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [step,       setStep]       = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())                        errs.name    = 'Full name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/))        errs.phone   = 'Enter a valid 10-digit mobile number';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email address';
    if (!form.address.trim())                     errs.address = 'Delivery address is required';
    if (!form.city.trim())                        errs.city    = 'City is required';
    if (!form.pincode.match(/^\d{6}$/))           errs.pincode = 'Enter a valid 6-digit pincode';
    return errs;
  };

  const handleNext = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    navigate('/order-success', { state: { form, total: cartGrandTotal } });
  };

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="container empty-state" style={{ paddingTop: '6rem' }}>
          <div className="emoji">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some momos before checking out!</p>
          <Link to="/menu" className="btn btn-primary btn-lg">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1 className="section-title">Checkout</h1>
          <p className="section-subtitle">You're {step === 1 ? 'almost' : 'one tap'} away from hot, fresh momos.</p>
        </div>

        {/* Step indicator */}
        <div className="checkout-steps">
          <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
            <div className="checkout-step__dot">{step > 1 ? '✓' : '1'}</div>
            <span>Delivery Details</span>
          </div>
          <div className="checkout-step__line" />
          <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
            <div className="checkout-step__dot">2</div>
            <span>Payment</span>
          </div>
        </div>

        <div className="checkout-layout">
          {/* ── Form ── */}
          <div className="checkout-form-section">

            {/* STEP 1 — Address */}
            {step === 1 && (
              <div className="checkout-card animate-fadeUp">
                <h3>📍 Delivery Information</h3>

                <div className="checkout-form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" type="text" value={form.name}
                      onChange={handleChange} placeholder="e.g. Priya Sharma" />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input name="phone" type="tel" value={form.phone}
                      onChange={handleChange} placeholder="10-digit number" />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email}
                    onChange={handleChange} placeholder="your@email.com" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Street Address *</label>
                  <textarea name="address" value={form.address}
                    onChange={handleChange} rows={3}
                    placeholder="Flat / House no., Building name, Street name, Colony" />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>

                <div className="checkout-form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input name="city" type="text" value={form.city}
                      onChange={handleChange} placeholder="Delhi, Noida, Gurugram…" />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input name="pincode" type="text" value={form.pincode}
                      onChange={handleChange} placeholder="6-digit pincode" maxLength={6} />
                    {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Landmark <span style={{ color: 'var(--clr-text-muted)', fontWeight: 400 }}>(optional)</span></label>
                  <input name="landmark" type="text" value={form.landmark}
                    onChange={handleChange} placeholder="Near metro, beside park, opp. school…" />
                </div>

                <div className="form-group">
                  <label>Special Instructions <span style={{ color: 'var(--clr-text-muted)', fontWeight: 400 }}>(optional)</span></label>
                  <textarea name="notes" value={form.notes}
                    onChange={handleChange} rows={2}
                    placeholder="Extra chutney, extra spicy, ring the bell twice…" />
                </div>

                <button className="btn btn-primary btn-lg checkout-next-btn" onClick={handleNext}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* STEP 2 — Payment */}
            {step === 2 && (
              <div className="checkout-card animate-fadeUp">
                <button className="checkout-back-btn" onClick={() => setStep(1)}>
                  ← Edit Delivery Details
                </button>

                {/* Delivery summary pill */}
                <div className="checkout-delivery-summary">
                  <div className="checkout-delivery-summary__icon">📍</div>
                  <div>
                    <strong>{form.name}</strong> · {form.phone}
                    <p>{form.address}, {form.city} – {form.pincode}
                      {form.landmark && ` (${form.landmark})`}</p>
                  </div>
                </div>

                <h3>💳 Choose Payment Method</h3>

                <div className="payment-methods">
                  {PAYMENT_METHODS.map(method => (
                    <label
                      key={method.id}
                      className={`payment-option ${form.paymentMethod === method.id ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={handleChange}
                      />
                      <span className="payment-option__icon">{method.icon}</span>
                      <div className="payment-option__text">
                        <strong>{method.label}</strong>
                        <small>{method.sub}</small>
                      </div>
                      {method.popular && (
                        <span className="payment-option__tag">Most Used</span>
                      )}
                    </label>
                  ))}
                </div>

                {/* UPI input */}
                {form.paymentMethod === 'upi' && (
                  <div className="checkout-payment-detail">
                    <div className="checkout-upi-logos">
                      <span>GPay</span><span>PhonePe</span><span>Paytm</span><span>BHIM</span>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>UPI ID (optional)</label>
                      <input name="upiId" type="text" value={form.upiId}
                        onChange={handleChange} placeholder="yourname@upi" />
                      <small style={{ color:'var(--clr-text-muted)', fontSize:'0.78rem' }}>
                        Or scan the QR code shown after placing the order.
                      </small>
                    </div>
                  </div>
                )}

                {/* COD note */}
                {form.paymentMethod === 'cod' && (
                  <div className="checkout-payment-detail checkout-cod-note">
                    <span>💵</span>
                    <div>
                      <strong>Cash on Delivery selected</strong>
                      <p>Please keep exact change ready. Our delivery partner will collect payment at your door.</p>
                    </div>
                  </div>
                )}

                {/* Card inputs */}
                {form.paymentMethod === 'card' && (
                  <div className="checkout-payment-detail">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="1234  5678  9012  3456" maxLength={19} />
                    </div>
                    <div className="checkout-form-row">
                      <div className="form-group">
                        <label>Expiry</label>
                        <input type="text" placeholder="MM / YY" maxLength={7} />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="password" placeholder="•••" maxLength={3} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Name on Card</label>
                      <input type="text" placeholder="As printed on card" />
                    </div>
                  </div>
                )}

                {/* Wallet */}
                {form.paymentMethod === 'wallet' && (
                  <div className="checkout-payment-detail checkout-cod-note">
                    <span>👛</span>
                    <div>
                      <strong>Paytm Wallet selected</strong>
                      <p>You'll be redirected to Paytm to complete payment after placing the order.</p>
                    </div>
                  </div>
                )}

                <button
                  className="btn btn-primary btn-lg checkout-place-btn"
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                >
                  {submitting
                    ? <><span className="checkout-spinner" />Placing your order…</>
                    : `🥟 Place Order — ₹${cartGrandTotal}`}
                </button>

                <p className="checkout-agreement">
                  By placing your order you agree to our{' '}
                  <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                  Delivery within 30–45 minutes.
                </p>
              </div>
            )}
          </div>

          {/* ── Summary ── */}
          <div className="checkout-summary-section">
            <OrderSummary showCheckoutBtn={false} />

            <div className="checkout-items-preview">
              <h4>Your Order <span>({cart.length} item{cart.length !== 1 ? 's' : ''})</span></h4>
              {cart.map(item => (
                <div key={item.id} className="checkout-preview-item">
                  <span className="checkout-preview-item__name">
                    {item.emoji} {item.name}
                  </span>
                  <span>×{item.quantity} · <strong>₹{item.price * item.quantity}</strong></span>
                </div>
              ))}
            </div>

            <div className="checkout-secure">
              🔒 100% Secure Checkout &nbsp;·&nbsp; SSL Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
