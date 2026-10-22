# 🚀 Deployment Guide - Guthali Naturals

Complete guide to deploy your application to production.

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change `NEXTAUTH_SECRET` to a strong random string (at least 32 characters)
- [ ] Update `ADMIN_PASSWORD` to a strong, unique password
- [ ] Remove or secure `.env.local` (never commit to Git)
- [ ] Review and update CORS settings if needed
- [ ] Enable HTTPS in production
- [ ] Set `NODE_ENV=production`

### Database
- [ ] Migrate from SQLite to PostgreSQL for production
- [ ] Run all migrations: `npx prisma migrate deploy`
- [ ] Test database connection
- [ ] Set up automated backups
- [ ] Create database user with limited permissions

### Configuration
- [ ] Update `NEXTAUTH_URL` to your production domain
- [ ] Configure environment variables on hosting platform
- [ ] Set up custom domain (if applicable)
- [ ] Configure email service (if needed)
- [ ] Update social media links in constants

### Testing
- [ ] Run `npm run build` locally to check for build errors
- [ ] Test all critical user flows
- [ ] Verify admin panel authentication
- [ ] Test API endpoints
- [ ] Check responsive design on mobile devices

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

#### Step 1: Prepare Your Repository
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Step 3: Add Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXTAUTH_SECRET=your-super-secret-random-string-32-chars-min
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@guthalinaturals.com
ADMIN_PASSWORD=your-secure-admin-password
NODE_ENV=production
```

#### Step 4: Add PostgreSQL Database
**Option A: Vercel Postgres (Recommended)**
1. In your project → Storage → Create Database
2. Select Postgres
3. Copy the `DATABASE_URL` to environment variables

**Option B: External PostgreSQL (Supabase, Railway, etc.)**
1. Create a PostgreSQL database on your preferred provider
2. Copy connection string to `DATABASE_URL`

#### Step 5: Run Database Migrations
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link your project
vercel link

# Run migrations
vercel env pull .env.production
npx prisma migrate deploy
npx prisma generate
```

#### Step 6: Deploy
```bash
vercel --prod
```

Your site will be live at `https://your-project.vercel.app`

---

### Option 2: Railway

#### Step 1: Create Account
1. Go to [railway.app](https://railway.app) and sign up
2. Create new project from GitHub repo

#### Step 2: Add PostgreSQL
1. In your project → New → Database → PostgreSQL
2. Copy the connection string

#### Step 3: Configure Environment
1. Go to your service settings
2. Add environment variables:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app.up.railway.app
ADMIN_EMAIL=admin@guthalinaturals.com
ADMIN_PASSWORD=your-secure-password
NODE_ENV=production
```

#### Step 4: Deploy
Railway will automatically deploy. Run migrations:

```bash
# In Railway terminal or locally with production DATABASE_URL
npx prisma migrate deploy
```

---

### Option 3: Render

#### Step 1: Create Web Service
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect your GitHub repository

#### Step 2: Configure Service
- **Name**: guthali-naturals
- **Environment**: Node
- **Build Command**: `npm install && npm run build && npx prisma generate`
- **Start Command**: `npm start`

#### Step 3: Add PostgreSQL
1. New → PostgreSQL
2. Connect to your web service

#### Step 4: Environment Variables
```env
DATABASE_URL=your-postgres-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-app.onrender.com
ADMIN_EMAIL=admin@guthalinaturals.com
ADMIN_PASSWORD=your-secure-password
NODE_ENV=production
```

---

## 🗄️ Database Migration Strategy

### From SQLite to PostgreSQL

1. **Export SQLite data** (if you have existing data):
```bash
npm install -g prisma-client
npx prisma db pull
npx prisma db seed
```

2. **Update schema** (if needed for PostgreSQL):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. **Create production database**:
```bash
# Set production DATABASE_URL
export DATABASE_URL="postgresql://..."

# Run migrations
npx prisma migrate deploy

# Generate client
npx prisma generate

# Seed database (creates admin user)
npm run db:seed
```

---

## 🔐 Generating Secure Secrets

### NEXTAUTH_SECRET
```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online
# Visit: https://generate-secret.vercel.app/32
```

### Admin Password
Use a password manager to generate a strong password (minimum 16 characters, mix of letters, numbers, symbols).

---

## 🌍 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown:
   - Type: `A` or `CNAME`
   - Value: Provided by Vercel

### Update Environment
```env
NEXTAUTH_URL=https://www.guthalinaturals.com
```

---

## 📊 Monitoring & Analytics

### Add Monitoring Tools

1. **Vercel Analytics** (Automatic on Vercel)

2. **Google Analytics**:
```typescript
// src/app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
```

3. **Sentry for Error Tracking**:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test # if you have tests
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check database is accessible from deployment server
- Ensure SSL mode is correct for PostgreSQL

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain exactly
- Ensure cookies are enabled

### Image Loading Issues
- Verify image URLs are accessible
- Check Next.js Image configuration in `next.config.js`
- Add domains to `remotePatterns`

---

## 📈 Post-Deployment

### Immediate Actions
1. Test the live site thoroughly
2. Verify admin login works
3. Test product creation and management
4. Check all forms (contact, etc.)
5. Test mobile responsiveness

### Ongoing Maintenance
- Set up automated database backups
- Monitor error logs regularly
- Keep dependencies updated: `npm update`
- Review security advisories: `npm audit`
- Monitor performance metrics

### Performance Optimization
- Enable Vercel Analytics
- Set up CDN for images
- Implement caching strategies
- Monitor Core Web Vitals

---

## 🆘 Getting Help

If you encounter issues:
1. Check deployment logs in your hosting platform
2. Review error messages in browser console
3. Verify all environment variables are set
4. Test database connectivity
5. Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

---

## 📝 Post-Deployment Checklist

- [ ] Site is accessible at production URL
- [ ] HTTPS is working (SSL certificate)
- [ ] Admin panel login works
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Mobile responsive design works
- [ ] SEO meta tags are correct
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`
- [ ] Analytics tracking is active
- [ ] Error monitoring is set up

---

**Congratulations! Your Guthali Naturals site is now live! 🎉**
