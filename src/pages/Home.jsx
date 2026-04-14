// ===== Home Page — Oh My Momo! =====
import React from 'react';
import { Link } from 'react-router-dom';
import { menuItems, testimonials, combos } from '../data/menu';
import MomoCard from '../components/MomoCard';
import './Home.css';

// ─── HERO ───
function Hero() {
  return (
    <section className="hero">
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />
      <div className="hero__inner container">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Delhi's Favourite Street-Style Momos
          </div>
          <h1 className="hero__title">
            Oh My<br />
            <span className="hero__title-accent">Momo!</span>
          </h1>
          <p className="hero__desc">
            Hand-folded, steamed in bamboo baskets, dunked in legendary spicy broth.
            Authentic Delhi street-food flavours — delivered hot to your door in 30 minutes.
          </p>
          <div className="hero__cta">
            <Link to="/menu" className="btn btn-primary btn-xl">Order Now 🥟</Link>
            <Link to="/menu?cat=drinks" className="btn btn-outline btn-lg">See Drinks 🥤</Link>
          </div>
          <div className="hero__trust">
            <div className="hero__trust-item"><span>⭐ 4.9</span> Rating</div>
            <div className="hero__trust-sep" />
            <div className="hero__trust-item"><span>🛵 30 min</span> Delivery</div>
            <div className="hero__trust-sep" />
            <div className="hero__trust-item"><span>🥟 20+</span> Varieties</div>
            <div className="hero__trust-sep" />
            <div className="hero__trust-item"><span>👥 10K+</span> Happy Foodies</div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__img-wrap">
            <img
              src="image/logo.png"
              alt="Delhi Street Momos"
              className="hero__img"
            />
            <div className="hero__img-ring hero__img-ring--1" />
            <div className="hero__img-ring hero__img-ring--2" />
          </div>

          <div className="hero__float hero__float--1">
            <span>🔥</span>
            <div>
              <strong>Delhi Jhol Momo</strong>
              <small>Our #1 bestseller</small>
            </div>
          </div>
          <div className="hero__float hero__float--2">
            <span>⭐ 5.0</span>
            <div>
              <strong>891 reviews</strong>
              <small>This week</small>
            </div>
          </div>
          <div className="hero__float hero__float--3">
            <span>🛵</span>
            <div><strong>Free delivery</strong><small>on ₹500+</small></div>
          </div>
        </div>
      </div>

      <div className="hero__wave">
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,36 C360,72 720,0 1080,36 C1260,54 1380,24 1440,36 L1440,72 L0,72Z" fill="var(--clr-bg)"/>
        </svg>
      </div>
    </section>
  );
}

// ─── FEATURE STRIP ───
function Features() {
  const list = [
    { icon:"🏔️", title:"Himalayan Roots",   desc:"Authentic Nepali & Tibetan recipes, brought to Delhi's streets." },
    { icon:"🤲", title:"Hand-Folded Daily",  desc:"Each momo shaped by hand every morning. Never frozen. Never factory-made." },
    { icon:"🌿", title:"Fresh Every Day",    desc:"Ingredients sourced fresh from local markets before dawn." },
    { icon:"🛵", title:"Hot in 30 Mins",     desc:"Insulated packaging keeps your momos steaming until they reach you." },
  ];
  return (
    <section className="features">
      <div className="container">
        <div className="features__grid">
          {list.map((f,i) => (
            <div key={i} className="feature-card" style={{ animationDelay:`${i*0.1}s` }}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BESTSELLERS ───
function Bestsellers() {
  const bests = menuItems.filter(i => i.bestseller);
  return (
    <section className="bestsellers">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">⭐ Most Loved</div>
          <h2 className="section-title">Our Bestsellers</h2>
          <p className="section-subtitle">The dishes that keep our customers coming back — every single time.</p>
        </div>
        <div className="bestsellers__grid">
          {bests.map(item => <MomoCard key={item.id} item={item} />)}
        </div>
        <div style={{ textAlign:'center', marginTop:'var(--space-2xl)' }}>
          <Link to="/menu" className="btn btn-outline btn-lg">View All 20+ Items →</Link>
        </div>
      </div>
    </section>
  );
}

// ─── OUR STORY ───
function OurStory() {
  return (
    <section className="our-story">
      <div className="container">
        <div className="our-story__inner">
          <div className="our-story__img-col">
            <div className="our-story__img-wrap">
              <img
                src="image/shop.png"
                alt="Our kitchen"
              />
            </div>
            <div className="our-story__since">
              <strong>Est.</strong>
              <span>2019</span>
            </div>
          </div>

          <div className="our-story__content">
            <div className="section-eyebrow">📖 Our Story</div>
            <h2 className="section-title">From a Street Stall to<br/> Delhi's Favourite</h2>
            <p>
              Oh My Momo started in 2019 from a tiny stall in Lajpat Nagar with one folding table,
              one bamboo steamer, and a family recipe passed down from a Nepali grandmother. The
              mission was simple: serve <strong>authentic, spicy, and delicious momos</strong> with
              a modern twist — made fresh, sold fast, enjoyed everywhere.
            </p>
            <p>
              Five years later, we've served over 10,000 loyal customers across Delhi-NCR, launched
              a full drinks menu, and grown from a street stall to a real delivery brand — but our
              handmade process, fresh ingredients, and obsession with flavour have never changed.
            </p>
            <div className="our-story__stats">
              <div className="our-story__stat"><strong>5+</strong><span>Years</span></div>
              <div className="our-story__stat"><strong>10K+</strong><span>Customers</span></div>
              <div className="our-story__stat"><strong>20+</strong><span>Menu Items</span></div>
              <div className="our-story__stat"><strong>4.9★</strong><span>Avg Rating</span></div>
            </div>
            <Link to="/menu" className="btn btn-primary btn-lg" style={{ marginTop:'var(--space-lg)' }}>
              Explore Our Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ───
function WhyChooseUs() {
  const reasons = [
    { icon:"🏆", title:"Authentic Delhi Street Taste", desc:"Every recipe traces back to the original street-stall technique. No shortcuts, no compromises on flavour." },
    { icon:"🌿", title:"Fresh Ingredients Daily",       desc:"We source vegetables, chicken, and spices from Azadpur Mandi every morning. No frozen produce, ever." },
    { icon:"🛵", title:"Fast Delivery – 30 Minutes",    desc:"Insulated packaging + our dedicated delivery fleet means your momos arrive steaming hot, every time." },
    { icon:"💰", title:"Affordable Pricing",            desc:"Street-food prices for restaurant-quality momos. Starting at just ₹49 for a Masala Chai + momo combo." },
    { icon:"🤲", title:"Handcrafted Every Day",         desc:"No machines, no factory folds. Each momo is shaped by hand in our kitchen every single morning." },
    { icon:"⭐", title:"Rated 4.9 by 10,000+ Foodies", desc:"Consistently rated Delhi's favourite momo brand on Zomato, Swiggy, and Google Reviews." },
  ];
  return (
    <section className="why-choose">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">💡 Why Choose Us</div>
          <h2 className="section-title">Why Oh My Momo!?</h2>
          <p className="section-subtitle">Six reasons 10,000+ Delhiites trust us with their momo cravings.</p>
        </div>
        <div className="why-choose__grid">
          {reasons.map((r,i) => (
            <div key={i} className="why-card">
              <div className="why-card__icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMBO SUGGESTIONS ───
function Combos() {
  return (
    <section className="combos">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">🔥 Best Pairings</div>
          <h2 className="section-title">Momo + Drink Combos</h2>
          <p className="section-subtitle">Our kitchen-tested combos for the perfect meal.</p>
        </div>
        <div className="combos__grid">
          {combos.map(c => (
            <div key={c.id} className="combo-card">
              <div className="combo-card__tag">{c.tag}</div>
              <h3>{c.name}</h3>
              <ul>
                {c.items.map(item => <li key={item}>🥟 {item}</li>)}
              </ul>
              <div className="combo-card__saving">Save ₹{c.saving} on this combo</div>
              <Link to="/menu" className="btn btn-primary btn-sm">Order Combo</Link>
            </div>
          ))}
          <div className="combo-card combo-card--cta">
            <div style={{ fontSize:'3rem', marginBottom:'var(--space-md)' }}>🥤</div>
            <h3>Drinks Now Available!</h3>
            <p>Cold coffees, lassis, masala lemonade, chai and more — paired perfectly with every momo.</p>
            <Link to="/menu?cat=drinks" className="btn btn-outline btn-sm">See All Drinks</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROMO BANNER ───
function Banner() {
  return (
    <section className="home-banner">
      <div className="container">
        <div className="home-banner__inner">
          <div className="home-banner__left">
            <div className="home-banner__eyebrow">🎉 First Order Offer</div>
            <h2>Get 50% Off Your First Order!</h2>
            <p>Use code <strong>OHMYMOMO50</strong> at checkout. Valid on orders above ₹199. New customers only.</p>
            <Link to="/menu" className="btn btn-accent btn-lg">Claim Offer</Link>
          </div>
          <div className="home-banner__imgs">
            <img src="image/delhi jhol momos.png" alt="Jhol Momo" />
            <img src="image/cold_cofee.png" alt="Cold Coffee" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ───
function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">💬 Real Reviews</div>
          <h2 className="section-title">What Delhiites Say</h2>
        </div>
        <div className="testimonials__grid">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-card__stars">
                {'★'.repeat(t.rating)}
              </div>
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.avatar}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>📍 {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN EXPORT ───
export default function Home() {
  return (
    <div className="page home-page">
      <Hero />
      <Features />
      <Bestsellers />
      <OurStory />
      <WhyChooseUs />
      <Combos />
      <Banner />
      <Testimonials />
    </div>
  );
}
