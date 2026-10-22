interface BadgeProps {
  text: string;
  variant?: 'green' | 'gold' | 'olive' | 'red';
}

export default function Badge({ text, variant = 'green' }: BadgeProps) {
  const variants = {
    green: 'bg-brand-green text-white',
    gold: 'bg-brand-gold text-white',
    olive: 'bg-brand-olive text-white',
    red: 'bg-red-500 text-white',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm ${variants[variant]}`}>
      {text}
    </span>
  );
}
