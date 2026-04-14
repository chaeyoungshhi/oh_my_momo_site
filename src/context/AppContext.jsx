// ===== Cart Context =====
// Global state for cart, auth, and toast notifications

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // ── Cart State ──
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('momohouse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // ── Auth State ──
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('momohouse_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // ── Toast State ──
  const [toasts, setToasts] = useState([]);

  // ── Wishlist State ──
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('momohouse_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('momohouse_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('momohouse_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist user
  useEffect(() => {
    if (user) localStorage.setItem('momohouse_user', JSON.stringify(user));
    else localStorage.removeItem('momohouse_user');
  }, [user]);

  // ── Toast helper ──
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  // ── Cart actions ──
  const addToCart = useCallback((item, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...item, quantity: qty }];
    });
    showToast(`${item.name} added to cart! 🥟`);
  }, [showToast]);

  const removeFromCart = useCallback((itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.id !== itemId));
    } else {
      setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // ── Wishlist actions ──
  const toggleWishlist = useCallback((itemId) => {
    setWishlist(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  }, []);

  const isWishlisted = useCallback((itemId) => wishlist.includes(itemId), [wishlist]);

  // ── Auth actions ──
  const login = useCallback((userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}! 👋`);
  }, [showToast]);

  const signup = useCallback((userData) => {
    setUser(userData);
    showToast(`Welcome to MoMo House, ${userData.name}! 🥟`);
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    showToast('Logged out successfully. See you soon!');
  }, [showToast]);

  // ── Derived values ──
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartSubtotal = cartTotal;
  const deliveryFee = cartTotal > 0 ? (cartTotal >= 500 ? 0 : 50) : 0;
  const taxes = Math.round(cartTotal * 0.05);
  const cartGrandTotal = cartTotal + deliveryFee + taxes;

  return (
    <AppContext.Provider value={{
      // Cart
      cart, cartCount, cartTotal, cartSubtotal,
      deliveryFee, taxes, cartGrandTotal,
      addToCart, removeFromCart, updateQuantity, clearCart,
      // Wishlist
      wishlist, toggleWishlist, isWishlisted,
      // Auth
      user, login, signup, logout,
      // Toasts
      toasts, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy access
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
