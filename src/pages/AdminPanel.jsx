// ===== Admin Panel — Oh My Momo! =====
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuItems as initialItems, categories } from '../data/menu';
import { useApp } from '../context/AppContext';
import './AdminPanel.css';

const EMPTY = {
  name:'', category:'steamed', type:'veg', price:'',
  description:'', servings:'8 pieces', calories:'', spicy:0,
  bestseller:false, emoji:'🥟', image:'', tags:'',
};

// Dummy business stats
const DUMMY_ORDERS = [
  { id:'OMM-1041', customer:'Priya Sharma',  item:'Delhi Jhol Momo × 2',     total:318, status:'Delivered',  time:'12 mins ago' },
  { id:'OMM-1040', customer:'Rohan Mehta',   item:'Kurkure Fried Momos × 1', total:119, status:'Preparing',  time:'18 mins ago' },
  { id:'OMM-1039', customer:'Anjali Gupta',  item:'Chocolate Oreo Shake × 2',total:238, status:'Delivered',  time:'34 mins ago' },
  { id:'OMM-1038', customer:'Dev Malhotra',  item:'C-Momo × 1 + Masala Chai',total:218, status:'Delivered',  time:'1 hr ago'    },
  { id:'OMM-1037', customer:'Sneha Rawat',   item:'Afghani Cream Momos × 1', total:159, status:'Delivered',  time:'2 hrs ago'   },
];

export default function AdminPanel() {
  const { user, showToast } = useApp();
  const [items,       setItems]       = useState(initialItems);
  const [activeTab,   setActiveTab]   = useState('dashboard');
  const [editItem,    setEditItem]    = useState(null);
  const [newItem,     setNewItem]     = useState(EMPTY);

  if (!user || !user.isAdmin) {
    return (
      <div className="page admin-page">
        <div className="container empty-state" style={{ paddingTop:'6rem' }}>
          <div className="emoji">🔒</div>
          <h3>Admin Access Only</h3>
          <p>You need admin privileges to view this page.</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/login" className="btn btn-primary">Sign In as Admin</Link>
            <Link to="/" className="btn btn-outline">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Derived stats
  const revenue     = DUMMY_ORDERS.reduce((s,o) => s + o.total, 0);
  const bestSelling = (() => {
    const counts = {};
    items.filter(i => i.bestseller).forEach(i => { counts[i.name] = (i.reviews || 0); });
    return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] || items[0]?.name;
  })();

  const stats = [
    { icon:'📦', label:'Total Menu Items', value:items.length,     color:'var(--clr-primary)' },
    { icon:'🛒', label:'Orders Today',     value:DUMMY_ORDERS.length,    color:'var(--clr-accent)'  },
    { icon:'💰', label:'Revenue Today',    value:`₹${revenue}`,    color:'#2E7D32'             },
    { icon:'🔥', label:'Best Seller',      value:bestSelling,      color:'var(--clr-spicy)',  small:true },
    { icon:'⭐', label:'Avg Rating',        value:'4.9 / 5.0',      color:'var(--clr-accent)'  },
  ];

  const handleDelete = (id) => {
    if (!window.confirm('Delete this item?')) return;
    setItems(p => p.filter(i => i.id !== id));
    showToast('Item deleted');
  };
  const handleToggleBestseller = (id) => {
    setItems(p => p.map(i => i.id === id ? {...i, bestseller:!i.bestseller} : i));
    showToast('Updated!');
  };
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setItems(p => p.map(i => i.id === editItem.id ? editItem : i));
    setEditItem(null);
    showToast('Item updated ✅');
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const item = {
      ...newItem, id:Date.now(),
      price:Number(newItem.price), calories:Number(newItem.calories), spicy:Number(newItem.spicy),
      rating:4.5, reviews:0, originalPrice:null, allergens:[],
      longDescription:newItem.description,
      tags:newItem.tags.split(',').map(t=>t.trim()).filter(Boolean),
    };
    setItems(p => [...p, item]);
    setNewItem(EMPTY);
    setActiveTab('menu');
    showToast(`"${item.name}" added to menu 🥟`);
  };

  const tabs = [
    { id:'dashboard', label:'📊 Dashboard' },
    { id:'orders',    label:'🛒 Orders'     },
    { id:'menu',      label:'🍽️ Menu'       },
    { id:'add',       label:'➕ Add Item'    },
  ];

  return (
    <div className="page admin-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Admin Panel</h1>
            <p>Welcome back, <strong>{user.name}</strong> — here's your business at a glance.</p>
          </div>
          <div style={{ display:'flex', gap:'var(--space-md)', alignItems:'center', flexWrap:'wrap' }}>
            <span className="admin-live-badge">🟢 Live</span>
            <Link to="/" className="btn btn-outline btn-sm">← View Site</Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`admin-tab ${activeTab===t.id?'active':''}`} onClick={() => { setActiveTab(t.id); setEditItem(null); }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── DASHBOARD ── */}
        {activeTab==='dashboard' && (
          <div className="admin-content animate-fadeUp">
            <div className="admin-stats">
              {stats.map((s,i) => (
                <div key={i} className="admin-stat-card">
                  <div className="admin-stat-icon">{s.icon}</div>
                  <div className="admin-stat-num" style={{ color:s.color, fontSize: s.small ? '1.1rem':'2rem' }}>
                    {s.value}
                  </div>
                  <div className="admin-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Category breakdown */}
            <div className="admin-row">
              <div className="admin-categories">
                <h3>Items by Category</h3>
                {categories.filter(c=>c.id!=='all').map(cat => {
                  const count = items.filter(i=>i.category===cat.id).length;
                  const pct   = Math.round(count/items.length*100);
                  return (
                    <div key={cat.id} className="admin-cat-row">
                      <span>{cat.icon} {cat.label}</span>
                      <div className="admin-cat-bar-wrap">
                        <div className="admin-cat-bar" style={{ width:`${pct}%` }} />
                      </div>
                      <span>{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Quick actions */}
              <div className="admin-quick">
                <h3>Quick Actions</h3>
                <button className="btn btn-primary" style={{ width:'100%', marginBottom:'var(--space-sm)' }} onClick={()=>setActiveTab('add')}>
                  ➕ Add New Menu Item
                </button>
                <button className="btn btn-ghost" style={{ width:'100%', marginBottom:'var(--space-sm)' }} onClick={()=>setActiveTab('orders')}>
                  🛒 View Recent Orders
                </button>
                <Link to="/menu" className="btn btn-outline" style={{ width:'100%', display:'flex', justifyContent:'center' }}>
                  🍽️ Preview Menu
                </Link>

                <div className="admin-tip">
                  <strong>💡 Tip:</strong> Items marked as Bestseller appear on the homepage hero section and get 3× more visibility.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {activeTab==='orders' && (
          <div className="admin-content animate-fadeUp">
            <div className="admin-orders-header">
              <h3>Recent Orders — Today</h3>
              <span className="admin-orders-count">{DUMMY_ORDERS.length} orders · ₹{revenue} revenue</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_ORDERS.map(o => (
                    <tr key={o.id}>
                      <td><code className="admin-order-id">{o.id}</code></td>
                      <td><strong>{o.customer}</strong></td>
                      <td><span style={{ color:'var(--clr-text-muted)', fontSize:'0.85rem' }}>{o.item}</span></td>
                      <td><strong>₹{o.total}</strong></td>
                      <td>
                        <span className={`admin-status ${o.status==='Delivered'?'admin-status--done':'admin-status--active'}`}>
                          {o.status==='Delivered'?'✅':'⏳'} {o.status}
                        </span>
                      </td>
                      <td style={{ color:'var(--clr-text-muted)', fontSize:'0.82rem' }}>{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MENU ── */}
        {activeTab==='menu' && (
          <div className="admin-content animate-fadeUp">
            {editItem ? (
              <div className="admin-edit-form">
                <div className="admin-edit-header">
                  <h3>✏️ Edit: {editItem.name}</h3>
                  <button className="btn btn-ghost btn-sm" onClick={()=>setEditItem(null)}>✕ Cancel</button>
                </div>
                <form onSubmit={handleSaveEdit}>
                  <div className="admin-form-grid">
                    <div className="form-group"><label>Name</label>
                      <input value={editItem.name} onChange={e=>setEditItem(p=>({...p,name:e.target.value}))} required /></div>
                    <div className="form-group"><label>Price (₹)</label>
                      <input type="number" value={editItem.price} onChange={e=>setEditItem(p=>({...p,price:+e.target.value}))} required /></div>
                    <div className="form-group"><label>Category</label>
                      <select value={editItem.category} onChange={e=>setEditItem(p=>({...p,category:e.target.value}))}>
                        {categories.filter(c=>c.id!=='all').map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                      </select></div>
                    <div className="form-group"><label>Type</label>
                      <select value={editItem.type} onChange={e=>setEditItem(p=>({...p,type:e.target.value}))}>
                        <option value="veg">Veg</option><option value="nonveg">Non-Veg</option>
                      </select></div>
                  </div>
                  <div className="form-group"><label>Description</label>
                    <textarea rows={3} value={editItem.description} onChange={e=>setEditItem(p=>({...p,description:e.target.value}))} /></div>
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={editItem.bestseller} onChange={e=>setEditItem(p=>({...p,bestseller:e.target.checked}))} />
                    🔥 Mark as Bestseller
                  </label>
                  <button type="submit" className="btn btn-primary" style={{ marginTop:'var(--space-lg)' }}>Save Changes</button>
                </form>
              </div>
            ) : (
              <>
                <div className="admin-table-toolbar">
                  <span>{items.length} items in menu</span>
                  <button className="btn btn-primary btn-sm" onClick={()=>setActiveTab('add')}>+ Add Item</button>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Item</th><th>Category</th><th>Type</th><th>Price</th><th>Rating</th><th>Bestseller</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="admin-table-item">
                              {item.image
                                ? <img src={item.image} alt={item.name} style={{ width:36, height:36, objectFit:'cover', borderRadius:8 }} />
                                : <span style={{ fontSize:'1.4rem' }}>{item.emoji}</span>}
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td><span className="admin-tag">{item.category}</span></td>
                          <td><span className={`badge badge-${item.type}`}>{item.type==='veg'?'🟢 Veg':'🔴 Non-Veg'}</span></td>
                          <td><strong>₹{item.price}</strong></td>
                          <td>⭐ {item.rating}</td>
                          <td>
                            <button className={`admin-toggle ${item.bestseller?'on':''}`} onClick={()=>handleToggleBestseller(item.id)}>
                              {item.bestseller?'🔥 Yes':'— No'}
                            </button>
                          </td>
                          <td>
                            <div className="admin-actions">
                              <button className="btn btn-ghost btn-sm" onClick={()=>setEditItem(item)}>✏️ Edit</button>
                              <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(item.id)}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── ADD ITEM ── */}
        {activeTab==='add' && (
          <div className="admin-content animate-fadeUp">
            <div className="admin-add-form">
              <h3>➕ Add New Menu Item</h3>
              <form onSubmit={handleAdd}>
                <div className="admin-form-grid">
                  <div className="form-group"><label>Item Name *</label>
                    <input value={newItem.name} onChange={e=>setNewItem(p=>({...p,name:e.target.value}))} placeholder="e.g. Truffle Veg Momo" required /></div>
                  <div className="form-group"><label>Emoji</label>
                    <input value={newItem.emoji} onChange={e=>setNewItem(p=>({...p,emoji:e.target.value}))} placeholder="🥟" maxLength={4} /></div>
                  <div className="form-group"><label>Price (₹) *</label>
                    <input type="number" value={newItem.price} onChange={e=>setNewItem(p=>({...p,price:e.target.value}))} placeholder="129" required /></div>
                  <div className="form-group"><label>Calories</label>
                    <input type="number" value={newItem.calories} onChange={e=>setNewItem(p=>({...p,calories:e.target.value}))} placeholder="280" /></div>
                  <div className="form-group"><label>Category *</label>
                    <select value={newItem.category} onChange={e=>setNewItem(p=>({...p,category:e.target.value}))}>
                      {categories.filter(c=>c.id!=='all').map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                    </select></div>
                  <div className="form-group"><label>Type *</label>
                    <select value={newItem.type} onChange={e=>setNewItem(p=>({...p,type:e.target.value}))}>
                      <option value="veg">Veg</option><option value="nonveg">Non-Veg</option>
                    </select></div>
                  <div className="form-group"><label>Servings</label>
                    <input value={newItem.servings} onChange={e=>setNewItem(p=>({...p,servings:e.target.value}))} placeholder="8 pieces" /></div>
                  <div className="form-group"><label>Spicy Level (0–5)</label>
                    <input type="number" min="0" max="5" value={newItem.spicy} onChange={e=>setNewItem(p=>({...p,spicy:+e.target.value}))} /></div>
                </div>
                <div className="form-group"><label>Image URL</label>
                  <input value={newItem.image} onChange={e=>setNewItem(p=>({...p,image:e.target.value}))} placeholder="https://images.unsplash.com/..." /></div>
                <div className="form-group"><label>Description *</label>
                  <textarea rows={3} value={newItem.description} onChange={e=>setNewItem(p=>({...p,description:e.target.value}))} placeholder="Short description shown on card…" required /></div>
                <div className="form-group"><label>Tags (comma-separated)</label>
                  <input value={newItem.tags} onChange={e=>setNewItem(p=>({...p,tags:e.target.value}))} placeholder="crispy, veg, street special" /></div>
                <label className="admin-checkbox">
                  <input type="checkbox" checked={newItem.bestseller} onChange={e=>setNewItem(p=>({...p,bestseller:e.target.checked}))} />
                  🔥 Mark as Bestseller (appears on homepage)
                </label>
                <div style={{ display:'flex', gap:'var(--space-md)', marginTop:'var(--space-xl)', flexWrap:'wrap' }}>
                  <button type="submit" className="btn btn-primary btn-lg">Add to Menu 🥟</button>
                  <button type="button" className="btn btn-ghost" onClick={()=>setNewItem(EMPTY)}>Reset</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
