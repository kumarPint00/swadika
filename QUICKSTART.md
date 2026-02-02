# 🚀 Swadika Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Code editor (VS Code recommended)

---

## 📦 Installation

### 1. Clone & Install Dependencies
```bash
cd /Users/ravi/swadika
npm install
```

### 2. Environment Setup
```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your API keys
# For development, you can use mock values
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🧪 Testing API Endpoints

### Authentication

**Send OTP:**
```bash
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210"}'
```

**Verify OTP:**
```bash
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","otp":"123456"}'
```

### Menu

**Get All Menu Items:**
```bash
curl http://localhost:3000/api/menu
```

**Get Vegetarian Items:**
```bash
curl http://localhost:3000/api/menu?category=Vegetarian
```

**Get Specific Item:**
```bash
curl http://localhost:3000/api/menu?id=litti-chokha-001
```

### Cart

**Add to Cart:**
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "item": {
      "dishId": "litti-chokha-001",
      "dishName": "Litti Chokha",
      "quantity": 2,
      "price": 80,
      "variant": "with-extra-ghee"
    }
  }'
```

**Apply Promo Code:**
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"action":"applyPromo","promoCode":"PG50"}'
```

**Get Cart:**
```bash
curl http://localhost:3000/api/cart
```

### Orders

**Create Order:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -b "cart_session=cart_1234567890_abc123"
```

**Get Order Details:**
```bash
curl http://localhost:3000/api/orders/order_123
```

**Update Order Status:**
```bash
curl -X PATCH http://localhost:3000/api/orders/order_123 \
  -H "Content-Type: application/json" \
  -d '{"status":"preparing","message":"Chef started cooking"}'
```

### Payments

**Create Payment:**
```bash
curl -X POST http://localhost:3000/api/payments/create \
  -H "Content-Type: application/json" \
  -d '{"amount":29900,"orderId":"order_123","userId":"user_456"}'
```

**Verify Payment:**
```bash
curl -X POST http://localhost:3000/api/payments/verify \
  -H "Content-Type: application/json" \
  -d '{
    "razorpayOrderId": "order_abc",
    "razorpayPaymentId": "pay_xyz",
    "razorpaySignature": "signature_hash",
    "orderId": "order_123"
  }'
```

### Delivery

**Book Delivery (Auto-select):**
```bash
curl -X POST http://localhost:3000/api/delivery/book \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "order_123",
    "customerAddress": {
      "address": "B-45, Green Park, Noida",
      "lat": 28.5355,
      "lng": 77.3910
    },
    "auto": true
  }'
```

---

## 🎯 Available Promo Codes

| Code | Discount | Min Order | Max Discount |
|------|----------|-----------|--------------|
| `PG50` | 50% off | ₹299 | ₹150 |
| `SOC50` | 50% off | ₹399 | ₹200 |
| `FIRST100` | Flat ₹100 off | ₹200 | ₹100 |
| `FREEDEL` | Free delivery | ₹299 | Delivery fee |
| `LITTI20` | 20% off | Any | ₹50 |

---

## 📱 WhatsApp Integration

### Setup Webhook
1. Go to Meta Developers Console
2. Add webhook URL: `https://yourdomain.com/api/whatsapp/webhook`
3. Set verify token: `swadika_webhook_token_2025`
4. Subscribe to `messages` events

### Test Incoming Message
```bash
curl -X POST http://localhost:3000/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "entry": [{
      "changes": [{
        "value": {
          "messages": [{
            "from": "919876543210",
            "type": "text",
            "text": {"body": "I want 2 Litti Chokha"}
          }]
        }
      }]
    }]
  }'
```

---

## 🗂️ Project Structure

```
swadika/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (16 endpoints)
│   │   ├── auth/          # Authentication
│   │   ├── cart/          # Cart management
│   │   ├── menu/          # Menu items
│   │   ├── orders/        # Order management
│   │   ├── payments/      # Razorpay integration
│   │   ├── delivery/      # Delivery providers
│   │   └── whatsapp/      # WhatsApp webhook
│   ├── admin/             # Admin dashboard (pending)
│   ├── menu/              # Menu page
│   ├── cart/              # Cart page
│   └── orders/            # Orders page
├── components/            # React components
├── context/               # React contexts (8 providers)
├── lib/
│   └── services/          # Backend services (7 services)
│       ├── menuService.ts
│       ├── cartService.ts
│       ├── paymentService.ts
│       ├── orderService.ts
│       ├── deliveryService.ts
│       ├── authService.ts
│       └── whatsappService.ts
└── public/               # Static assets
```

---

## 🔧 Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📊 Service Overview

### Menu Service
- 86+ menu items with variants
- Inventory management
- Photo gallery support
- Time-slot based availability

### Cart Service
- Session-based cart
- 5 promo codes configured
- Loyalty points integration
- GST & delivery fee calculation

### Payment Service
- Razorpay integration
- Signature verification
- Refund processing
- Loyalty points award

### Order Service
- 8 order statuses
- Real-time tracking
- Kitchen display
- Analytics dashboard

### Delivery Service
- 4 providers (Dunzo/Porter/Swiggy/Self)
- Auto-select best provider
- Live tracking
- Fare estimation

### Auth Service
- Phone OTP login
- Google OAuth
- Address management
- Loyalty & wallet

### WhatsApp Service
- Order confirmations
- Status updates
- Delivery tracking
- Promotional messages

---

## 🚨 Common Issues

### "Cannot find module" error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API route 404 error
- Make sure you're using Next.js 15
- Check file naming: `route.ts` not `index.ts`
- Restart dev server

### Session not persisting
- Check browser cookies
- Ensure httpOnly cookies enabled
- Check CORS settings

---

## 🎨 Frontend Integration

### Using Services in Pages

```typescript
'use client';
import { useState, useEffect } from 'react';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  return (
    <div>
      {menu.map(item => (
        <div key={item.id}>{item.name} - ₹{item.price}</div>
      ))}
    </div>
  );
}
```

### Adding to Cart

```typescript
async function addToCart(item) {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'add',
      item: {
        dishId: item.id,
        dishName: item.name,
        quantity: 1,
        price: item.price
      }
    })
  });
  
  const data = await res.json();
  console.log('Cart updated:', data);
}
```

### Creating Order

```typescript
async function checkout() {
  // 1. Create order
  const orderRes = await fetch('/api/orders', { method: 'POST' });
  const order = await orderRes.json();

  // 2. Create payment
  const paymentRes = await fetch('/api/payments/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: order.summary.total * 100, // in paise
      orderId: order.orderId,
      userId: user.id
    })
  });
  
  const payment = await paymentRes.json();

  // 3. Open Razorpay checkout
  const options = {
    key: payment.razorpayKeyId,
    amount: payment.amount,
    currency: 'INR',
    name: 'Swadika Delights',
    order_id: payment.razorpayOrderId,
    handler: async (response) => {
      // 4. Verify payment
      await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          orderId: order.orderId
        })
      });
    }
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
}
```

---

## 🔐 Security Checklist

- [ ] Set strong `SESSION_SECRET` in production
- [ ] Use production Razorpay keys (not test keys)
- [ ] Enable HTTPS in production
- [ ] Set `secure: true` for cookies in production
- [ ] Verify WhatsApp webhook signatures
- [ ] Rate limit API endpoints
- [ ] Sanitize user inputs
- [ ] Add CSRF protection
- [ ] Implement API authentication middleware
- [ ] Enable CORS only for trusted domains

---

## 📈 Next Steps

1. **Build Admin Dashboard** - `/app/admin/*` pages
2. **Add Analytics** - Install Chart.js and create dashboards
3. **Production Deployment** - Deploy to Vercel
4. **Database Integration** - Replace in-memory storage with MongoDB/PostgreSQL
5. **Real API Integration** - Connect Razorpay, WhatsApp, Delivery providers
6. **Testing** - Add Jest/Vitest tests
7. **Documentation** - API documentation with Swagger/OpenAPI

---

## 📞 Support

**Business Contact:**
- Phone: +91 9958382202
- Address: A-64, Himalaya Enclave, Khora Colony, Ghaziabad, UP 201309

**Technical Issues:**
- Check [BACKEND_IMPLEMENTATION_SUMMARY.md](BACKEND_IMPLEMENTATION_SUMMARY.md)
- Review service files in `/lib/services/`
- Test API endpoints with curl commands above

---

**Last Updated:** January 2025  
**Version:** 1.0.0 (Backend Complete - 80%)
