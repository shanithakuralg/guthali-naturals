'use client';
import { ChevronDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Accordion({ question, answer, isOpen, onToggle }: AccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white mb-4 shadow-sm">
      <button
        className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none transition-colors"
        onClick={onToggle}
      >
        <span className="font-medium text-left text-gray-900">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-brand-green' : ''}`}
        />
      </button>
      <div
        className="transition-[height] duration-300 ease-in-out overflow-hidden"
        style={{ height: height !== undefined ? height : 'auto' }}
      >
        <div ref={contentRef} className="px-6 pb-4 pt-0 text-gray-600 text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
