# 📡 API Documentation - Guthali Naturals

## Base URL
```
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
```

## Authentication

Most admin endpoints require authentication via NextAuth session.

### Login
```http
POST /api/auth/signin/credentials
Content-Type: application/json

{
  "email": "admin@guthalinaturals.com",
  "password": "your-password"
}
```

---

## Products

### Get All Products
```http
GET /api/products?page=1&limit=10&search=turmeric&categoryId=xyz&sort=price-asc
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in name and description
- `categoryId` (optional): Filter by category
- `sort` (optional): Sort order
  - `name-asc` | `name-desc`
  - `price-asc` | `price-desc`
  - `createdAt-desc` (default)

**Response:**
```json
{
  "products": [
    {
      "id": "abc123",
      "name": "Organic Turmeric Powder",
      "slug": "organic-turmeric-powder",
      "description": "Premium quality turmeric",
      "price": 299,
      "mrp": 399,
      "image": "https://...",
      "categoryId": "xyz",
      "category": {
        "id": "xyz",
        "name": "Herbs & Spices",
        "slug": "herbs-spices"
      },
      "featured": true,
      "inStock": true,
      "flipkartUrl": "https://...",
      "amazonUrl": "https://...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 45,
  "pages": 5
}
```

### Get Single Product
```http
GET /api/products/:id
```

**Response:**
```json
{
  "id": "abc123",
  "name": "Organic Turmeric Powder",
  "slug": "organic-turmeric-powder",
  "description": "Premium quality turmeric...",
  "price": 299,
  "mrp": 399,
  "image": "https://...",
  "benefits": "Anti-inflammatory properties...",
  "ingredients": "100% organic turmeric",
  "howToUse": "Mix 1 tsp with warm milk...",
  "category": { ... },
  "featured": true,
  "inStock": true
}
```

### Create Product (Admin)
```http
POST /api/products
Authorization: Required
Content-Type: application/json

{
  "name": "Organic Turmeric Powder",
  "slug": "organic-turmeric-powder",
  "description": "Premium quality turmeric powder",
  "price": 299,
  "mrp": 399,
  "categoryId": "category-id-here",
  "image": "https://...",
  "featured": false,
  "inStock": true,
  "flipkartUrl": "https://...",
  "amazonUrl": "https://...",
  "benefits": "Anti-inflammatory...",
  "ingredients": "100% organic turmeric",
  "howToUse": "Mix 1 tsp..."
}
```

### Update Product (Admin)
```http
PUT /api/products/:id
Authorization: Required
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 349,
  "inStock": true
}
```

### Delete Product (Admin)
```http
DELETE /api/products/:id
Authorization: Required
```

---

## Categories

### Get All Categories
```http
GET /api/categories
```

**Response:**
```json
[
  {
    "id": "cat123",
    "name": "Herbal Medicines",
    "slug": "herbal-medicines",
    "description": "Natural healing solutions",
    "icon": "herb-icon",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create Category (Admin)
```http
POST /api/categories
Authorization: Required
Content-Type: application/json

{
  "name": "Essential Oils",
  "slug": "essential-oils",
  "description": "Pure essential oils",
  "icon": "droplet"
}
```

### Update Category (Admin)
```http
PUT /api/categories/:id
Authorization: Required
```

### Delete Category (Admin)
```http
DELETE /api/categories/:id
Authorization: Required
```

---

## Blog Posts

### Get All Blog Posts
```http
GET /api/blog?page=1&limit=10
```

**Response:**
```json
{
  "posts": [
    {
      "id": "post123",
      "title": "Benefits of Turmeric",
      "slug": "benefits-of-turmeric",
      "excerpt": "Discover the amazing...",
      "content": "Full content here...",
      "image": "https://...",
      "published": true,
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 20,
  "pages": 2
}
```

### Get Single Blog Post
```http
GET /api/blog/:id
```

### Create Blog Post (Admin)
```http
POST /api/blog
Authorization: Required
Content-Type: application/json

{
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "excerpt": "Short description",
  "content": "Full markdown content",
  "image": "https://...",
  "published": true
}
```

---

## Contact Messages

### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "subject": "Product Inquiry",
  "message": "I would like to know..."
}
```

### Get All Messages (Admin)
```http
GET /api/contact
Authorization: Required
```

### Mark as Read (Admin)
```http
PUT /api/contact/:id
Authorization: Required
Content-Type: application/json

{
  "read": true
}
```

### Delete Message (Admin)
```http
DELETE /api/contact/:id
Authorization: Required
```

---

## FAQ

### Get All FAQs
```http
GET /api/faq
```

**Response:**
```json
[
  {
    "id": "faq123",
    "question": "What is your return policy?",
    "answer": "We accept returns within 30 days...",
    "sortOrder": 1
  }
]
```

### Create FAQ (Admin)
```http
POST /api/faq
Authorization: Required
Content-Type: application/json

{
  "question": "Do you ship internationally?",
  "answer": "Yes, we ship worldwide.",
  "sortOrder": 10
}
```

---

## Banners

### Get Active Banners
```http
GET /api/banners
```

**Response:**
```json
[
  {
    "id": "banner123",
    "title": "Summer Sale",
    "subtitle": "Up to 50% off",
    "image": "https://...",
    "ctaText": "Shop Now",
    "ctaLink": "/products",
    "active": true,
    "sortOrder": 1
  }
]
```

### Create Banner (Admin)
```http
POST /api/banners
Authorization: Required
Content-Type: application/json

{
  "title": "New Arrivals",
  "subtitle": "Check out our latest products",
  "image": "https://...",
  "ctaText": "Explore",
  "ctaLink": "/products/new",
  "active": true,
  "sortOrder": 1
}
```

---

## Coupons

### Get All Coupons
```http
GET /api/coupons
```

### Create Coupon (Admin)
```http
POST /api/coupons
Authorization: Required
Content-Type: application/json

{
  "code": "SAVE20",
  "description": "Save 20% on all products",
  "discountPercent": 20,
  "active": true,
  "validUntil": "2024-12-31T23:59:59.000Z"
}
```

---

## Analytics (Admin)

### Get Dashboard Stats
```http
GET /api/analytics
Authorization: Required
```

**Response:**
```json
{
  "products": {
    "total": 45,
    "inStock": 40,
    "outOfStock": 5,
    "featured": 8
  },
  "categories": {
    "total": 6
  },
  "blog": {
    "total": 20,
    "published": 18,
    "drafts": 2
  },
  "messages": {
    "total": 50,
    "unread": 12
  }
}
```

---

## Health Check

### Get Server Status
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "guthali-naturals",
  "version": "1.0.0",
  "database": "connected"
}
```

---

## Error Responses

All endpoints return consistent error format:

```json
{
  "error": "Error message here"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

---

## Rate Limiting

**Recommended** (not yet implemented):
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

---

## Pagination

Endpoints that return lists support pagination:

**Request:**
```http
GET /api/products?page=2&limit=20
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 2,
    "limit": 20,
    "pages": 5,
    "hasMore": true
  }
}
```

---

## Testing with curl

```bash
# Get products
curl http://localhost:3000/api/products

# Get with query params
curl "http://localhost:3000/api/products?search=turmeric&limit=5"

# Create product (with auth)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","slug":"test-product",...}'
```

---

## Postman Collection

Import this collection for easy testing:
[Download Postman Collection](#) (TBD)

---

**Last Updated**: [Date]
