# 🥟 Oh My Momo! — Delhi's Favourite Street-Style Momos

A premium, portfolio-grade momo restaurant startup website built with **React 18 + Vite**.
Designed for real-world use, MBA interviews, and LinkedIn showcasing.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

---

## 🏗️ Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | React 18 + React Router 6           |
| Bundler      | Vite 5                              |
| Styling      | Pure CSS with CSS Variables         |
| State        | React Context API + localStorage    |
| Fonts        | Syne (display) + Plus Jakarta Sans  |
| Images       | Unsplash CDN (real food photography)|
| Data         | JSON (swap-ready for MongoDB API)   |

---

## 📁 Project Structure

```
src/
├── context/
│   └── AppContext.jsx        # Global cart, auth, toast state
├── data/
│   └── menu.js               # All menu items (momos + drinks)
├── components/
│   ├── Navbar.jsx/css        # Sticky responsive navbar
│   ├── Footer.jsx/css        # Full footer with links
│   ├── MomoCard.jsx/css      # Menu item card with real images
│   ├── ToastContainer.jsx    # Slide-in notifications
│   └── ScrollToTop.jsx       # Auto scroll on navigation
└── pages/
    ├── Home.jsx/css           # Hero, story, why-us, combos, testimonials
    ├── Menu.jsx/css           # Search, filter, sort (incl. Drinks)
    ├── ProductDetail.jsx/css  # Full item detail + reviews
    ├── Cart.jsx/css           # Cart with quantity controls
    ├── Checkout.jsx/css       # 2-step: address + payment
    ├── OrderSuccess.jsx/css   # Live order tracker
    ├── Contact.jsx/css        # Contact form + locations
    ├── Login.jsx/css          # Sign in / Sign up
    └── AdminPanel.jsx/css     # Dashboard, orders, menu CRUD
```

---

## 🧾 All Pages

| Page            | Route           | Key Features                                          |
|-----------------|-----------------|-------------------------------------------------------|
| **Home**        | `/`             | Hero with real image, Our Story, Why Choose Us, Combos, Testimonials |
| **Menu**        | `/menu`         | 20 items across 6 categories incl. Drinks. Search, filter, sort |
| **Product**     | `/menu/:id`     | Real food photo, quantity picker, reviews, related items |
| **Cart**        | `/cart`         | Full controls, GST calc, free delivery threshold     |
| **Checkout**    | `/checkout`     | 2-step: address validation + 4 payment methods       |
| **Order Done**  | `/order-success`| Animated confirmation + live order tracker           |
| **Contact**     | `/contact`      | Form + 2 locations + social links                    |
| **Login**       | `/login`        | Sign in/up + quick demo buttons                      |
| **Admin**       | `/admin`        | Stats dashboard, recent orders, full menu CRUD       |

---

## 🍽️ Menu Categories

| Category    | Items | Description                          |
|-------------|-------|--------------------------------------|
| Steamed     | 4     | Classic handmade steamed momos       |
| Fried       | 3     | Kurkure, pan-fried, deep-fried       |
| Spicy/Jhol  | 3     | Broth momos + Indo-Chinese C-Momo   |
| Dessert     | 2     | Nutella Lava + Mango Cream           |
| **Drinks**  | **8** | Cold coffee, shakes, lassis, chai    |

---

## 🎨 Design System

```css
/* Brand Palette — Olive Green × Warm Cream */
--clr-primary:       #4A7C59   /* Olive green   */
--clr-accent:        #E8A838   /* Saffron gold  */
--clr-bg:            #FAFAF7   /* Warm white    */
--clr-spicy:         #D94F2B   /* Spicy red     */

/* Typography */
--font-display: 'Syne'              /* Bold headings  */
--font-body:    'Plus Jakarta Sans' /* Clean body     */
```

---

## 🔑 Demo Accounts

| Role    | Email                  | Access                    |
|---------|------------------------|---------------------------|
| User    | user@demo.com          | Menu, Cart, Orders        |
| **Admin** | **admin@ohmymomo.in** | **All pages + Admin Panel** |

Use the **Quick Demo Login** buttons on the Sign In page.

---

## 🛒 Features Checklist

- [x] Cart with localStorage persistence
- [x] Quantity controls + remove items
- [x] Free delivery threshold (₹500+)
- [x] GST calculation (5%)
- [x] Promo code input field
- [x] 2-step checkout with validation
- [x] 4 payment methods (UPI, COD, Card, Wallet)
- [x] Animated order confirmation + live tracker
- [x] Search + filter + sort on menu
- [x] Veg / Non-Veg diet filter
- [x] Wishlist (heart button on cards)
- [x] Product reviews + star rating submission
- [x] Login / Signup with validation
- [x] Admin dashboard with dummy orders + revenue
- [x] Admin: add / edit / delete menu items
- [x] Admin: toggle bestseller status
- [x] Toast notifications
- [x] Fully responsive (mobile + tablet + desktop)
- [x] Real Unsplash food photography
- [x] Drinks category (8 items)
- [x] Combo suggestions section
- [x] "Our Story" brand section
- [x] "Why Choose Us" business section

---

## 🔗 Connect Real Backend

Replace `src/data/menu.js` imports with API calls:

```js
// In your component:
const [menuItems, setMenuItems] = useState([]);
useEffect(() => {
  fetch('https://your-api.com/menu')
    .then(r => r.json())
    .then(setMenuItems);
}, []);
```

MongoDB schema follows the same structure as `menu.js`.

---

## 📦 Build Output

```
dist/
├── index.html          (~1 KB)
├── assets/
│   ├── index.css       (~67 KB, gzip: 11 KB)
│   └── index.js        (~253 KB, gzip: 77 KB)
```

---

Built with ❤️ for Oh My Momo! — Delhi's Favourite Street-Style Momos 🥟
