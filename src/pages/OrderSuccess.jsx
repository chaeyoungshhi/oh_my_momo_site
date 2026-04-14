// ===== Order Success — Oh My Momo! =====
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const location = useLocation();
  const { form, total } = location.state || {};
  const orderId   = `OMM-${Math.floor(1000 + Math.random() * 9000)}`;
  const firstName = form?.name?.split(' ')[0] || 'there';

  const steps = [
    { label: '✅ Order Confirmed',  done: true,  active: false },
    { label: '👨‍🍳 Being Prepared',   done: false, active: true  },
    { label: '🛵 Out for Delivery', done: false, active: false  },
    { label: '🎉 Delivered',        done: false, active: false  },
  ];

  return (
    <div className="page order-success-page">
      <div className="container">
        <div className="success-card">
          {/* Animation */}
          <div className="success-animation">
            <div className="success-circle">✓</div>
            <div className="success-ring r1" /><div className="success-ring r2" />
          </div>

          <h1 className="success-title">Order Placed! 🎉</h1>
          <p className="success-sub">
            Thank you, {firstName}! Your momos are being prepared right now.
            Sit tight — they'll be at your door in 30–45 minutes.
          </p>

          <div className="success-order-pill">
            <span>Order ID</span>
            <strong>#{orderId}</strong>
          </div>

          {/* Details */}
          {form && (
            <div className="success-details">
              <div className="success-detail-row">
                <span>📍 Delivering to</span>
                <span>{form.address}, {form.city} – {form.pincode}</span>
              </div>
              <div className="success-detail-row">
                <span>💳 Payment</span>
                <span>
                  {form.paymentMethod === 'cod'    ? 'Cash on Delivery'
                  : form.paymentMethod === 'upi'   ? 'UPI Payment'
                  : form.paymentMethod === 'card'  ? 'Card Payment'
                  : form.paymentMethod === 'wallet'? 'Paytm Wallet'
                  : form.paymentMethod}
                </span>
              </div>
              <div className="success-detail-row">
                <span>💰 Total Paid</span>
                <span><strong>₹{total}</strong></span>
              </div>
              <div className="success-detail-row">
                <span>⏱️ Est. Delivery</span>
                <span>30–45 minutes</span>
              </div>
            </div>
          )}

          {/* Live tracker */}
          <div className="success-tracker">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className={`tracker-step ${s.done ? 'done' : ''} ${s.active ? 'active' : ''}`}>
                  {s.label}
                </div>
                {i < steps.length - 1 && <div className="tracker-line" />}
              </React.Fragment>
            ))}
          </div>

          {/* Actions */}
          <div className="success-actions">
            <Link to="/menu" className="btn btn-primary btn-lg">Order Again 🥟</Link>
            <Link to="/"    className="btn btn-outline btn-lg">Back to Home</Link>
          </div>

          <p className="success-note">
            📞 Questions? Call us on <strong>+91 98765 43210</strong> or WhatsApp us.
          </p>
        </div>
      </div>
    </div>
  );
}
