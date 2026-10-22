// App Configuration Constants

export const APP_NAME = 'Guthali Naturals';
export const APP_DESCRIPTION = 'Your trusted natural, ayurvedic, and herbal pharmacy brand. From seeds to solutions.';
export const APP_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const ADMIN_PAGE_SIZE = 10;

// Cache Settings (in seconds)
export const CACHE_REVALIDATE = {
    PRODUCTS: 3600, // 1 hour
    CATEGORIES: 86400, // 24 hours
    BLOG: 3600, // 1 hour
    BANNERS: 1800, // 30 minutes
};

// SEO
export const DEFAULT_OG_IMAGE = `${APP_URL}/logo.jpeg`;

// Contact
export const CONTACT_EMAIL = 'support@guthalinaturals.com';
export const CONTACT_PHONE = '+91-XXXXXXXXXX';

// Social Media (Update with real URLs)
export const SOCIAL_LINKS = {
    facebook: 'https://facebook.com/guthalinaturals',
    instagram: 'https://instagram.com/guthalinaturals',
    twitter: 'https://twitter.com/guthalinaturals',
    whatsapp: 'https://wa.me/91XXXXXXXXXX',
};
