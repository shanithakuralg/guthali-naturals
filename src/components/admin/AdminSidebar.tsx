'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  HelpCircle, 
  MessageSquare, 
  Ticket, 
  BarChart3,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Tag },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Banners', href: '/admin/banners', icon: ImageIcon },
  { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-brand-green bg-white rounded-md p-2 shadow-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-brand-green text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-center border-b border-[#3d6040] px-4">
          <Link href="/admin" className="text-xl font-serif font-bold text-brand-cream">
            Guthali Naturals
          </Link>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-4rem)] pb-4">
          <nav className="mt-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-[#3d6040] text-brand-gold' 
                      : 'text-gray-300 hover:bg-[#3d6040] hover:text-white'
                    }
                  `}
                >
                  <Icon 
                    className={`flex-shrink-0 mr-3 h-5 w-5 ${isActive ? 'text-brand-gold' : 'text-gray-400 group-hover:text-white'}`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 mt-6 border-t border-[#3d6040] pt-4">
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-300 hover:bg-[#3d6040] hover:text-white transition-colors"
            >
              <LogOut className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
