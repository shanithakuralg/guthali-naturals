import prisma from '@/lib/prisma';
import BlogCard from '@/components/ui/BlogCard';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { BookOpen } from 'lucide-react';

export const metadata = generateSEOMetadata({
  title: 'Health Tips & Wellness Blog',
  description: 'Read our latest articles on Ayurveda, natural wellness, herbal remedies, and holistic health. Expert insights and practical tips.',
  keywords: ['ayurveda blog', 'wellness tips', 'herbal remedies', 'natural health'],
});

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 20
  }).catch(() => []);

  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="container mx-auto px-4 text-center py-20">
          <BookOpen className="w-20 h-20 text-brand-green/30 mx-auto mb-6" />
          <h1 className="text-4xl font-serif text-brand-green mb-4">Health Tips & Insights</h1>
          <p className="text-gray-600 text-lg mb-8">No posts published yet. Check back soon for wellness content!</p>
          <Link href="/products" className="inline-block bg-brand-green text-white px-8 py-3 rounded-lg hover:bg-brand-olive transition-colors">
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-olive text-white py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCAxMmMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Health Tips & Wellness Blog</h1>
          <p className="text-xl text-brand-cream max-w-2xl mx-auto">Ancient wisdom meets modern wellness</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-72 lg:h-full">
                  <Image
                    src={featuredPost.image || 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80'}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute top-4 left-4 bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-serif text-brand-green mb-4 group-hover:text-brand-olive transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-olive font-medium">
                      {formatDate(featuredPost.publishedAt?.toISOString() || featuredPost.createdAt.toISOString())}
                    </span>
                    <span className="text-brand-green font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        {remainingPosts.length > 0 && (
          <>
            <h2 className="text-2xl font-serif text-brand-green mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
