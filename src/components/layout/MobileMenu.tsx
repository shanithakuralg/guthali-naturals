'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { X, Home, Info, Heart, ShoppingBag, BookOpen, HelpCircle, Mail } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; path: string }[];
  currentPath: string;
}

const icons: Record<string, any> = {
  Home, About: Info, Services: Heart, Products: ShoppingBag, Blog: BookOpen, FAQ: HelpCircle, Contact: Mail
};

export default function MobileMenu({ isOpen, onClose, links, currentPath }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-xl flex flex-col animate-slide-in-right">
        <div className="p-4 flex justify-between items-center border-b">
          <span className="font-serif font-bold text-xl text-brand-green">Menu</span>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-500 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = icons[link.name] || Home;
              const isActive = currentPath === link.path;
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    onClick={onClose}
                    className={`flex items-center px-6 py-4 transition-colors ${
                      isActive ? 'bg-brand-cream text-brand-green border-r-4 border-brand-gold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} className={`mr-4 ${isActive ? 'text-brand-gold' : 'text-gray-400'}`} />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
