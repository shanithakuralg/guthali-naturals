# 🔒 Production Checklist - Guthali Naturals

## ✅ Critical (Must Complete Before Going Live)

### Environment & Security
- [ ] **Generate strong `NEXTAUTH_SECRET`** (32+ characters)
  ```bash
  openssl rand -base64 32
  ```
- [ ] **Change admin password** from default (`admin123`)
- [ ] **Set `NODE_ENV=production`** in hosting environment
- [ ] **Update `NEXTAUTH_URL`** to production domain
- [ ] **Remove/secure `.env.local`** (never commit to Git)
- [ ] **Verify `.gitignore`** includes all sensitive files
- [ ] **Review environment variables** - no hardcoded secrets in code

### Database
- [ ] **Migrate to PostgreSQL** (SQLite is for development only)
- [ ] **Run production migrations**: `npx prisma migrate deploy`
- [ ] **Test database connection** from production server
- [ ] **Set up automated backups** (daily minimum)
- [ ] **Seed production database**: `npm run db:seed`
- [ ] **Verify admin user created** and can login

### Build & Deploy
- [ ] **Test production build locally**: `npm run build && npm start`
- [ ] **Fix all TypeScript errors**: `npm run lint`
- [ ] **Check for console errors** in browser
- [ ] **Verify all API routes** return correct responses
- [ ] **Test all forms** (contact, search, etc.)

### Domain & SSL
- [ ] **Configure custom domain** (if applicable)
- [ ] **Verify HTTPS/SSL** is working
- [ ] **Update CORS settings** (if needed)
- [ ] **Test site on mobile devices**

---

## 🎯 High Priority (Complete Soon After Launch)

### SEO & Analytics
- [ ] **Verify `/sitemap.xml`** is accessible
- [ ] **Verify `/robots.txt`** is accessible
- [ ] **Submit sitemap** to Google Search Console
- [ ] **Set up Google Analytics** (or alternative)
- [ ] **Add structured data** for products
- [ ] **Test meta tags** with social media debuggers
  - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Performance
- [ ] **Run Lighthouse audit** (aim for 90+ scores)
- [ ] **Test page load speed** on slow connections
- [ ] **Optimize images** (compression, proper formats)
- [ ] **Enable caching** headers
- [ ] **Monitor Core Web Vitals**

### Monitoring & Errors
- [ ] **Set up error monitoring** (Sentry, LogRocket, etc.)
- [ ] **Configure uptime monitoring** (UptimeRobot, Pingdom)
- [ ] **Test health endpoint**: `/api/health`
- [ ] **Set up alerts** for critical errors
- [ ] **Review production logs** regularly

### Content & Design
- [ ] **Add real product images** (replace placeholders)
- [ ] **Write product descriptions**
- [ ] **Create initial blog posts** (3-5 minimum)
- [ ] **Add company information** (About page)
- [ ] **Update contact information** (email, phone)
- [ ] **Add social media links** in footer
- [ ] **Create favicon** and app icons
- [ ] **Test all links** (no 404 errors)

---

## 🔧 Medium Priority (Within First Month)

### Features & Functionality
- [ ] **Set up email service** for contact form
- [ ] **Add email notifications** for admin (new orders, messages)
- [ ] **Implement search functionality**
- [ ] **Add product filtering** (by category, price)
- [ ] **Create coupon management** workflow
- [ ] **Add product reviews** (if planned)

### Marketing
- [ ] **Create social media accounts**
- [ ] **Set up Facebook Pixel** (if using Facebook ads)
- [ ] **Add WhatsApp business integration**
- [ ] **Create email newsletter** signup
- [ ] **Prepare launch announcement**

### Legal & Compliance
- [ ] **Add Privacy Policy** page
- [ ] **Add Terms of Service** page
- [ ] **Add Refund/Return Policy** page
- [ ] **Add Cookie consent** banner (if in EU)
- [ ] **Verify GDPR compliance** (if applicable)
- [ ] **Add shipping information** page

---

## 📊 Testing Checklist

### Functional Testing
- [ ] **User Registration/Login** (if applicable)
- [ ] **Admin Login** (`/admin/login`)
- [ ] **Product Creation** (admin panel)
- [ ] **Product Editing/Deletion**
- [ ] **Category Management**
- [ ] **Blog Post Creation**
- [ ] **Contact Form Submission**
- [ ] **Search Functionality**
- [ ] **Buy Button Links** (Amazon/Flipkart)

### Cross-Browser Testing
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (Desktop & Mobile)
- [ ] Firefox
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667, 414x896)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Sufficient color contrast
- [ ] Alt text for images
- [ ] Form labels present

---

## 🔐 Security Audit

### Authentication & Authorization
- [ ] **Admin routes protected** (middleware working)
- [ ] **Session timeout** configured appropriately
- [ ] **Password hashing** (bcrypt) working
- [ ] **No sensitive data** in client-side code
- [ ] **API routes secured** (authentication required)

### Data Protection
- [ ] **SQL injection protected** (using Prisma)
- [ ] **XSS protection** implemented
- [ ] **CSRF protection** (NextAuth handles this)
- [ ] **Rate limiting** on API routes (recommended)
- [ ] **Input validation** on all forms

### Infrastructure
- [ ] **HTTPS enabled** everywhere
- [ ] **Security headers** configured
- [ ] **Database credentials** secured
- [ ] **No exposed API keys** in client code
- [ ] **Regular dependency updates** scheduled

---

## 📈 Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Lighthouse Scores
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Page Speed
- **Homepage**: < 3s load time
- **Product pages**: < 2s load time
- **Time to Interactive**: < 5s

---

## 🎯 Launch Day Checklist

### Final Verification
- [ ] **All critical issues resolved**
- [ ] **Database backed up**
- [ ] **DNS configured correctly**
- [ ] **SSL certificate active**
- [ ] **Monitoring tools active**
- [ ] **Admin account tested**
- [ ] **Payment links working** (Amazon/Flipkart)

### Communication
- [ ] **Notify stakeholders** of launch
- [ ] **Prepare support documentation**
- [ ] **Set up support email**
- [ ] **Create announcement posts** (social media)

### Post-Launch Monitoring (First 24 Hours)
- [ ] **Monitor error logs** continuously
- [ ] **Check uptime** every hour
- [ ] **Test all critical flows**
- [ ] **Monitor server resources**
- [ ] **Respond to user feedback**

---

## 🔄 Ongoing Maintenance (Weekly/Monthly)

### Weekly
- [ ] Review error logs
- [ ] Check uptime reports
- [ ] Monitor performance metrics
- [ ] Backup database
- [ ] Update content (blog, products)

### Monthly
- [ ] Run security audit: `npm audit`
- [ ] Update dependencies: `npm update`
- [ ] Review analytics data
- [ ] Test critical user flows
- [ ] Optimize slow queries

### Quarterly
- [ ] Major dependency updates
- [ ] Performance optimization review
- [ ] SEO audit and improvements
- [ ] User feedback analysis
- [ ] Feature planning

---

## 📞 Emergency Contacts

**Hosting Provider Support**: [Provider contact]  
**Domain Registrar**: [Registrar contact]  
**Database Provider**: [DB provider contact]  
**Developer**: [Your contact]

---

## 🎉 Post-Launch Success Metrics

Track these KPIs after launch:
- Daily active users
- Page views per session
- Bounce rate
- Conversion rate (clicks to Amazon/Flipkart)
- Average session duration
- Mobile vs desktop traffic
- Top performing products
- Error rate
- Page load time

---

**Last Updated**: [Date]  
**Reviewed By**: [Name]  
**Next Review**: [Date]
