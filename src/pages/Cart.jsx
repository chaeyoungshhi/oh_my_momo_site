// ===== Cart Page =====

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Cart.css';

// Single cart item row
function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useApp();

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <span>{item.emoji}</span>
      </div>

      <div className="cart-item__info">
        <div className="cart-item__top">
          <div>
            <span className={`badge badge-${item.type}`}>
              {item.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
            </span>
            <h3 className="cart-item__name">{item.name}</h3>
            <p className="cart-item__servings">{item.servings}</p>
          </div>
          <button
            className="cart-item__remove"
            onClick={() => removeFromCart(item.id)}
            aria-label="Remove item"
          >
            🗑️
          </button>
        </div>

        <div className="cart-item__bottom">
          <div className="cart-item__qty">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          <div className="cart-item__price">
            <span className="cart-item__unit">₹{item.price} × {item.quantity}</span>
            <span className="cart-item__total">₹{item.price * item.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Summary sidebar
function OrderSummary({ showCheckoutBtn = true }) {
  const { cart, cartSubtotal, deliveryFee, taxes, cartGrandTotal } = useApp();
  const navigate = useNavigate();

  return (
    <div className="order-summary">
      <h3 className="order-summary__title">Order Summary</h3>

      <div className="order-summary__lines">
        <div className="order-summary__line">
          <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>₹{cartSubtotal}</span>
        </div>
        <div className="order-summary__line">
          <span>Delivery Fee</span>
          <span className={deliveryFee === 0 ? 'order-summary__free' : ''}>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </span>
        </div>
        <div className="order-summary__line">
          <span>Taxes (5% GST)</span>
          <span>₹{taxes}</span>
        </div>
        {cartSubtotal < 500 && cartSubtotal > 0 && (
          <div className="order-summary__tip">
            🎉 Add ₹{500 - cartSubtotal} more for free delivery!
          </div>
        )}
      </div>

      <div className="order-summary__divider" />

      <div className="order-summary__total">
        <span>Total</span>
        <span>₹{cartGrandTotal}</span>
      </div>

      {showCheckoutBtn && (
        <button
          className="btn btn-primary btn-lg order-summary__checkout-btn"
          onClick={() => navigate('/checkout')}
          disabled={cart.length === 0}
        >
          Proceed to Checkout →
        </button>
      )}

      <div className="order-summary__secure">
        🔒 Secure checkout &nbsp;|&nbsp; Cash on Delivery available
      </div>

      {/* Promo code */}
      <div className="order-summary__promo">
        <h4>Promo Code</h4>
        <div className="order-summary__promo-input">
          <input type="text" placeholder="Enter code (e.g. MOMO50)" />
          <button className="btn btn-ghost btn-sm">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { cart, clearCart } = useApp();

  return (
    <div className="page cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="section-title">Your Cart</h1>
          <p className="section-subtitle">
            {cart.length === 0
              ? 'Your cart is empty'
              : `${cart.reduce((s, i) => s + i.quantity, 0)} item(s) ready to order`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some delicious momos and come back!</p>
            <Link to="/menu" className="btn btn-primary btn-lg">Browse Menu</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items-section">
              <div className="cart-items-header">
                <span>{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</span>
                <button className="btn btn-ghost btn-sm" onClick={clearCart}>Clear Cart</button>
              </div>

              <div className="cart-items-list">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-continue">
                <Link to="/menu" className="btn btn-outline">← Continue Shopping</Link>
              </div>
            </div>

            {/* Summary */}
            <div className="cart-summary-section">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export for reuse on checkout
export { OrderSummary };
