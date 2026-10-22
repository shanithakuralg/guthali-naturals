import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white pt-16 pb-8">
      <div className="container-custom mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-light p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-lg font-serif font-bold text-white">Guthali Naturals</div>
              <div className="text-[10px] text-brand-gold uppercase tracking-widest">Seeds to Solutions</div>
            </div>
          </div>
          <p className="text-gray-300 mb-6 text-sm">
            Your trusted source for natural, ayurvedic, and herbal pharmacy products.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-brand-gold transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-brand-gold transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl font-semibold mb-4 text-brand-gold">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</Link></li>
            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</Link></li>
            <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">Services</Link></li>
            <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">Blog</Link></li>
            <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">FAQ</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl font-semibold mb-4 text-brand-gold">Categories</h3>
          <ul className="space-y-2">
            <li><Link href="/products?category=herbal-medicines" className="text-gray-300 hover:text-white transition-colors text-sm">Herbal Medicines</Link></li>
            <li><Link href="/products?category=supplements" className="text-gray-300 hover:text-white transition-colors text-sm">Supplements & Vitamins</Link></li>
            <li><Link href="/products?category=essential-oils" className="text-gray-300 hover:text-white transition-colors text-sm">Essential Oils</Link></li>
            <li><Link href="/products?category=wellness-teas" className="text-gray-300 hover:text-white transition-colors text-sm">Wellness Teas</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl font-semibold mb-4 text-brand-gold">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin size={20} className="mr-3 text-brand-gold shrink-0 mt-1" />
              <span className="text-gray-300 text-sm">123 Nature Way, Wellness City,<br />Earth 45678</span>
            </li>
            <li className="flex items-center">
              <Phone size={20} className="mr-3 text-brand-gold shrink-0" />
              <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <Mail size={20} className="mr-3 text-brand-gold shrink-0" />
              <span className="text-gray-300 text-sm">support@guthalinaturals.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-custom mx-auto px-4 mt-12 pt-8 border-t border-gray-600/50 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Guthali Naturals. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
