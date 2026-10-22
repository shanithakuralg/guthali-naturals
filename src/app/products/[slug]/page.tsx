import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import BuyButton from '@/components/ui/BuyButton';
import Tabs from '@/components/ui/Tabs';
import ProductCard from '@/components/ui/ProductCard';
import Badge from '@/components/ui/Badge';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Guthali Naturals`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id }
    },
    include: { category: true },
    take: 4,
  });

  const discount = product.mrp ? calculateDiscount(product.mrp, product.price) : 0;
  const isOutOfStock = !product.inStock;

  const tabsData = [
    { label: 'Description', content: <div className="prose max-w-none text-gray-700">{product.description}</div> },
    ...(product.benefits ? [{ label: 'Benefits', content: <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: product.benefits }} /> }] : []),
    ...(product.ingredients ? [{ label: 'Ingredients', content: <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: product.ingredients }} /> }] : []),
    ...(product.howToUse ? [{ label: 'How to Use', content: <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: product.howToUse }} /> }] : []),
  ];

  return (
    <main className="min-h-screen bg-brand-cream pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-brand-olive mb-8 items-center space-x-2">
          <Link href="/" className="hover:text-brand-green">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-brand-green">Products</Link>
          <ChevronRight size={14} />
          {product.category && (
            <>
              <Link href={`/products?category=${product.category.slug}`} className="hover:text-brand-green">{product.category.name}</Link>
              <ChevronRight size={14} />
            </>
          )}
          <span className="text-gray-700 truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-brand-cream/50">
              <Image
                src={product.image || 'https://images.unsplash.com/photo-1611078500732-55fb25c34538?auto=format&fit=crop&q=80&w=600&h=600'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {product.category && (
                <div className="mb-2">
                  <Badge text={product.category.name} variant="green" />
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-serif text-brand-green mb-4">{product.name}</h1>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-brand-green">{formatPrice(product.price)}</span>
                {product.mrp && product.mrp > product.price && (
                  <>
                    <span className="text-lg text-brand-olive line-through mb-1">{formatPrice(product.mrp)}</span>
                    <span className="text-sm font-semibold text-brand-gold mb-1">{discount}% OFF</span>
                  </>
                )}
              </div>

              <div className="mb-6">
                {isOutOfStock ? (
                  <Badge text="Out of Stock" variant="red" />
                ) : (
                  <Badge text="In Stock" variant="green" />
                )}
              </div>

              <p className="text-gray-700 mb-8">{product.description.substring(0, 200)}...</p>

              {/* Purchase Actions */}
              <div className="mt-auto pt-6 border-t border-brand-olive-light/30">
                <h3 className="font-medium text-brand-green mb-4 text-sm uppercase tracking-wide">Available on:</h3>
                {(product.amazonUrl || product.flipkartUrl) ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    {product.amazonUrl && (
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-6 py-3 bg-[#FF9900] hover:bg-[#e68a00] text-black font-semibold rounded-xl shadow-sm transition-all hover:shadow-md flex-1"
                      >
                        <Image src="/amazon-logo.svg" alt="Amazon" width={24} height={24} className="flex-shrink-0" />
                        <span>Buy on Amazon</span>
                      </a>
                    )}
                    {product.flipkartUrl && (
                      <a
                        href={product.flipkartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-6 py-3 bg-[#2874F0] hover:bg-[#1a5bbf] text-white font-semibold rounded-xl shadow-sm transition-all hover:shadow-md flex-1"
                      >
                        <Image src="/flipkart-logo.svg" alt="Flipkart" width={24} height={24} className="flex-shrink-0" />
                        <span>Buy on Flipkart</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="bg-brand-cream rounded-xl p-4 text-center">
                    <p className="text-brand-olive font-medium mb-2">Coming Soon</p>
                    <p className="text-sm text-gray-500 mb-3">This product will be available online shortly.</p>
                    <Link href="/contact" className="text-sm font-semibold text-brand-green hover:underline">Contact us to enquire →</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-16">
          <Tabs tabs={tabsData} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif text-brand-green mb-6 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
