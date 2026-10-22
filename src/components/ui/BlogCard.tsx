import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { formatDate, getReadingTime } from '@/lib/utils';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  image?: string | null;
  publishedAt?: Date | null;
  createdAt: Date;
  content: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, title, excerpt, image, publishedAt, createdAt, content } = post;
  const readingTime = getReadingTime(content);
  const displayDate = publishedAt || createdAt;

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
      <Link href={`/blog/${slug}`} className="block relative h-52 overflow-hidden bg-gray-100">
        <Image
          src={image || 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400&h=300'}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar size={13} className="mr-1" />
            <span>{formatDate(displayDate.toISOString())}</span>
          </div>
          <div className="flex items-center">
            <Clock size={13} className="mr-1" />
            <span>{readingTime} min read</span>
          </div>
        </div>
        <Link href={`/blog/${slug}`}>
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-brand-green transition-colors leading-snug">
            {title}
          </h3>
        </Link>
        {excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{excerpt}</p>
        )}
        <div className="mt-auto">
          <Link href={`/blog/${slug}`} className="inline-flex items-center text-brand-green font-medium text-sm hover:text-brand-gold transition-colors group/link">
            Read More
            <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
