# 🍃 MongoDB & Image Upload Complete Guide

## 📋 Table of Contents
1. [MongoDB Setup](#mongodb-setup)
2. [Image Upload Solutions](#image-upload-solutions)
3. [Complete .env.local Configuration](#complete-envlocal-configuration)
4. [Step-by-Step Implementation](#step-by-step-implementation)

---

## 1️⃣ MongoDB Setup

### ✅ Haan, MongoDB Use Kar Sakte Ho!

Prisma MongoDB ko support karta hai, but कुछ changes chahiye.

### Current Setup:
```
Database: SQLite (file:./dev.db)
ORM: Prisma
```

### MongoDB Setup Options:

#### Option A: MongoDB Atlas (Cloud - Recommended)
**Free Tier Available!**

##### Step 1: MongoDB Atlas Account
```
1. Visit: https://www.mongodb.com/cloud/atlas
2. Sign up free
3. Create cluster (Free M0 tier)
4. Create database user
5. Get connection string
```

##### Step 2: Update Prisma Schema
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"  // Change from sqlite to mongodb
  url      = env("DATABASE_URL")
}

// All models need to be updated
model Admin {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  email        String   @unique
  passwordHash String
  name         String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Category {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  slug        String    @unique
  description String?
  icon        String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  products    Product[]
}

model Product {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  slug        String   @unique
  description String
  price       Float
  mrp         Float?
  image       String?
  images      String?  // JSON array
  categoryId  String   @db.ObjectId
  category    Category @relation(fields: [categoryId], references: [id])
  featured    Boolean  @default(false)
  inStock     Boolean  @default(true)
  flipkartUrl String?
  amazonUrl   String?
  benefits    String?
  ingredients String?
  howToUse    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model BlogPost {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  slug        String    @unique
  excerpt     String?
  content     String
  image       String?
  published   Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model FAQ {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  question  String
  answer    String
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String
  phone     String?
  subject   String
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Banner {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  subtitle  String?
  image     String?
  ctaText   String?
  ctaLink   String?
  active    Boolean  @default(true)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Coupon {
  id              String    @id @default(auto()) @map("_id") @db.ObjectId
  code            String    @unique
  description     String?
  discountPercent Float
  active          Boolean   @default(true)
  validUntil      DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model SiteSettings {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  key   String @unique
  value String
}
```

##### Step 3: Update .env.local
```env
# MongoDB Atlas Connection
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/guthali-naturals?retryWrites=true&w=majority"
```

##### Step 4: Run Migration
```bash
# Delete old SQLite database
rm prisma/dev.db
rm -rf prisma/migrations

# Generate Prisma Client for MongoDB
npx prisma generate

# Push schema to MongoDB (no migrations needed)
npx prisma db push

# Seed database
npm run db:seed
```

#### Option B: Local MongoDB
```bash
# Install MongoDB locally
# Mac: brew install mongodb-community
# Windows: Download from mongodb.com

# Start MongoDB
mongod --dbpath /path/to/data

# Connection string
DATABASE_URL="mongodb://localhost:27017/guthali-naturals"
```

---

## 2️⃣ Image Upload Solutions

### 🖼️ Current Issue: Koi Image Upload System Nahi Hai

### Solution Options:

### ✅ Option 1: Cloudinary (Recommended - Free Tier)

#### Why Cloudinary?
- ✅ Free tier: 25 GB storage
- ✅ CDN included
- ✅ Image optimization automatic
- ✅ Easy integration
- ✅ URL-based images

#### Setup Process:

##### Step 1: Cloudinary Account
```
1. Visit: https://cloudinary.com
2. Sign up free
3. Get credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret
```

##### Step 2: Install Package
```bash
npm install cloudinary next-cloudinary
```

##### Step 3: Add to .env.local
```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

##### Step 4: Create Upload Component
Create: `src/components/admin/ImageUpload.tsx`

```typescript
'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
    setUploading(false);
  };

  const onRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      {value && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image
            src={value}
            alt="Upload"
            fill
            className="object-cover"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      <CldUploadWidget
        uploadPreset="guthali-naturals" // Create this in Cloudinary
        onUpload={onUpload}
        options={{
          maxFiles: 1,
          resourceType: 'image',
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => {
              setUploading(true);
              open();
            }}
            disabled={disabled || uploading}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-brand-green transition-colors"
          >
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {uploading ? 'Uploading...' : 'Click to upload image'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG up to 10MB
              </p>
            </div>
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
```

##### Step 5: Cloudinary Upload Preset
```
1. Go to Cloudinary Dashboard
2. Settings → Upload → Upload Presets
3. Add Upload Preset:
   - Name: guthali-naturals
   - Signing Mode: Unsigned
   - Folder: guthali-products
4. Save
```

##### Step 6: Use in Product Form
```typescript
// In your product form
import ImageUpload from '@/components/admin/ImageUpload';

// In form
<div>
  <label>Product Image</label>
  <ImageUpload
    value={formData.image}
    onChange={(url) => setFormData({ ...formData, image: url })}
  />
</div>
```

---

### ✅ Option 2: Upload to Public Folder (Simple, Not Recommended)

#### For Development Only!

##### Step 1: Create Upload API
Create: `src/app/api/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public folder
    const filename = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(path, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
```

##### Step 2: Create Upload Component
```typescript
'use client';

import { useState } from 'react';

export default function SimpleImageUpload({ onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      onChange(data.url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

**⚠️ Limitations:**
- Server storage limited
- No CDN
- Not scalable
- Files lost on server restart (some hosts)

---

### ✅ Option 3: ImgBB (Free Image Hosting)

#### Quick & Easy!

##### Step 1: Get API Key
```
1. Visit: https://api.imgbb.com/
2. Sign up free
3. Get API key
```

##### Step 2: Add to .env.local
```env
IMGBB_API_KEY="your-imgbb-api-key"
```

##### Step 3: Create Upload Function
```typescript
export async function uploadToImgBB(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();
  return data.data.url;
}
```

---

## 3️⃣ Complete .env.local Configuration

### Full Configuration with All Options:

```env
# ===========================================
# DATABASE CONFIGURATION
# ===========================================

# Option 1: SQLite (Development - Simple)
DATABASE_URL="file:./dev.db"

# Option 2: MongoDB Atlas (Production - Recommended)
# DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/guthali-naturals?retryWrites=true&w=majority"

# Option 3: Local MongoDB
# DATABASE_URL="mongodb://localhost:27017/guthali-naturals"

# Option 4: PostgreSQL (Alternative)
# DATABASE_URL="postgresql://user:password@localhost:5432/guthali_naturals"


# ===========================================
# NEXTAUTH CONFIGURATION (Required)
# ===========================================

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_SECRET="your-super-secret-random-32-char-string-here"

# Development URL
NEXTAUTH_URL="http://localhost:3000"

# Production URL (uncomment for production)
# NEXTAUTH_URL="https://yourdomain.com"


# ===========================================
# ADMIN CREDENTIALS (Initial Setup)
# ===========================================

ADMIN_EMAIL="admin@guthalinaturals.com"
ADMIN_PASSWORD="admin123"  # CHANGE THIS IMMEDIATELY!


# ===========================================
# IMAGE UPLOAD - CLOUDINARY (Recommended)
# ===========================================

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"


# ===========================================
# IMAGE UPLOAD - IMGBB (Alternative)
# ===========================================

# NEXT_PUBLIC_IMGBB_API_KEY="your-imgbb-api-key"


# ===========================================
# EMAIL SERVICE (Optional - Future)
# ===========================================

# For contact form notifications
# EMAIL_FROM="noreply@guthalinaturals.com"
# SMTP_HOST="smtp.gmail.com"
# SMTP_PORT="587"
# SMTP_USER="your-email@gmail.com"
# SMTP_PASSWORD="your-app-password"


# ===========================================
# PAYMENT GATEWAY (Optional - Future)
# ===========================================

# Razorpay
# RAZORPAY_KEY_ID="your-razorpay-key-id"
# RAZORPAY_KEY_SECRET="your-razorpay-secret"

# Stripe
# STRIPE_PUBLIC_KEY="pk_test_..."
# STRIPE_SECRET_KEY="sk_test_..."


# ===========================================
# ANALYTICS (Optional)
# ===========================================

# Google Analytics
# NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"


# ===========================================
# SOCIAL MEDIA (Optional)
# ===========================================

# WhatsApp Business
# WHATSAPP_NUMBER="919876543210"

# Instagram
# INSTAGRAM_TOKEN="your-instagram-token"


# ===========================================
# ENVIRONMENT (Production Only)
# ===========================================

# NODE_ENV="production"
```

---

## 4️⃣ Step-by-Step Implementation

### Complete Setup Guide:

#### Option A: Cloudinary (Recommended)

```bash
# 1. Install Cloudinary
npm install cloudinary next-cloudinary

# 2. Create Cloudinary account
# Visit: https://cloudinary.com

# 3. Add credentials to .env.local
# Copy cloud name, API key, API secret

# 4. Create upload preset in Cloudinary
# Settings → Upload → Add preset

# 5. Add ImageUpload component (code above)

# 6. Use in admin forms
# Import and use <ImageUpload /> component

# 7. Test upload
# Go to /admin/products → Add Product → Upload image
```

#### Option B: MongoDB + Cloudinary (Full Setup)

```bash
# 1. Create MongoDB Atlas account
# Visit: https://www.mongodb.com/cloud/atlas

# 2. Get connection string

# 3. Update prisma/schema.prisma
# Change provider to "mongodb"
# Update all models with @db.ObjectId

# 4. Update .env.local
DATABASE_URL="mongodb+srv://..."

# 5. Remove old database
rm prisma/dev.db
rm -rf prisma/migrations

# 6. Push schema
npx prisma db push

# 7. Generate client
npx prisma generate

# 8. Seed database
npm run db:seed

# 9. Install Cloudinary
npm install cloudinary next-cloudinary

# 10. Setup Cloudinary (steps from above)

# 11. Test everything
npm run dev
```

---

## 5️⃣ Comparison Table

| Feature | SQLite | MongoDB | PostgreSQL |
|---------|--------|---------|------------|
| Setup | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐ Medium | ⭐⭐⭐ Medium |
| Production | ❌ No | ✅ Yes | ✅ Yes |
| Scalability | ❌ Limited | ✅ High | ✅ High |
| Free Hosting | ❌ No | ✅ Yes (Atlas) | ✅ Yes (Vercel) |
| JSON Support | ⭐⭐ Basic | ⭐⭐⭐⭐⭐ Native | ⭐⭐⭐⭐ Good |

| Image Solution | Cost | Setup | CDN | Recommendation |
|----------------|------|-------|-----|----------------|
| Cloudinary | Free (25GB) | Easy | ✅ Yes | ⭐⭐⭐⭐⭐ Best |
| ImgBB | Free (Limited) | Very Easy | ✅ Yes | ⭐⭐⭐⭐ Good |
| Public Folder | Free | Easy | ❌ No | ⭐⭐ Dev Only |

---

## 6️⃣ Recommended Stack

### For Production:

```
Database: MongoDB Atlas (Free M0 cluster)
Images: Cloudinary (Free tier)
Hosting: Vercel (Free)
```

### .env.local Setup:
```env
# Database
DATABASE_URL="mongodb+srv://..."

# Auth
NEXTAUTH_SECRET="generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# Admin
ADMIN_EMAIL="admin@guthalinaturals.com"
ADMIN_PASSWORD="strong-password-here"

# Images
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-name"
CLOUDINARY_API_KEY="your-key"
CLOUDINARY_API_SECRET="your-secret"
```

---

## 🎯 Quick Start Commands

```bash
# MongoDB + Cloudinary Setup
npm install cloudinary next-cloudinary

# Update schema.prisma (change to mongodb)

# Remove old DB
rm prisma/dev.db

# Push to MongoDB
npx prisma db push
npx prisma generate
npm run db:seed

# Start
npm run dev
```

---

**Recommendation:**
- Development: SQLite (current) ✅
- Production: MongoDB Atlas + Cloudinary ✅
- Simple start: Keep SQLite, add Cloudinary for images ✅

---

**Complete guides available in:**
- SETUP_TESTING_GUIDE.md
- HINDI_GUIDE.md
- TROUBLESHOOTING.md
