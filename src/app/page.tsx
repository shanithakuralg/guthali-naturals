import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ui/ProductCard';
import HeroBanner from '@/components/ui/HeroBanner';
import { Leaf, FlaskConical, Heart, MessageCircle, Pill, Apple, Droplets, Coffee } from 'lucide-react';

// Revalidate cache every hour for better performance
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch data with better error handling
  const [banners, categories, featuredProducts] = await Promise.all([
    prisma.banner.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
      take: 5
    }).catch(() => []),
    prisma.category.findMany({
      take: 8,
      orderBy: { name: 'asc' }
    }).catch(() => []),
    prisma.product.findMany({
      where: { featured: true, inStock: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: 'desc' }
    }).catch(() => []),
  ]);

  const defaultBanners = [
    {
      id: '1',
      title: 'Welcome to Guthali Naturals',
      subtitle: 'From Seeds to Solutions — Discover the power of nature',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200&h=600',
      ctaText: 'Explore Products',
      ctaLink: '/products',
      active: true,
      sortOrder: 1,
    },
  ];

  // Map DB banners to HeroBanner format (ctaLink fallback)
  const displayBanners = (banners.length > 0 ? banners : defaultBanners).map((b: any) => ({
    ...b,
    ctaLink: b.ctaLink || b.link || '/products',
    ctaText: b.ctaText || 'Shop Now',
    image: b.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200&h=600',
  }));

  const categoryIcons: Record<string, any> = {
    'Herbal Medicines': Pill,
    'Supplements & Vitamins': Apple,
    'Essential Oils': Droplets,
    'Wellness Teas': Coffee,
  };

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section>
        <HeroBanner banners={displayBanners} />
      </section>

      {/* Why Choose Us */}
      <section className="section-padding container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title text-brand-green">Why Choose Guthali Naturals</h2>
          <p className="section-subtitle text-dark-text mt-4">Discover the purity of our Ayurvedic heritage</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Leaf, title: '100% Natural', desc: 'Sourced directly from nature' },
            { icon: FlaskConical, title: 'Lab Tested', desc: 'Quality assured and verified' },
            { icon: Heart, title: 'Ayurvedic Heritage', desc: 'Rooted in ancient wisdom' },
            { icon: MessageCircle, title: 'Free Consultation', desc: 'Expert guidance for your health' },
          ].map((item, idx) => (
            <div key={idx} className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-block p-4 rounded-full bg-brand-olive-light text-brand-green mb-4">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-brand-green mb-2">{item.title}</h3>
              <p className="text-dark-text">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding container-custom bg-white">
        <div className="text-center mb-12">
          <h2 className="section-title text-brand-green">Our Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(categories.length > 0 ? categories : [
            { slug: 'herbal-medicines', name: 'Herbal Medicines' },
            { slug: 'supplements-vitamins', name: 'Supplements & Vitamins' },
            { slug: 'essential-oils', name: 'Essential Oils' },
            { slug: 'wellness-teas', name: 'Wellness Teas' },
          ]).map((cat, idx) => {
            const Icon = categoryIcons[cat.name] || Leaf;
            return (
              <Link key={idx} href={`/products?category=${cat.slug}`} className="group block">
                <div className="card p-8 text-center bg-brand-cream hover:bg-brand-olive-light transition-colors duration-300">
                  <div className="text-brand-olive mx-auto mb-4 group-hover:text-brand-green transition-colors">
                    <Icon size={48} className="mx-auto" />
                  </div>
                  <h3 className="font-serif font-medium text-lg text-brand-green">{cat.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title text-brand-green">Featured Products</h2>
        </div>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-dark-text">No featured products available at the moment.</p>
        )}
      </section>

      {/* Testimonials */}
      <section className="section-padding container-custom bg-brand-green text-white">
        <div className="text-center mb-12">
          <h2 className="section-title text-brand-gold">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah M.', text: 'The wellness teas have completely transformed my morning routine. Absolutely love the quality!', stars: 5 },
            { name: 'Rahul K.', text: 'Authentic ayurvedic products. The herbal supplements helped me build my immunity significantly.', stars: 5 },
            { name: 'Emily R.', text: 'Their essential oils are pure magic. Fast shipping and great customer service.', stars: 4 },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex text-brand-gold mb-4">
                {[...Array(item.stars)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="italic mb-4">"{item.text}"</p>
              <p className="font-semibold text-brand-gold">- {item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding container-custom text-center">
        <h2 className="text-3xl font-serif text-brand-green mb-6">Ready to start your wellness journey?</h2>
        <Link href="/products" className="btn-primary inline-block text-lg px-8 py-4">
          Explore Our Natural Remedies
        </Link>
      </section>
    </main>
  );
}
