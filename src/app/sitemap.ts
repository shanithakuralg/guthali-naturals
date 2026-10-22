import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { APP_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = APP_URL;

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/products',
        '/blog',
        '/contact',
        '/faq',
        '/services',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic product pages
    const products = await prisma.product.findMany({
        where: { inStock: true },
        select: { slug: true, updatedAt: true },
    }).catch(() => []);

    const productPages = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    // Dynamic blog pages
    const blogPosts = await prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    }).catch(() => []);

    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...productPages, ...blogPages];
}
