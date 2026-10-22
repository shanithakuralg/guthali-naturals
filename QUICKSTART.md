# 🚀 Quick Start Guide - Guthali Naturals

Get your development environment up and running in 5 minutes.

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git ([Download](https://git-scm.com/))

## 🏃 Quick Setup (5 Minutes)

### 1. Clone & Install (2 min)

```bash
# Clone the repository
git clone <your-repo-url>
cd Guthalinaturals

# Install dependencies
npm install
```

### 2. Environment Setup (1 min)

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local (use any text editor)
notepad .env.local  # Windows
nano .env.local     # Mac/Linux
```

**Quick Config** (keep defaults for now):
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="dev-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@guthalinaturals.com"
ADMIN_PASSWORD="admin123"
```

### 3. Database Setup (1 min)

```bash
# Run migrations and seed data
npm run db:migrate
npm run db:seed
```

### 4. Start Development Server (1 min)

```bash
npm run dev
```

**🎉 Done!** Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Access Points

### Public Site
- **Homepage**: http://localhost:3000
- **Products**: http://localhost:3000/products
- **Blog**: http://localhost:3000/blog
- **Contact**: http://localhost:3000/contact

### Admin Panel
- **Login**: http://localhost:3000/admin/login
- **Email**: `admin@guthalinaturals.com`
- **Password**: `admin123`

After login, you'll have access to:
- Dashboard (analytics)
- Products management
- Categories
- Blog posts
- Coupons & banners
- Messages & FAQs

---

## 📊 Database Management

### View Database (GUI)
```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555

### Reset Database (if needed)
```bash
npm run db:reset
# ⚠️ This deletes all data and re-seeds
```

### Create New Migration
```bash
# After changing schema.prisma
npm run db:migrate
```

---

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Run production build
npm run lint             # Check code quality
npm run type-check       # Check TypeScript

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed data
npm run db:studio        # Database GUI
npm run db:reset         # Reset database

# Production
npm run prod:build       # Full production build with checks
npm run prod:setup       # Setup production database
```

---

## 📝 What's Included

### Sample Data (from seed)
- ✅ Admin user (login credentials above)
- ✅ 4 product categories
- ✅ 8 sample products
- ✅ 3 blog posts
- ✅ 5 FAQ items
- ✅ 1 hero banner
- ✅ 2 sample coupons

### Features Ready to Use
- 🛍️ Product catalog with categories
- 📝 Blog system
- 💬 Contact form
- ❓ FAQ section
- 🎫 Coupon management
- 🖼️ Banner management
- 📊 Analytics dashboard (admin)
- 🔐 Secure authentication

---

## 🎨 Customization Quick Tips

### Update Brand Colors
**File**: `tailwind.config.ts`

```typescript
colors: {
  brand: {
    green: '#2C4A2E',    // Primary color
    gold: '#B8973E',     // Accent
    cream: '#F2EBE0',    // Background
    olive: '#8B9A5E',    // Secondary
  }
}
```

### Update Site Name
**File**: `src/lib/constants.ts`

```typescript
export const APP_NAME = 'Your Brand Name';
export const APP_DESCRIPTION = 'Your description';
```

### Add Your Logo
Replace `public/logo.jpeg` with your logo (keep same filename or update references)

### Update Contact Info
**File**: `src/lib/constants.ts`

```typescript
export const CONTACT_EMAIL = 'your@email.com';
export const CONTACT_PHONE = '+91-XXXXXXXXXX';
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Database Locked Error
```bash
# Close all database connections and reset
npm run db:reset
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Prisma Client Errors
```bash
# Regenerate Prisma Client
npx prisma generate
```

---

## 📚 Next Steps

1. **Explore the Code**
   - `src/app` - Pages and routes
   - `src/components` - Reusable components
   - `prisma/schema.prisma` - Database schema

2. **Add Your Products**
   - Login to admin panel
   - Navigate to Products
   - Click "Add New Product"

3. **Customize Design**
   - Edit components in `src/components`
   - Modify styles in `tailwind.config.ts`
   - Update global CSS in `src/styles/globals.css`

4. **Read Documentation**
   - [README.md](README.md) - Full documentation
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
   - [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) - Pre-launch checklist

---

## 💡 Pro Tips

- **Auto-save in Database**: Use Prisma Studio for quick edits
- **Component Preview**: Check `src/components/ui` for reusable components
- **API Routes**: All in `src/app/api` - easy to test with tools like Postman
- **Type Safety**: TypeScript helps catch errors early - use it!
- **Git**: Commit often, use meaningful commit messages

---

## 🤝 Need Help?

- Check the [README.md](README.md) for detailed docs
- Review error messages carefully (they're usually helpful!)
- Check the console in your browser (F12)
- Review the terminal output

---

## ✨ You're All Set!

Start building your natural products business with Guthali Naturals. Happy coding! 🌿

**Useful Links**:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
