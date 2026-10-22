# 🔧 Troubleshooting Guide - Guthali Naturals

Common issues and their solutions.

---

## 🚨 Build & Runtime Errors

### 1. Missing Icon Import Error
**Error**: `BarChart3 is not defined` or similar icon errors

**Solution**:
```typescript
// Add the missing icon to the import statement
import { Package, FileText, BarChart3 } from 'lucide-react';
```

**Location**: Check the file mentioned in error (e.g., `src/app/admin/page.tsx`)

---

### 2. Database Field Name Errors
**Error**: `Invalid prisma.model.findMany() invocation` with field not found

**Common Issues**:
- `isActive` should be `active`
- `isFeatured` should be `featured`
- `order` should be `sortOrder`
- `isPublished` should be `published`

**Solution**:
Check `prisma/schema.prisma` for correct field names and update your queries.

---

### 3. Module Not Found Errors
**Error**: `Cannot find module '@/lib/utils'`

**Solution**:
```bash
# Make sure the file exists
ls src/lib/utils.ts

# If missing, create it with basic utilities
```

---

### 4. Type Errors with Prisma
**Error**: `Property 'post' does not exist on type 'PrismaClient'`

**Solution**:
```bash
# Regenerate Prisma Client
npx prisma generate

# Restart dev server
npm run dev
```

---

## 🗄️ Database Issues

### 1. Database Connection Error
**Error**: `Can't reach database server`

**Solution**:
```bash
# Check if DATABASE_URL is set in .env.local
cat .env.local

# For development (SQLite)
DATABASE_URL="file:./dev.db"

# Regenerate and migrate
npx prisma generate
npm run db:migrate
```

---

### 2. Database Locked Error
**Error**: `database is locked`

**Solution**:
```bash
# Close all connections (Prisma Studio, other terminals)
# Then reset database
npm run db:reset

# Or just migrate fresh
rm prisma/dev.db
npm run db:migrate
npm run db:seed
```

---

### 3. Migration Errors
**Error**: `Migration failed to apply`

**Solution**:
```bash
# Reset database and start fresh
npm run db:reset

# Or manually
rm -rf prisma/migrations
rm prisma/dev.db
npm run db:migrate
npm run db:seed
```

---

### 4. No Admin User After Seeding
**Problem**: Can't login to admin panel

**Solution**:
```bash
# Check if admin exists
npm run db:studio
# Open Admin table and verify

# If not exists, reseed
npm run db:seed

# Verify credentials
# Email: admin@guthalinaturals.com
# Password: admin123
```

---

## 🔐 Authentication Issues

### 1. Session Not Found
**Error**: `Session not found` or redirect loop

**Solution**:
1. Check `.env.local` file exists
2. Verify `NEXTAUTH_SECRET` is set:
```bash
# Generate new secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

3. Restart server:
```bash
npm run dev
```

---

### 2. Invalid Credentials Error
**Problem**: Can't login with correct credentials

**Solution**:
1. Verify admin user exists in database
2. Check password in `.env.local` matches what was used during seeding
3. Try resetting:
```bash
npm run db:seed
```

---

### 3. Logout Doesn't Work
**Problem**: Still logged in after clicking logout

**Solution**:
1. Clear browser cookies
2. Clear localStorage:
```javascript
// In browser console
localStorage.clear()
sessionStorage.clear()
```

3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## 🚀 Performance Issues

### 1. Slow Page Loading
**Problem**: Pages taking too long to load

**Solutions**:
1. **Check database queries**:
```typescript
// Add limits to queries
prisma.product.findMany({
  take: 10 // Limit results
})
```

2. **Enable revalidation**:
```typescript
export const revalidate = 3600; // Cache for 1 hour
```

3. **Optimize images**:
```typescript
// Use Next.js Image component
<Image 
  src={image} 
  alt={alt}
  width={400}
  height={300}
  priority // For above-fold images
/>
```

---

### 2. Build Takes Too Long
**Problem**: `npm run build` is slow

**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules/.cache
npm run build
```

---

### 3. Dev Server Slow to Start
**Problem**: `npm run dev` takes forever

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules cache
rm -rf node_modules/.cache

# Restart
npm run dev
```

---

## 📦 Dependency Issues

### 1. Package Installation Errors
**Error**: `npm install` fails

**Solution**:
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### 2. Version Conflicts
**Error**: Dependency version mismatch

**Solution**:
```bash
# Update all packages
npm update

# Or specific package
npm install package-name@latest

# Check for outdated
npm outdated
```

---

### 3. Missing Peer Dependencies
**Warning**: Peer dependency missing

**Solution**:
```bash
# Install missing peer dependencies
npm install --save-dev missing-package

# Or use legacy peer deps
npm install --legacy-peer-deps
```

---

## 🎨 UI/Styling Issues

### 1. Tailwind Styles Not Working
**Problem**: Classes not applying

**Solution**:
1. Check `tailwind.config.ts` includes your files:
```typescript
content: [
  './src/**/*.{js,ts,jsx,tsx}',
],
```

2. Restart dev server:
```bash
npm run dev
```

---

### 2. Custom Colors Not Working
**Problem**: Brand colors not showing

**Solution**:
Check `tailwind.config.ts` has colors defined:
```typescript
colors: {
  brand: {
    green: '#2C4A2E',
    gold: '#B8973E',
    // ...
  }
}
```

---

### 3. Fonts Not Loading
**Problem**: Custom fonts not displaying

**Solution**:
1. Check font imports in layout:
```typescript
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

2. Apply in className:
```typescript
<body className={inter.className}>
```

---

## 🌐 API Route Issues

### 1. 404 on API Routes
**Error**: `404 Not Found` for `/api/products`

**Solution**:
1. Check file exists: `src/app/api/products/route.ts`
2. Verify export:
```typescript
export async function GET(request: NextRequest) {
  // ...
}
```

3. Restart server

---

### 2. CORS Errors
**Error**: `CORS policy: No 'Access-Control-Allow-Origin'`

**Solution**:
Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ];
}
```

---

### 3. 500 Internal Server Error
**Error**: API returns 500

**Solution**:
1. Check server logs in terminal
2. Add error logging:
```typescript
try {
  // your code
} catch (error) {
  console.error('API Error:', error);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
```

3. Check database connection
4. Verify environment variables

---

## 🔄 Development Workflow

### 1. Hot Reload Not Working
**Problem**: Changes not reflecting

**Solution**:
1. Restart dev server
2. Hard refresh browser: `Ctrl+Shift+R`
3. Check if file is saved
4. Clear browser cache

---

### 2. TypeScript Errors in IDE
**Problem**: Red squiggles but code works

**Solution**:
```bash
# Regenerate types
npm run type-check

# For Prisma types
npx prisma generate

# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

---

### 3. Git Issues
**Problem**: Can't commit or push

**Solution**:
```bash
# Check git status
git status

# If .env.local is tracked (DON'T COMMIT!)
git rm --cached .env.local

# Add to .gitignore
echo ".env.local" >> .gitignore

# Commit
git add .
git commit -m "Your message"
git push
```

---

## 🚢 Deployment Issues

### 1. Build Fails on Vercel
**Error**: Build fails in deployment

**Solution**:
1. Check build locally:
```bash
npm run build
```

2. Fix any errors shown
3. Ensure environment variables are set in Vercel dashboard
4. Check Node version matches (18+)

---

### 2. Database Connection in Production
**Error**: Can't connect to database

**Solution**:
1. Ensure `DATABASE_URL` is set in production env vars
2. For PostgreSQL, include `?sslmode=require`
3. Run migrations:
```bash
npx prisma migrate deploy
```

---

### 3. Images Not Loading
**Problem**: Images work locally but not in production

**Solution**:
1. Check `next.config.js` has domain in `remotePatterns`
2. Use Next.js Image component
3. Verify image URLs are accessible

---

## 📱 Mobile/Browser Issues

### 1. Doesn't Work on Mobile
**Problem**: Site broken on mobile

**Solution**:
1. Check responsive classes:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

2. Test in browser dev tools (F12 -> Toggle Device Toolbar)
3. Check viewport meta tag in layout

---

### 2. Works in Chrome but not Safari
**Problem**: Browser-specific issues

**Solution**:
1. Check for browser-specific CSS
2. Test in multiple browsers
3. Use autoprefixer (already included)
4. Avoid browser-specific features

---

## 🆘 Getting More Help

### Check Documentation
1. [README.md](README.md) - Setup & features
2. [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
3. [SECURITY.md](SECURITY.md) - Security best practices
4. [ADMIN_ACCESS.md](ADMIN_ACCESS.md) - Admin dashboard

### Common Commands
```bash
# Fresh start
rm -rf .next node_modules package-lock.json
npm install
npm run dev

# Database fresh start
rm prisma/dev.db
npm run db:migrate
npm run db:seed

# Build test
npm run build
npm run start

# Check for errors
npm run lint
npm run type-check
```

### Still Stuck?
1. Check error message carefully
2. Google the exact error
3. Check Next.js docs: https://nextjs.org/docs
4. Check Prisma docs: https://www.prisma.io/docs
5. Look at closed issues on GitHub

---

## ✅ Prevention Tips

### Best Practices:
- ✅ Always restart server after schema changes
- ✅ Run `npx prisma generate` after schema updates
- ✅ Keep dependencies updated
- ✅ Don't commit `.env.local` or `dev.db`
- ✅ Test locally before deploying
- ✅ Use TypeScript for type safety
- ✅ Handle errors gracefully with try-catch
- ✅ Check browser console for client-side errors
- ✅ Check terminal for server-side errors

---

**Last Updated**: 2026-10-04  
**Version**: 1.0.0
