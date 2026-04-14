// ===== Contact Page — Oh My Momo! =====
import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form,    setForm]    = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  const locations = [
    { name:'Oh My Momo! — Lajpat Nagar', address:'Shop 14, Central Market, Lajpat Nagar II, New Delhi – 110024', hours:'11 AM – 11 PM', phone:'+91 98765 43210' },
    { name:'Oh My Momo! — Connaught Place', address:'Block A, Inner Circle, Connaught Place, New Delhi – 110001', hours:'12 PM – 10 PM', phone:'+91 98765 43211' },
  ];

  return (
    <div className="page contact-page">
      <div className="contact-header">
        <div className="container">
          <div className="section-eyebrow">📬 Get in Touch</div>
          <h1 className="section-title">We'd Love to Hear From You</h1>
          <p className="section-subtitle">
            Feedback, catering orders, franchise enquiries, or just saying hi — we're all ears.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          {/* ── Form ── */}
          <div className="contact-form-section">
            {sent ? (
              <div className="contact-success">
                <div className="contact-success__icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll get back to you within 24 hours at <strong>{form.email}</strong>.</p>
                <button className="btn btn-primary"
                  onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>📝 Send a Message</h3>

                <div className="contact-form__row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Optional" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a topic…</option>
                    <option>Feedback / Review</option>
                    <option>Catering / Bulk Order</option>
                    <option>Franchise Enquiry</option>
                    <option>Delivery Issue</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={6}
                    placeholder="Tell us anything — we read every message." required />
                </div>

                <button type="submit" className="btn btn-primary btn-lg contact-submit-btn" disabled={loading}>
                  {loading ? '⏳ Sending…' : '🚀 Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* ── Info ── */}
          <div className="contact-info">
            <div className="contact-info-card">
              <h3>📞 Quick Contact</h3>
              <div className="contact-info-items">
                <div className="contact-info-item">
                  <span>📱</span>
                  <div><strong>Call Us</strong><a href="tel:+919876543210">+91 98765 43210</a></div>
                </div>
                <div className="contact-info-item">
                  <span>💬</span>
                  <div><strong>WhatsApp</strong><a href="#">Chat with us</a></div>
                </div>
                <div className="contact-info-item">
                  <span>✉️</span>
                  <div><strong>Email</strong><a href="mailto:hello@ohmymomo.in">hello@ohmymomo.in</a></div>
                </div>
                <div className="contact-info-item">
                  <span>🕐</span>
                  <div><strong>Hours</strong><span>Daily 11 AM – 11 PM</span></div>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <h3>📍 Our Locations</h3>
              {locations.map((loc, i) => (
                <div key={i} className="contact-location">
                  <h4>{loc.name}</h4>
                  <p>📍 {loc.address}</p>
                  <p>🕐 {loc.hours} &nbsp;·&nbsp; 📞 {loc.phone}</p>
                </div>
              ))}
            </div>

            <div className="contact-info-card">
              <h3>🌐 Follow the Momo Journey</h3>
              <div className="contact-social">
                <a href="#" className="contact-social-btn">📸 @ohmymomoin on Instagram</a>
                <a href="#" className="contact-social-btn">📘 Oh My Momo! on Facebook</a>
                <a href="#" className="contact-social-btn">𝕏 @ohmymomo on Twitter</a>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="contact-map">
          <div className="contact-map__placeholder">
            <span>🗺️</span>
            <p>Google Maps integration — embed your actual location here using the Google Maps Embed API</p>
          </div>
        </div>
      </div>
    </div>
  );
}
