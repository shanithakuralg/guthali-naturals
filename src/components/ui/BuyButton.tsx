'use client';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface BuyButtonProps {
  platform: 'amazon' | 'flipkart';
  url: string;
}

export default function BuyButton({ platform, url }: BuyButtonProps) {
  const isAmazon = platform === 'amazon';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 px-8 py-3.5 text-lg font-semibold rounded-xl shadow-sm transition-all hover:shadow-md ${isAmazon
          ? 'bg-[#FF9900] hover:bg-[#e68a00] text-black'
          : 'bg-[#2874F0] hover:bg-[#1a5bbf] text-white'
        }`}
    >
      <Image
        src={isAmazon ? '/amazon-logo.svg' : '/flipkart-logo.svg'}
        alt={isAmazon ? 'Amazon' : 'Flipkart'}
        width={28}
        height={28}
        className="flex-shrink-0"
      />
      <span>{isAmazon ? 'Buy on Amazon' : 'Buy on Flipkart'}</span>
      <ExternalLink size={16} className="opacity-70" />
    </a>
  );
}
