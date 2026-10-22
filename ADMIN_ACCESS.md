# 🔐 Admin Dashboard Access Guide

## Admin Panel Login

### Development Environment

**URL**: `http://localhost:3000/admin/login`

**Default Credentials** (Change immediately!):
```
Email: admin@guthalinaturals.com
Password: admin123
```

⚠️ **IMPORTANT**: Change the default password before deploying to production!

---

## How to Access Admin Dashboard

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Navigate to Admin Login
Open your browser and go to:
```
http://localhost:3000/admin/login
```

### Step 3: Enter Credentials
- **Email**: `admin@guthalinaturals.com`
- **Password**: `admin123`

### Step 4: Access Dashboard
After successful login, you'll be redirected to:
```
http://localhost:3000/admin
```

---

## Admin Dashboard Features

### 📊 Dashboard Overview
- Total products, categories, blog posts
- Recent activity stats
- Quick access to all sections

### 🛍️ Products Management
**URL**: `http://localhost:3000/admin/products`
- View all products
- Add new products
- Edit existing products
- Delete products
- Toggle stock status
- Manage featured products

### 📂 Categories
**URL**: `http://localhost:3000/admin/categories`
- Create categories
- Edit category details
- Delete categories
- View products in each category

### 📝 Blog Posts
**URL**: `http://localhost:3000/admin/blog`
- Write new blog posts
- Edit existing posts
- Publish/unpublish posts
- Delete posts

### 🎨 Banners
**URL**: `http://localhost:3000/admin/banners`
- Create hero banners
- Edit banner content
- Manage banner order
- Toggle active status

### 🎫 Coupons
**URL**: `http://localhost:3000/admin/coupons`
- Create discount coupons
- Set discount percentages
- Set expiry dates
- Activate/deactivate coupons

### ❓ FAQ Management
**URL**: `http://localhost:3000/admin/faq`
- Add new FAQs
- Edit questions and answers
- Reorder FAQs
- Delete FAQs

### 💬 Messages
**URL**: `http://localhost:3000/admin/messages`
- View contact form submissions
- Mark messages as read
- Reply to customers (future feature)
- Delete messages

### 📈 Analytics
**URL**: `http://localhost:3000/admin/analytics`
- View site statistics
- Product performance
- Traffic data
- Sales insights

---

## Changing Admin Password

### Method 1: Using Prisma Studio (Easiest)

1. Open Prisma Studio:
```bash
npm run db:studio
```

2. Navigate to `Admin` table
3. Find your admin user
4. Click on the `passwordHash` field
5. Generate new hash:

**Generate Password Hash** (in a new terminal):
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourNewPassword', 10));"
```

6. Replace the `passwordHash` with the new hash
7. Save changes

### Method 2: Via Environment Variables (For New Setup)

1. Edit `.env.local`:
```env
ADMIN_EMAIL="admin@guthalinaturals.com"
ADMIN_PASSWORD="your-new-secure-password"
```

2. Reset and reseed database:
```bash
npm run db:reset
```

⚠️ **WARNING**: This will delete all data and recreate the database!

### Method 3: Create New Admin Script

Create a file `scripts/create-admin.ts`:

```typescript
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'newemail@example.com';
  const password = 'your-secure-password';
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      name: 'Admin User',
    },
  });

  console.log('Admin created:', admin.email);
}

createAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run it:
```bash
npx tsx scripts/create-admin.ts
```

---

## Production Admin Setup

### Before Deployment

1. **Generate Strong Password**:
```bash
# Use a password manager to generate a 20+ character password
```

2. **Update Environment Variables**:
```env
ADMIN_EMAIL="your-secure-email@company.com"
ADMIN_PASSWORD="your-very-strong-password-here"
```

3. **Deploy and Seed**:
```bash
npm run prod:setup
```

### Security Best Practices

✅ **DO**:
- Use strong passwords (20+ characters)
- Use unique emails
- Enable 2FA (future feature)
- Change password regularly
- Use HTTPS in production
- Limit admin access
- Monitor login attempts

❌ **DON'T**:
- Use default credentials
- Share admin credentials
- Use simple passwords
- Store passwords in plain text
- Commit .env files to Git
- Access admin over HTTP

---

## Troubleshooting Admin Access

### Problem: "Invalid credentials" error

**Solutions**:
1. Verify email and password are correct
2. Check if admin user exists in database:
```bash
npm run db:studio
# Open Admin table and verify user
```

3. If no admin exists, reseed database:
```bash
npm run db:seed
```

### Problem: Redirected to login after successful login

**Solutions**:
1. Clear browser cookies and cache
2. Check `NEXTAUTH_SECRET` is set in `.env.local`
3. Verify `NEXTAUTH_URL` matches your current URL
4. Restart dev server:
```bash
# Stop server (Ctrl+C) and restart
npm run dev
```

### Problem: "Session not found" error

**Solutions**:
1. Check `.env.local` file exists
2. Verify `NEXTAUTH_SECRET` is set:
```env
NEXTAUTH_SECRET="your-secret-key-here"
```

3. Generate new secret:
```bash
openssl rand -base64 32
```

4. Restart server

### Problem: Can't access admin routes

**Solutions**:
1. Ensure you're logged in
2. Check middleware configuration
3. Verify admin routes are not returning 404
4. Check browser console for errors

---

## Admin Session Management

### Session Duration
- Default: 30 days
- Configurable in `src/lib/auth.ts`

### Session Expiry
- Sessions expire after inactivity
- You'll be redirected to login
- No data is lost

### Logout
Click "Logout" in admin sidebar or navigate to:
```
http://localhost:3000/api/auth/signout
```

---

## Multiple Admin Users (Future)

Currently, the system supports one admin user. To add more admins:

1. Create database migration to support multiple admins
2. Add admin management UI
3. Implement role-based access control (RBAC)

---

## Quick Reference

| Action | URL | Method |
|--------|-----|--------|
| Login Page | `/admin/login` | GET |
| Login Action | `/api/auth/signin/credentials` | POST |
| Dashboard | `/admin` | GET |
| Logout | `/api/auth/signout` | POST |
| Products | `/admin/products` | GET |
| Categories | `/admin/categories` | GET |
| Blog | `/admin/blog` | GET |
| Banners | `/admin/banners` | GET |
| Coupons | `/admin/coupons` | GET |
| FAQ | `/admin/faq` | GET |
| Messages | `/admin/messages` | GET |
| Analytics | `/admin/analytics` | GET |

---

## Need Help?

- Check [README.md](README.md) for general setup
- Check [SECURITY.md](SECURITY.md) for security best practices
- Review [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues

---

**Last Updated**: 2026-10-04  
**Version**: 1.0.0
