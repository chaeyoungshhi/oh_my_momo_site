// ===== Login / Signup — Oh My Momo! =====
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Login.css';

export default function Login() {
  const [mode,    setMode]    = useState('login');
  const [form,    setForm]    = useState({ name:'', email:'', password:'', phone:'' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const { login, signup, user } = useApp();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="page login-page">
        <div className="container">
          <div className="login-card">
            <div style={{ textAlign:'center', fontSize:'3.5rem', marginBottom:'var(--space-md)' }}>👋</div>
            <h2 style={{ fontFamily:'var(--font-display)', textAlign:'center', marginBottom:'var(--space-sm)', fontSize:'1.5rem' }}>
              Welcome back, {user.name}!
            </h2>
            <p style={{ textAlign:'center', color:'var(--clr-text-muted)', marginBottom:'var(--space-xl)', fontSize:'0.9rem' }}>
              You're already signed into your Oh My Momo! account.
            </p>
            <Link to="/menu" className="btn btn-primary btn-lg" style={{ width:'100%', display:'flex', justifyContent:'center' }}>
              Browse Menu 🥟
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]:'' }));
  };

  const validate = () => {
    const errs = {};
    if (mode === 'signup' && !form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const userData = {
      name:    mode === 'login' ? form.email.split('@')[0] : form.name,
      email:   form.email,
      phone:   form.phone,
      isAdmin: form.email === 'admin@ohmymomo.in',
    };
    mode === 'login' ? login(userData) : signup(userData);
    navigate('/');
    setLoading(false);
  };

  const quickLogin = type => {
    const accounts = {
      user:  { name:'Delhi Foodie', email:'user@demo.com',         isAdmin:false },
      admin: { name:'Admin',         email:'admin@ohmymomo.in', isAdmin:true  },
    };
    login(accounts[type]);
    navigate(type === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="page login-page">
      <div className="container">
        {/* Demo quick access */}
        <div className="demo-box">
          <p>🚀 <strong>Quick Demo Login</strong> — no signup needed</p>
          <div className="demo-btns">
            <button className="btn btn-ghost btn-sm" onClick={() => quickLogin('user')}>
              👤 Login as User
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => quickLogin('admin')}>
              ⚙️ Login as Admin
            </button>
          </div>
        </div>

        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <span>🥟</span>
            <div>
              <div className="login-logo-main">Oh My Momo!</div>
              <div className="login-logo-sub">Delhi's Favourite</div>
            </div>
          </div>

          {/* Toggle */}
          <div className="login-toggle">
            <button className={`login-toggle-btn ${mode==='login'?'active':''}`} onClick={()=>setMode('login')}>
              Sign In
            </button>
            <button className={`login-toggle-btn ${mode==='signup'?'active':''}`} onClick={()=>setMode('signup')}>
              Create Account
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {mode==='signup' && (
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
            )}

            <div className="form-group">
              <label>Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {mode==='signup' && (
              <div className="form-group">
                <label>Phone <span style={{fontWeight:400,color:'var(--clr-text-muted)'}}>optional</span></label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
              </div>
            )}

            <div className="form-group">
              <label>Password *</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 characters" />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            {mode==='login' && (
              <div className="login-forgot">
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg login-submit-btn" disabled={loading}>
              {loading ? '⏳ Please wait…' : mode==='login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          <div className="login-divider"><span>or continue with</span></div>
          <div className="login-social">
            <button className="login-social-btn">🌐 Google</button>
            <button className="login-social-btn">📘 Facebook</button>
          </div>

          <p className="login-switch">
            {mode==='login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={()=>setMode(mode==='login'?'signup':'login')}>
              {mode==='login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
