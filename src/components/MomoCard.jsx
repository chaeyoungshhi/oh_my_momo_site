// ===== MomoCard — Oh My Momo! =====
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getSpicyEmoji } from '../data/menu';
import './MomoCard.css';

function Stars({ rating }) {
  const full = Math.floor(rating);
  return (
    <span className="stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function MomoCard({ item }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(item.id);

  return (
    <div className="momo-card card">
      {/* Top badges */}
      <div className="momo-card__badges">
        {item.bestseller && <span className="momo-card__badge momo-card__badge--hot">🔥 Bestseller</span>}
        {item.tags.includes('new') && <span className="momo-card__badge momo-card__badge--new">✨ New</span>}
        {item.tags.includes('seasonal') && <span className="momo-card__badge momo-card__badge--seasonal">🌿 Seasonal</span>}
      </div>

      {/* Wishlist */}
      <button
        className={`momo-card__wishlist ${wishlisted ? 'active' : ''}`}
        onClick={() => toggleWishlist(item.id)}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      {/* Image */}
      <Link to={`/menu/${item.id}`} className="momo-card__img-wrap">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="momo-card__img"
            loading="lazy"
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
          />
        ) : null}
        <div className="momo-card__img-fallback" style={{ display: item.image ? 'none' : 'flex' }}>
          <span>{item.emoji}</span>
        </div>
        <div className="momo-card__category-pill">{item.category}</div>
      </Link>

      {/* Body */}
      <div className="momo-card__body">
        <div className="momo-card__meta-top">
          <span className={`badge badge-${item.type}`}>
            {item.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
          </span>
          {item.spicy > 0 && (
            <span className="momo-card__spicy" title={`Spicy level ${item.spicy}/5`}>
              {getSpicyEmoji(item.spicy)}
            </span>
          )}
        </div>

        <Link to={`/menu/${item.id}`}>
          <h3 className="momo-card__name">{item.name}</h3>
        </Link>

        <p className="momo-card__desc">{item.description}</p>

        <div className="momo-card__rating">
          <Stars rating={item.rating} />
          <span>{item.rating} ({item.reviews})</span>
        </div>

        <div className="momo-card__serving">{item.servings} · {item.calories} kcal</div>

        {/* Footer */}
        <div className="momo-card__footer">
          <div className="momo-card__price">
            <span className="momo-card__price-now">₹{item.price}</span>
            {item.originalPrice && (
              <span className="momo-card__price-was">₹{item.originalPrice}</span>
            )}
          </div>
          <button className="btn btn-primary btn-sm momo-card__add" onClick={() => addToCart(item)}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
