import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import BlogCard from '@/components/ui/BlogCard';
import { formatDate, getReadingTime } from '@/lib/utils';
import { ChevronRight, Clock, Calendar, ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Guthali Naturals`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) notFound();

  const relatedPosts = await prisma.blogPost.findMany({
    where: { published: true, id: { not: post.id } },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const displayDate = post.publishedAt || post.createdAt;
  const readingTime = getReadingTime(post.content);

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="relative w-full h-72 md:h-96 bg-brand-green">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-10">
          <Link href="/blog" className="inline-flex items-center text-brand-cream/80 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Blog
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-brand-cream/80 text-sm mt-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatDate(displayDate.toISOString())}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Article */}
        <article
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-green prose-a:text-brand-gold prose-strong:text-brand-green bg-white p-8 md:p-12 rounded-2xl shadow-sm mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif text-brand-green mb-6">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <BlogCard key={rp.id} post={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
