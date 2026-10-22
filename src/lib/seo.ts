// SEO Utilities
import { Metadata } from 'next';
import { APP_NAME, APP_DESCRIPTION, APP_URL, DEFAULT_OG_IMAGE } from './constants';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    keywords?: string[];
    noIndex?: boolean;
}

export function generateMetadata({
    title,
    description = APP_DESCRIPTION,
    image = DEFAULT_OG_IMAGE,
    url = APP_URL,
    type = 'website',
    keywords = [],
    noIndex = false,
}: SEOProps = {}): Metadata {
    const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
    const imageUrl = image.startsWith('http') ? image : `${APP_URL}${image}`;

    return {
        title: fullTitle,
        description,
        keywords: [
            'ayurvedic products',
            'herbal medicines',
            'natural remedies',
            'wellness products',
            'organic supplements',
            ...keywords,
        ],
        authors: [{ name: APP_NAME }],
        creator: APP_NAME,
        publisher: APP_NAME,
        robots: noIndex ? 'noindex,nofollow' : 'index,follow',
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: APP_NAME,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title || APP_NAME,
                },
            ],
            locale: 'en_IN',
            type: (type === 'product' ? 'website' : type) as 'website' | 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [imageUrl],
            creator: '@guthalinaturals',
        },
        alternates: {
            canonical: url,
        },
    };
}

export function generateProductSchema(product: {
    name: string;
    description: string;
    price: number;
    image?: string;
    mrp?: number;
    inStock: boolean;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image || DEFAULT_OG_IMAGE,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            ...(product.mrp && { priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() }),
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${APP_URL}${item.url}`,
        })),
    };
}
