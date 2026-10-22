import prisma from '@/lib/prisma';
import FAQClient from './FAQClient';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { HelpCircle, MessageCircle } from 'lucide-react';

export const metadata = generateSEOMetadata({
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Find answers to common questions about our ayurvedic products, shipping, consultations, and more. Get help quickly.',
  keywords: ['faq', 'help', 'questions', 'ayurveda faq', 'product information'],
});

// Revalidate every 6 hours
export const revalidate = 21600;

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { sortOrder: 'asc' }
  }).catch(() => []);

  // Fallback data if DB is empty
  const displayFaqs = faqs.length > 0 ? faqs : [
    { id: '1', question: 'Are your products 100% natural?', answer: 'Yes, all our products are formulated using 100% natural, plant-based ingredients sourced from trusted organic farms. We never use synthetic additives or harmful chemicals.' },
    { id: '2', question: 'Do you ship internationally?', answer: 'Currently, our products are available for purchase via Amazon and Flipkart, which handle our shipping. Please check their respective platforms for international delivery options.' },
    { id: '3', question: 'How can I book an herbal consultation?', answer: 'You can book a consultation by visiting our Services page or filling out the form on our Contact Us page. Our expert Ayurvedic practitioners will get back to you within 24 hours to schedule an appointment.' },
    { id: '4', question: 'Are your products safe for children?', answer: 'While our products are natural, we always recommend consulting with a healthcare professional or our in-house Ayurvedic doctors before administering any herbal supplements to children under 12 years of age.' },
    { id: '5', question: 'What is your return policy?', answer: 'As our products are sold through Amazon and Flipkart, their respective return policies apply. Generally, you can return unopened products within 30 days of delivery.' },
  ];

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-olive text-white py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCAxMmMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm">
            <HelpCircle className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-brand-cream max-w-2xl mx-auto">Quick answers to questions you may have</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="p-6 md:p-10">
              <FAQClient faqs={displayFaqs} />
            </div>
          </div>

          {/* CTA Card */}
          <div className="relative overflow-hidden bg-gradient-to-r from-brand-green to-brand-olive text-white rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-brand-gold" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Still have questions?</h2>
              <p className="text-brand-cream mb-6 text-lg">Our team is here to help you with any additional queries.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-block bg-brand-gold hover:bg-white text-brand-green font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                  Contact Us
                </Link>
                <Link href="/services" className="inline-block bg-transparent hover:bg-white/10 text-white border-2 border-white font-semibold px-8 py-3 rounded-lg transition-colors">
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
