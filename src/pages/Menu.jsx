// ===== Menu Page =====

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { menuItems, categories, dietFilters } from '../data/menu';
import MomoCard from '../components/MomoCard';
import './Menu.css';

export default function Menu() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeDiet, setActiveDiet] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Filter + search + sort logic
  const filtered = useMemo(() => {
    let items = [...menuItems];

    // Category filter
    if (activeCategory !== 'all') {
      items = items.filter(i => i.category === activeCategory);
    }

    // Diet filter
    if (activeDiet !== 'all') {
      items = items.filter(i => i.type === activeDiet);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.tags.some(t => t.includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') items.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') items.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') items.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'popular') items.sort((a, b) => b.reviews - a.reviews);

    return items;
  }, [activeCategory, activeDiet, searchQuery, sortBy]);

  return (
    <div className="page menu-page">
      {/* Header */}
      <div className="menu-header">
        <div className="menu-header__bg" />
        <div className="container menu-header__inner">
          <h1 className="section-title">Our Menu</h1>
          <p className="section-subtitle">
            Steamed, fried, spicy, dessert & drinks — always fresh, always delicious. Pick your favourite.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Search Bar */}
        <div className="menu-search">
          <div className="menu-search__input-wrap">
            <span className="menu-search__icon">🔍</span>
            <input
              type="text"
              placeholder="Search momos… e.g. chicken, spicy, fried"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="menu-search__input"
            />
            {searchQuery && (
              <button className="menu-search__clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Sort */}
          <div className="menu-search__sort">
            <label>Sort by:</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="menu-filters">
          <div className="menu-filters__categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`menu-filter-tab ${activeCategory === cat.id ? 'menu-filter-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>

          <div className="menu-filters__diet">
            {dietFilters.map(f => (
              <button
                key={f.id}
                className={`menu-diet-btn ${activeDiet === f.id ? 'menu-diet-btn--active' : ''}`}
                onClick={() => setActiveDiet(f.id)}
              >
                {f.id === 'veg' && '🟢 '}
                {f.id === 'nonveg' && '🔴 '}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div className="menu-result-count">
          {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="menu-grid">
            {filtered.map(item => (
              <MomoCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="emoji">🥟</div>
            <h3>No momos found</h3>
            <p>Try a different search term or filter.</p>
            <button
              className="btn btn-primary"
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); setActiveDiet('all'); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
