'use client';

import { useState } from 'react';
import Accordion from '@/components/ui/Accordion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map(faq => (
        <Accordion 
          key={faq.id} 
          question={faq.question} 
          answer={faq.answer} 
          isOpen={openId === faq.id} 
          onToggle={() => handleToggle(faq.id)} 
        />
      ))}
    </div>
  );
}
