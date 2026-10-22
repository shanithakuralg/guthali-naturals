import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import Badge from './Badge';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    mrp?: number | null;
    image?: string | null;
    inStock: boolean;
    featured?: boolean;
    amazonUrl?: string | null;
    flipkartUrl?: string | null;
    category?: { name: string; slug: string } | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { slug, name, price, mrp, image, inStock, amazonUrl, flipkartUrl, category } = product;
  const discount = mrp ? calculateDiscount(mrp, price) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full">
      <Link href={`/products/${slug}`} className="block relative h-56 overflow-hidden bg-gray-50">
        <Image
          src={image || 'https://images.unsplash.com/photo-1611078500732-55fb25c34538?auto=format&fit=crop&q=80&w=400&h=400'}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {category && (
          <div className="absolute top-3 left-3">
            <Badge text={category.name} variant="olive" />
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${slug}`}>
          <h3 className="font-serif text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-brand-green transition-colors leading-tight">
            {name}
          </h3>
        </Link>

        <div className="mt-auto pt-3 flex items-end justify-between border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-brand-green">{formatPrice(price)}</span>
            {mrp && mrp > price && (
              <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(mrp)}</span>
            )}
          </div>
        </div>

        {(amazonUrl || flipkartUrl) && (
          <div className="flex gap-2 mt-3">
            {amazonUrl && (
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 bg-[#FF9900]/10 text-[#FF9900] text-xs font-semibold py-2 rounded-lg hover:bg-[#FF9900] hover:text-white transition-all duration-200 border border-[#FF9900]/20 hover:border-[#FF9900]"
              >
                <ShoppingCart size={12} />
                <span>Amazon</span>
              </a>
            )}
            {flipkartUrl && (
              <a
                href={flipkartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 bg-[#2874F0]/10 text-[#2874F0] text-xs font-semibold py-2 rounded-lg hover:bg-[#2874F0] hover:text-white transition-all duration-200 border border-[#2874F0]/20 hover:border-[#2874F0]"
              >
                <ShoppingCart size={12} />
                <span>Flipkart</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
