'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

interface HeroBannerProps {
  banners: Banner[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image src={banner.image} alt={banner.title} fill className="object-cover" priority={index === 0} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom mx-auto px-4 md:px-12 w-full">
              <div className="max-w-2xl text-white">
                <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 leading-tight animate-fade-in-up">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in-up animation-delay-200">
                  {banner.subtitle}
                </p>
                <div className="animate-fade-in-up animation-delay-400">
                  <Button variant="gold" size="lg" href={banner.ctaLink}>
                    {banner.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-brand-gold w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
