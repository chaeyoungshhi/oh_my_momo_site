// ===== Product Detail Page =====

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { menuItems, getSpicyEmoji, getSpicyLabel } from '../data/menu';
import { useApp } from '../context/AppContext';
import MomoCard from '../components/MomoCard';
import './ProductDetail.css';

// Star rating component
function Stars({ rating }) {
  return (
    <span className="stars">
      {'★'.repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? '½' : ''}
      {'☆'.repeat(5 - Math.ceil(rating))}
    </span>
  );
}

// Hardcoded reviews for demo
const sampleReviews = [
  { id: 1, name: "Arjun K.", rating: 5, date: "2 days ago", text: "Absolutely incredible! The broth is soul-warming and the momos are perfectly tender. Will order again!", avatar: "AK" },
  { id: 2, name: "Sneha R.", rating: 5, date: "1 week ago", text: "Best momos I've had outside Nepal. Authentic flavours, generous portions. The chutney is divine!", avatar: "SR" },
  { id: 3, name: "Dev M.", rating: 4, date: "2 weeks ago", text: "Very good but slightly spicy for my taste. The texture and flavour are excellent though.", avatar: "DM" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useApp();

  const item = menuItems.find(i => i.id === Number(id));

  const [qty, setQty] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState(sampleReviews);
  const [activeTab, setActiveTab] = useState('description');

  if (!item) {
    return (
      <div className="page">
        <div className="container empty-state" style={{ paddingTop: '6rem' }}>
          <div className="emoji">😕</div>
          <h3>Momo not found!</h3>
          <p>This item doesn't exist in our menu.</p>
          <Link to="/menu" className="btn btn-primary">Back to Menu</Link>
        </div>
      </div>
    );
  }

  // Related items: same category, exclude current
  const related = menuItems.filter(m => m.category === item.category && m.id !== item.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(item, qty);
    navigate('/cart');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    const newReview = {
      id: Date.now(),
      name: "You",
      rating: reviewRating,
      date: "Just now",
      text: reviewText,
      avatar: "ME",
    };
    setReviews(prev => [newReview, ...prev]);
    setReviewText('');
    setReviewRating(5);
  };

  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="page product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/menu">Menu</Link> / <span>{item.name}</span>
        </nav>

        {/* Main section */}
        <div className="product-main">
          {/* Image Panel */}
          <div className="product-image-panel">
            <div className="product-image">
              {item.image
                ? <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                : <span className="product-image__emoji">{item.emoji}</span>}
              {item.bestseller && (
                <div className="product-image__badge">🔥 Bestseller</div>
              )}
            </div>

            {/* Thumbnails (decorative placeholders) */}
            <div className="product-thumbs">
              {[item.emoji, '🍽️', '✨'].map((e, i) => (
                <div key={i} className={`product-thumb ${i === 0 ? 'product-thumb--active' : ''}`}>
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="product-info">
            <div className="product-info__top">
              <span className={`badge badge-${item.type}`}>
                {item.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
              </span>
              <span className="product-category-tag">{item.category}</span>
            </div>

            <h1 className="product-name">{item.name}</h1>

            {/* Rating */}
            <div className="product-rating">
              <Stars rating={item.rating} />
              <span className="product-rating__score">{item.rating}</span>
              <span className="product-rating__count">({item.reviews} reviews)</span>
            </div>

            {/* Quick facts */}
            <div className="product-facts">
              <div className="product-fact">
                <span className="product-fact__icon">🍽️</span>
                <span>{item.servings}</span>
              </div>
              <div className="product-fact">
                <span className="product-fact__icon">🔥</span>
                <span>{item.calories} kcal</span>
              </div>
              {item.spicy > 0 && (
                <div className="product-fact">
                  <span className="product-fact__icon">🌶️</span>
                  <span>{getSpicyLabel(item.spicy)} {getSpicyEmoji(item.spicy)}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="product-price">
              <span className="product-price__current">₹{item.price}</span>
              {item.originalPrice && (
                <>
                  <span className="product-price__original">₹{item.originalPrice}</span>
                  <span className="product-price__discount">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="product-desc">{item.longDescription}</p>

            {/* Allergens */}
            {item.allergens.length > 0 && (
              <div className="product-allergens">
                <strong>⚠️ Allergens:</strong> {item.allergens.join(', ')}
              </div>
            )}

            {/* Quantity + Cart */}
            <div className="product-actions">
              <div className="product-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>

              <button className="btn btn-primary btn-lg product-cart-btn" onClick={handleAddToCart}>
                🛒 Add {qty} to Cart — ₹{item.price * qty}
              </button>

              <button
                className={`product-wishlist-btn ${isWishlisted(item.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(item.id)}
                aria-label="Wishlist"
              >
                {isWishlisted(item.id) ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Delivery note */}
            <div className="product-delivery-note">
              🚴 Free delivery on orders ₹500+  &nbsp;|&nbsp; 🕐 Delivered in ~30 min
            </div>
          </div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div className="product-tabs">
          <div className="product-tabs__nav">
            {['description', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`product-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'description' ? '📋 Details' : `💬 Reviews (${reviews.length})`}
              </button>
            ))}
          </div>

          <div className="product-tabs__content">
            {activeTab === 'description' && (
              <div className="product-tab-desc">
                <h3>About this dish</h3>
                <p>{item.longDescription}</p>

                <div className="product-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="product-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="product-tab-reviews">
                {/* Rating summary */}
                <div className="reviews-summary">
                  <div className="reviews-summary__score">
                    <span className="reviews-summary__big">{item.rating}</span>
                    <Stars rating={item.rating} />
                    <span>{item.reviews} total reviews</span>
                  </div>
                </div>

                {/* Review list */}
                <div className="review-list">
                  {reviews.map(r => (
                    <div key={r.id} className="review-card">
                      <div className="review-card__header">
                        <div className="review-card__avatar">{r.avatar}</div>
                        <div>
                          <strong>{r.name}</strong>
                          <span>{r.date}</span>
                        </div>
                        <div className="review-card__stars">
                          {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                        </div>
                      </div>
                      <p>{r.text}</p>
                    </div>
                  ))}
                </div>

                {/* Add review form */}
                <div className="review-form">
                  <h4>Leave a Review</h4>
                  <div className="review-form__rating">
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n}
                        className={`review-star-btn ${n <= reviewRating ? 'active' : ''}`}
                        onClick={() => setReviewRating(n)}
                      >★</button>
                    ))}
                  </div>
                  <form onSubmit={handleSubmitReview}>
                    <textarea
                      value={reviewText}
                      onChange={e => setReviewText(e.target.value)}
                      placeholder="Share your experience with this momo…"
                      rows={4}
                    />
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Items */}
        {related.length > 0 && (
          <div className="product-related">
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              You Might Also Like
            </h2>
            <div className="product-related__grid">
              {related.map(r => <MomoCard key={r.id} item={r} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
