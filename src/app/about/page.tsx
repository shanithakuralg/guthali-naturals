import Image from 'next/image';
import { CheckCircle2, Leaf, Target, Award, Users } from 'lucide-react';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'About Us - Our Story & Mission',
  description: 'Learn about Guthali Naturals, our mission, vision, and our commitment to natural, Ayurvedic wellness. Ethically sourced, scientifically backed herbal remedies.',
  keywords: ['about guthali naturals', 'ayurvedic company', 'herbal wellness', 'natural products'],
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-olive text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCAxMmMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm">
            <Leaf className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">About Guthali Naturals</h1>
          <p className="text-xl md:text-2xl text-brand-cream max-w-2xl mx-auto">From Seeds to Solutions</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-olive text-sm font-medium rounded-full mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-green mb-6 leading-tight">
              Rooted in Ancient Wisdom, Grown for Modern Wellness
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded on the ancient principles of Ayurveda, Guthali Naturals brings you the purest gifts of nature. Our journey began with a simple belief: the earth provides everything we need for holistic wellness.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We carefully source our ingredients from trusted farmers who share our commitment to sustainable agriculture. Every product we create is a testament to our dedication to quality, purity, and your well-being.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-brand-green">10+</div>
                <div className="text-sm text-gray-600 mt-1">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-brand-green">50+</div>
                <div className="text-sm text-gray-600 mt-1">Natural Products</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-olive/20 to-brand-green/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="w-24 h-24 text-brand-green/30 mx-auto mb-4" />
                  <p className="text-brand-green/50 font-medium">Your Brand Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-brand-green to-brand-olive text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <Target className="w-12 h-12 text-brand-gold mb-4 relative z-10" />
              <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Our Mission</h3>
              <p className="text-brand-cream relative z-10 leading-relaxed">
                To empower individuals to take charge of their health naturally, by providing access to premium quality, ethically sourced Ayurvedic and herbal solutions.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-brand-gold to-brand-gold-dark text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <Award className="w-12 h-12 text-white mb-4 relative z-10" />
              <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Our Vision</h3>
              <p className="text-white/90 relative z-10 leading-relaxed">
                To be the globally trusted brand for natural wellness, bridging the gap between traditional wisdom and modern lifestyle through science-backed herbal remedies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-green mb-4">Our Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From farm to your doorstep, we ensure quality at every step
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '01', title: 'Sourcing', desc: 'Ethically harvested natural ingredients from trusted farms.', icon: '🌱' },
            { num: '02', title: 'Formulation', desc: 'Expertly crafted ayurvedic blends by specialists.', icon: '⚗️' },
            { num: '03', title: 'Testing', desc: 'Rigorous quality & purity checks in certified labs.', icon: '🔬' },
            { num: '04', title: 'Delivery', desc: 'Safely packed and delivered to your doorstep.', icon: '📦' },
          ].map((step, idx) => (
            <div key={idx} className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="text-sm font-bold text-brand-gold mb-2">STEP {step.num}</div>
              <h4 className="text-xl font-semibold text-brand-green mb-3">{step.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-green mb-8">Our Certifications & Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: CheckCircle2, label: 'GMP Certified' },
              { icon: CheckCircle2, label: 'ISO Certified' },
              { icon: CheckCircle2, label: '100% Organic' },
              { icon: CheckCircle2, label: 'Cruelty Free' }
            ].map((badge, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <badge.icon className="w-10 h-10 text-brand-green mx-auto mb-3" />
                <span className="font-medium text-gray-700 text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-brand-green to-brand-olive rounded-2xl p-12 text-white">
          <Users className="w-16 h-16 mx-auto mb-4 text-brand-gold" />
          <h2 className="text-3xl font-serif font-bold mb-4">Join Our Wellness Community</h2>
          <p className="text-brand-cream mb-8 max-w-2xl mx-auto">
            Experience the power of nature with our carefully curated herbal solutions
          </p>
          <a href="/products" className="inline-block bg-brand-gold hover:bg-brand-gold-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl">
            Explore Our Products
          </a>
        </div>
      </section>
    </main>
  );
}
