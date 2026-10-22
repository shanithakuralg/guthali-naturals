# 🔒 Security Guide - Guthali Naturals

## Security Best Practices

### 🔐 Environment Variables

**Critical**: Never commit sensitive data to version control.

#### Required Actions:
1. **Generate Strong Secrets**
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

2. **Change Default Credentials**
- Default admin password: `admin123` ⚠️ **CHANGE IMMEDIATELY**
- Update in `.env.local` before deployment

3. **Environment File Security**
```bash
# ✅ GOOD - These are committed
.env.example        # Template with no real values

# ❌ BAD - Never commit these
.env
.env.local
.env.production
```

---

### 🛡️ Authentication & Authorization

#### Password Security
- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ No plain-text password storage
- ✅ Session-based JWT authentication
- ⚠️ Change admin password from default

#### Session Management
```typescript
// Session expires after inactivity
// Configured in: src/lib/auth.ts
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

#### Protected Routes
- All `/admin/*` routes protected by middleware
- All admin API routes require authentication
- Middleware: `src/middleware.ts`

---

### 🗄️ Database Security

#### Development (SQLite)
- ✅ Local file database
- ✅ Ignored by Git (`.gitignore`)
- ⚠️ Not suitable for production

#### Production (PostgreSQL)
Required security measures:

1. **Use Strong Connection String**
```env
DATABASE_URL="postgresql://user:strongpassword@host:5432/dbname?sslmode=require"
```

2. **Enable SSL**
- Always use `sslmode=require` in production
- Verify SSL certificates

3. **Limited Database User**
```sql
-- Create restricted user
CREATE USER app_user WITH PASSWORD 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
-- Don't grant DROP, CREATE, or other admin privileges
```

4. **Regular Backups**
- Automated daily backups
- Test restore process monthly
- Store backups securely (encrypted)

---

### 🌐 API Security

#### Input Validation
All API routes should validate inputs:

```typescript
import { validateEmail, validateRequired } from '@/lib/validations';

if (!validateEmail(email)) {
  return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
}
```

#### Rate Limiting
Recommended for production:

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// Example rate limiter
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  // ... rest of handler
}
```

#### CORS Configuration
Default: Same-origin only (secure)

If you need CORS:
```typescript
// next.config.js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
        { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE' },
      ],
    },
  ];
}
```

---

### 🔒 Security Headers

Already configured in `next.config.js`:

```javascript
headers: [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]
```

---

### 🚨 Common Vulnerabilities

#### SQL Injection
✅ **Protected** - Using Prisma ORM with parameterized queries

```typescript
// ✅ SAFE - Prisma handles escaping
await prisma.product.findMany({
  where: { name: { contains: userInput } }
});

// ❌ UNSAFE - Raw SQL with string concatenation
await prisma.$queryRaw(`SELECT * FROM products WHERE name = '${userInput}'`);
```

#### XSS (Cross-Site Scripting)
✅ **Protected** - React auto-escapes by default

```typescript
// ✅ SAFE - Auto-escaped
<div>{userInput}</div>

// ⚠️ DANGEROUS - Only use with trusted content
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

#### CSRF (Cross-Site Request Forgery)
✅ **Protected** - NextAuth handles CSRF tokens automatically

#### Path Traversal
✅ **Protected** - Using Next.js file routing

---

### 📝 Secure Coding Guidelines

#### 1. Validate All Inputs
```typescript
// ✅ GOOD
const price = parseFloat(input);
if (!validatePrice(price)) {
  throw new ValidationError('Invalid price');
}

// ❌ BAD - Trusting user input
const price = input;
await prisma.product.create({ data: { price } });
```

#### 2. Sanitize HTML
```typescript
import { sanitizeHtml } from '@/lib/validations';

// If you must accept HTML
const cleanHtml = sanitizeHtml(userInput);
```

#### 3. Use Environment Variables
```typescript
// ✅ GOOD
const apiKey = process.env.API_KEY;

// ❌ BAD - Hardcoded secrets
const apiKey = 'sk_live_123456789';
```

#### 4. Error Handling
```typescript
// ✅ GOOD - Don't expose internals
catch (error) {
  console.error(error); // Log internally
  return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
}

// ❌ BAD - Exposing details
catch (error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}
```

---

### 🔍 Security Auditing

#### Regular Checks

1. **Dependency Vulnerabilities**
```bash
npm audit
npm audit fix
```

2. **Type Safety**
```bash
npm run type-check
```

3. **Linting**
```bash
npm run lint
```

#### Automated Scans
Set up in CI/CD:
- **Snyk**: Dependency scanning
- **OWASP Dependency-Check**: Security audit
- **GitHub Dependabot**: Automated updates

---

### 🚀 Production Deployment Security

#### Pre-Deployment Checklist
- [ ] Change all default passwords
- [ ] Generate strong `NEXTAUTH_SECRET`
- [ ] Use PostgreSQL (not SQLite)
- [ ] Enable database SSL
- [ ] Set `NODE_ENV=production`
- [ ] Enable security headers
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure firewall rules
- [ ] Set up monitoring/alerts
- [ ] Test authentication flows
- [ ] Review API endpoint security

#### Hosting Recommendations

**Vercel (Recommended)**
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Edge network
- ✅ Environment variable encryption

**Railway / Render**
- ✅ SSL certificates
- ✅ Private networking
- ✅ Secrets management

---

### 📊 Monitoring & Logging

#### What to Monitor
- Failed login attempts
- API rate limit hits
- Database errors
- Unusual traffic patterns
- Error rates

#### Logging Best Practices
```typescript
import { logger } from '@/lib/logger';

// ✅ GOOD - Structured logging
logger.error('Authentication failed', {
  email: user.email,
  ip: request.ip,
  timestamp: Date.now(),
});

// ❌ BAD - Logging sensitive data
logger.error('Auth failed', { password: user.password });
```

#### Recommended Tools
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Datadog**: Full-stack monitoring
- **Uptime Robot**: Uptime monitoring

---

### 🆘 Incident Response

If you discover a security issue:

1. **Immediate Actions**
   - Take affected system offline if critical
   - Change all credentials
   - Review logs for breach extent
   - Document everything

2. **Investigation**
   - Identify attack vector
   - Assess data exposure
   - Check for persistence mechanisms

3. **Remediation**
   - Patch vulnerability
   - Deploy fixes
   - Reset user sessions
   - Notify affected users (if required)

4. **Post-Incident**
   - Update security procedures
   - Conduct lessons-learned review
   - Implement additional monitoring

---

### 📞 Security Contacts

**Report Security Issues**:
- Email: security@guthalinaturals.com
- Do not disclose publicly until patched

**Responsible Disclosure**:
We appreciate responsible security research. If you discover a vulnerability:
1. Email us with details
2. Allow 90 days for patch
3. Coordinate disclosure timing

---

### 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/security)
- [Prisma Security](https://www.prisma.io/docs/concepts/components/prisma-client/security)
- [NextAuth.js Security](https://next-auth.js.org/security)

---

**Last Updated**: [Date]  
**Version**: 1.0.0
