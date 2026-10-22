# 🚀 Complete Setup & Testing Guide - Guthali Naturals

## 📋 Table of Contents
1. [Initial Setup (Pehli Baar)](#initial-setup)
2. [Environment Variables](#environment-variables)
3. [Testing Kaise Karein](#testing-kaise-karein)
4. [Admin Dashboard Guide](#admin-dashboard-guide)
5. [Amazon/Flipkart Integration](#amazonflipkart-integration)
6. [Order Tracking System](#order-tracking-system)

---

## 1️⃣ Initial Setup (Pehli Baar)

### Step-by-Step Process:

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Environment File Setup
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local
notepad .env.local  # Windows
nano .env.local     # Mac/Linux
```

#### Step 3: Configure .env.local
```env
# Database (Development - SQLite)
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"  # Generate karna hoga!
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials (Change after first login!)
ADMIN_EMAIL="admin@guthalinaturals.com"
ADMIN_PASSWORD="admin123"

# Production Settings (Comment out for now)
# NODE_ENV="production"
```

#### Step 4: Generate NEXTAUTH_SECRET
```bash
# Windows (PowerShell)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Mac/Linux
openssl rand -base64 32

# Copy output and paste in .env.local
NEXTAUTH_SECRET="paste-here"
```

#### Step 5: Setup Database
```bash
# Run migrations (creates tables)
npm run db:migrate

# Seed initial data (creates admin user)
npm run db:seed
```

#### Step 6: Start Development Server
```bash
npm run dev
```

✅ **Ab aap ready hain!**
- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

---

## 2️⃣ Environment Variables (.env.local)

### ⚠️ IMPORTANT: Pehle Setup Zaruri Hai!

**Jawab**: **PEHLE .env.local setup karo, PHIR testing karo**

### Kyun?
1. ❌ Bina `.env.local` ke website crash hogi
2. ❌ Admin login nahi hoga
3. ❌ Database connect nahi hoga
4. ❌ Authentication kaam nahi karega

### Sahi Order:
```
1. .env.local file banao ✅
2. Environment variables set karo ✅
3. Database setup karo (migrate + seed) ✅
4. PHIR testing shuru karo ✅
```

### Production vs Development

#### Development (Local Testing):
```env
DATABASE_URL="file:./dev.db"  # SQLite - simple, local
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-for-testing"
```

#### Production (Live Website):
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="super-secure-32-character-random-string"
NODE_ENV="production"
```

---

## 3️⃣ Testing Kaise Karein

### Testing Checklist:

#### ✅ Step 1: Homepage Test
```
URL: http://localhost:3000
Check:
- Page load ho raha hai?
- Navbar dikh raha hai?
- Products dikh rahe hain?
- Footer sahi hai?
```

#### ✅ Step 2: Navigation Test
```
Test karo:
- About page
- Services page
- Products page
- Blog page
- Contact page
- FAQ page
```

#### ✅ Step 3: Admin Login Test
```
URL: http://localhost:3000/admin/login
Credentials:
Email: admin@guthalinaturals.com
Password: admin123

Expected: Redirect to /admin dashboard
```

#### ✅ Step 4: Admin Dashboard Test
```
Dashboard par check karo:
- Stats cards dikh rahe hain?
- Quick action buttons work kar rahe hain?
- Sidebar navigation working hai?
```

#### ✅ Step 5: Admin Features Test

**Products Management:**
1. Sidebar → Products click karo
2. "Add New Product" button click karo
3. Form fill karo:
   - Name, Price, Description
   - Category select karo
   - Amazon/Flipkart URLs add karo
   - Save karo
4. Product list mein dikhai dena chahiye

**Categories:**
1. Sidebar → Categories
2. Add new category
3. List mein check karo

**Blog Posts:**
1. Sidebar → Blog
2. Create new post
3. Title, content likhao
4. Publish karo

**Coupons:**
1. Sidebar → Coupons
2. Create coupon code
3. Set discount percentage
4. Set expiry date

---

## 4️⃣ Admin Dashboard Complete Guide

### Dashboard Features:

#### 📊 Main Dashboard (`/admin`)
- **Stats Cards**: Products, Posts, Messages, Coupons count
- **Recent Messages**: Latest 5 contact messages
- **Quick Actions**: Fast access buttons

#### 🛍️ Products (`/admin/products`)
**Kya Kar Sakte Hain:**
- ✅ All products list dekhna
- ✅ New product add karna
- ✅ Product edit karna
- ✅ Product delete karna
- ✅ Stock status toggle (In Stock / Out of Stock)
- ✅ Featured toggle karna

**Product Form Fields:**
```
Required:
- Product Name
- Slug (URL-friendly name)
- Description
- Price
- Category

Optional:
- MRP (Original Price)
- Image URL
- Amazon URL ⭐
- Flipkart URL ⭐
- Benefits
- Ingredients
- How to Use
- Featured (checkbox)
- In Stock (checkbox)
```

#### 📂 Categories (`/admin/categories`)
- ✅ Create categories
- ✅ Edit categories
- ✅ Delete categories
- ✅ View products count

#### 📝 Blog (`/admin/blog`)
- ✅ Write new posts
- ✅ Edit existing posts
- ✅ Publish/Unpublish
- ✅ Delete posts
- ✅ Add featured images

#### 🎨 Banners (`/admin/banners`)
- ✅ Create hero banners
- ✅ Set CTA text and links
- ✅ Manage banner order
- ✅ Toggle active status

#### 🎫 Coupons (`/admin/coupons`)
- ✅ Create discount codes
- ✅ Set discount percentage
- ✅ Set expiry dates
- ✅ Activate/Deactivate

#### ❓ FAQ (`/admin/faq`)
- ✅ Add questions & answers
- ✅ Reorder FAQs
- ✅ Edit/Delete

#### 💬 Messages (`/admin/messages`)
- ✅ View contact form submissions
- ✅ Mark as read/unread
- ✅ Delete messages

---

## 5️⃣ Amazon/Flipkart Integration

### Kaise Kaam Karta Hai:

#### Concept:
```
Aapki Website (Showcase) → Amazon/Flipkart (Actual Sales)
```

#### Flow:
```
1. User aapki website par product dekhta hai
2. "Buy on Amazon" ya "Buy on Flipkart" button click karta hai
3. Amazon/Flipkart ki site par redirect hota hai
4. Wahan se purchase karta hai
5. Amazon/Flipkart delivery handle karte hain
```

### Setup Steps:

#### Step 1: Amazon Affiliate Program
```
1. Amazon Associates join karo
2. Product search karo
3. Affiliate link generate karo
4. Admin panel mein paste karo
```

**Example Amazon URL:**
```
Original: https://www.amazon.in/product-name/dp/B08XYZ123
Affiliate: https://www.amazon.in/product-name/dp/B08XYZ123?tag=your-affiliate-id
```

#### Step 2: Flipkart Affiliate
```
1. Flipkart Affiliate Program join karo
2. Product link generate karo
3. Admin panel mein add karo
```

#### Step 3: Admin Panel Mein Add Karo
```
1. Go to: /admin/products
2. Click: "Add New Product" or Edit existing
3. Fields:
   - Amazon URL: [Paste affiliate link]
   - Flipkart URL: [Paste affiliate link]
4. Save
```

### Frontend Display:

Website par product page par:
```typescript
// Buy buttons automatically show
<BuyButton 
  amazonUrl={product.amazonUrl}
  flipkartUrl={product.flipkartUrl}
/>
```

User clicks → Redirect to Amazon/Flipkart

---

## 6️⃣ Order Tracking System

### ⚠️ IMPORTANT: Aapke Dashboard Mein Orders NAHI Dikhenge!

### Kyun?

**Current Setup:**
```
Your Website → Amazon/Flipkart (They handle orders)
```

Aap **Affiliate Seller** ho, not direct seller. Amazon/Flipkart orders handle karte hain.

### Sales Tracking Kaise Karein:

#### Method 1: Amazon Associates Dashboard
```
1. Login: https://affiliate.amazon.in
2. Reports section
3. Dekho:
   - Clicks kitne hue
   - Sales kitne hue
   - Commission kitna mila
```

#### Method 2: Flipkart Affiliate Dashboard
```
1. Login: Flipkart Affiliate portal
2. Analytics section
3. Sales reports dekho
```

#### Method 3: Google Analytics (Recommended)
```
1. Google Analytics setup karo
2. Track karo:
   - Product page visits
   - Buy button clicks
   - Exit to Amazon/Flipkart
```

### Agar Direct Selling Chahiye:

#### Option A: Add Payment Gateway
```
Features needed:
- Razorpay/Stripe integration
- Shopping cart
- Checkout page
- Order management system
- Inventory management
```

**Cost**: Development time + Payment gateway fees

#### Option B: WhatsApp Integration (Simple)
```
1. Add WhatsApp button
2. User clicks → WhatsApp chat opens
3. Manual order processing
4. Track in Excel/Google Sheets
```

**Example:**
```typescript
<a href="https://wa.me/919876543210?text=Hi, I want to order [Product Name]">
  Order via WhatsApp
</a>
```

---

## 7️⃣ Common Issues & Solutions

### Issue 1: Admin Buttons Not Working

**Check Karo:**
```bash
# 1. Server running hai?
npm run dev

# 2. Browser console check karo (F12)
# Koi error dikh raha hai?

# 3. Network tab check karo
# API calls ho rahe hain?

# 4. Try hard refresh
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### Issue 2: Login Nahi Ho Raha

**Solution:**
```bash
# 1. Check .env.local
cat .env.local

# 2. Reseed database
npm run db:seed

# 3. Clear browser cookies
# Browser settings → Clear browsing data

# 4. Restart server
# Ctrl+C to stop, then npm run dev
```

### Issue 3: Database Error

**Solution:**
```bash
# Fresh start
rm prisma/dev.db
npm run db:migrate
npm run db:seed
npm run dev
```

---

## 8️⃣ Quick Reference Commands

### Development:
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Run production build
npm run lint             # Check code quality
```

### Database:
```bash
npm run db:migrate       # Run migrations
npm run db:seed          # Seed data
npm run db:reset         # Reset database (⚠️ Deletes all data)
npm run db:studio        # Open database GUI
```

### Troubleshooting:
```bash
# Complete fresh start
rm -rf .next node_modules package-lock.json
rm prisma/dev.db
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

---

## 9️⃣ Testing Checklist

### Before Going Live:

- [ ] .env.local properly configured
- [ ] Database migrated and seeded
- [ ] Admin login working
- [ ] All admin pages accessible
- [ ] Products can be added/edited/deleted
- [ ] Categories management working
- [ ] Blog posts can be created
- [ ] Contact form submitting
- [ ] Amazon/Flipkart links working
- [ ] Mobile responsive
- [ ] All images loading
- [ ] No console errors
- [ ] Change default admin password
- [ ] Test on different browsers

---

## 🎯 Summary - Quick Start

### First Time Setup:
```bash
# 1. Install
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Generate secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Add to .env.local

# 4. Setup database
npm run db:migrate
npm run db:seed

# 5. Start
npm run dev
```

### Testing:
```
1. Visit: http://localhost:3000
2. Check all pages
3. Login: http://localhost:3000/admin/login
   Email: admin@guthalinaturals.com
   Password: admin123
4. Test admin features
```

### Production:
```
1. Read DEPLOYMENT.md
2. Complete PRODUCTION_CHECKLIST.md
3. Deploy to Vercel/Railway
```

---

## 📞 Need Help?

- **Setup Issues**: Check TROUBLESHOOTING.md
- **Admin Access**: Check ADMIN_ACCESS.md  
- **Deployment**: Check DEPLOYMENT.md
- **Security**: Check SECURITY.md

---

**Last Updated**: 2026-10-04  
**Version**: 1.0.0

---

**Sabse Important**: Pehle .env.local setup karo, phir testing! 🚀
