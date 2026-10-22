import { Stethoscope, FlaskConical, Heart, Building2, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Our Services - Wellness Consultations & Programs',
  description: 'Explore our range of wellness services including herbal consultations, custom formulations, and corporate wellness programs. Expert Ayurvedic guidance.',
  keywords: ['herbal consultation', 'ayurvedic services', 'wellness programs', 'corporate wellness'],
});

export default function ServicesPage() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Herbal Consultation',
      description: 'Expert consultations for natural remedies tailored to your unique constitution.',
      features: ['Personalized dosha assessment', 'Dietary recommendations', 'Lifestyle guidance', 'Herbal supplement planning'],
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: FlaskConical,
      title: 'Custom Formulations',
      description: 'Personalized herbal formulations crafted specifically for your health needs.',
      features: ['Targeted health solutions', 'Premium ingredient selection', 'Small-batch preparation', 'Ongoing adjustments'],
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Heart,
      title: 'Wellness Programs',
      description: 'Holistic wellness plans designed to restore balance and vitality.',
      features: ['Detoxification protocols', 'Immunity building plans', 'Stress management', 'Digestive health resets'],
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Building2,
      title: 'Corporate Wellness',
      description: 'Workplace wellness solutions to foster a healthier, more productive team.',
      features: ['On-site health camps', 'Wellness workshops', 'Bulk product discounts', 'Ergonomic health advice'],
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-olive text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCAxMmMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">Our Wellness Services</h1>
            <p className="text-xl md:text-2xl text-brand-cream">
              Beyond products, we offer personalized guidance for your holistic health journey
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mr-4 group-hover:scale-110 transition-transform`}>
                    <service.icon size={32} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-bold text-brand-green mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="text-brand-green font-medium flex items-center group-hover:text-brand-gold transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-green mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Simple steps to begin your personalized wellness journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Book Consultation', desc: 'Schedule a call with our Ayurvedic experts at your convenience' },
              { step: '02', title: 'Assessment', desc: 'Complete health evaluation and personalized dosha analysis' },
              { step: '03', title: 'Get Started', desc: 'Receive your custom plan and begin your transformation' },
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green text-white text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-brand-green mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-brand-olive-light"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-brand-green to-brand-olive text-white rounded-2xl p-12 md:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Transform Your Health?</h2>
            <p className="text-brand-cream text-lg mb-8">
              Book a consultation with our Ayurvedic experts today and discover the power of personalized natural healing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-block px-8 py-4 rounded-lg font-semibold text-brand-green bg-brand-gold hover:bg-white transition-colors shadow-lg hover:shadow-xl">
                Book Consultation
              </Link>
              <Link href="/products" className="inline-block px-8 py-4 rounded-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-brand-green transition-colors">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
