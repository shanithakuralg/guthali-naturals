import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'amazon' | 'flipkart';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  asExternal?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  asExternal,
  children,
  ...rest
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-brand-green text-white hover:bg-brand-green/90 focus:ring-brand-green',
    gold: 'bg-brand-gold text-white hover:bg-brand-gold/90 focus:ring-brand-gold',
    outline: 'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white focus:ring-brand-green',
    amazon: 'bg-[#FF9900] text-black hover:bg-[#FF9900]/90 focus:ring-[#FF9900]',
    flipkart: 'bg-[#2874F0] text-white hover:bg-[#2874F0]/90 focus:ring-[#2874F0]',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (asExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
}
