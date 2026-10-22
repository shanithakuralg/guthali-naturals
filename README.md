<<<<<<< HEAD
# Guthali Naturals - Natural & Ayurvedic E-Commerce Platform

A modern, production-ready e-commerce platform for natural, ayurvedic, and herbal products built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## 🌿 Features

- **Product Management**: Full CRUD operations for products with categories, pricing, and inventory
- **Premium UI/UX**: Modern, professional design with custom branding and smooth animations
- **Admin Dashboard**: Secure admin panel with analytics, orders, and content management
- **Blog System**: SEO-friendly blog with rich content management
- **Contact & FAQ**: Customer communication and frequently asked questions
- **Banner Management**: Dynamic hero banners with CTAs
- **Coupon System**: Discount codes and promotional campaigns
- **Responsive Design**: Mobile-first, fully responsive UI with premium feel
- **Performance Optimized**: Static Site Generation (SSG), caching, and optimized queries
- **SEO Ready**: Meta tags, sitemaps, robots.txt, and Open Graph support
- **Authentication**: Secure admin authentication with NextAuth.js

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (dev) / PostgreSQL (production recommended)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Guthalinaturals
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="generate-a-secure-random-string-here"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@guthalinaturals.com"
ADMIN_PASSWORD="your-secure-password"
```

4. **Initialize the database**
```bash
npm run db:migrate
npm run db:seed
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Commands

```bash
# Run migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed

# Reset database (WARNING: Deletes all data)
npm run db:reset

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (Database GUI)
npx prisma studio
```

## 🔐 Admin Access

After seeding, access the admin panel at:
- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: The email from your `.env.local` ADMIN_EMAIL
- Password: The password from your `.env.local` ADMIN_PASSWORD

## 🚢 Production Deployment

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_SECRET="super-secure-random-string-at-least-32-characters"
NEXTAUTH_URL="https://yourdomain.com"
NODE_ENV="production"
```

### Deployment Platforms

#### Vercel (Recommended)
1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

#### Railway / Render
1. Connect your repository
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy

### Database Migration for Production

```bash
# Set production DATABASE_URL, then run:
npx prisma migrate deploy
npx prisma generate
```

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts            # Seed data
├── public/                # Static assets
├── src/
│   ├── app/              # Next.js app router
│   │   ├── admin/        # Admin dashboard
│   │   ├── api/          # API routes
│   │   └── (pages)/      # Public pages
│   ├── components/       # React components
│   │   ├── admin/        # Admin-specific components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utilities and configurations
│   └── styles/           # Global styles
└── package.json
```

## 🔒 Security Checklist

- [x] Secure authentication with bcrypt password hashing
- [x] Environment variables for sensitive data
- [x] Session-based JWT authentication
- [ ] Rate limiting for API routes (implement in production)
- [ ] CORS configuration
- [ ] Input validation and sanitization
- [ ] SQL injection protection (via Prisma)
- [ ] XSS protection

## 🎨 Customization

### Brand Colors (tailwind.config.ts)
- Green: `#2C4A2E` (Primary)
- Gold: `#B8973E` (Accent)
- Cream: `#F2EBE0` (Background)
- Olive: `#8B9A5E` (Secondary)

### Fonts
- Sans: Inter
- Serif: Playfair Display

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database
npm run db:reset     # Reset database
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure DATABASE_URL is correctly set
- Run `npx prisma generate` after schema changes
- Check file permissions for SQLite database

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Verify TypeScript: `npm run lint`

## 📈 Performance Optimizations

- Image optimization with Next.js Image component
- Static generation for product and blog pages
- API route caching strategies
- Lazy loading for components
- Font optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 💬 Support

For support, email support@guthalinaturals.com

---

Built with ❤️ by Guthali Naturals Team
=======
# guthali-naturals
website for testing purpose
>>>>>>> 2200723a474cc3b0be923c4b388c29c830a4b205
