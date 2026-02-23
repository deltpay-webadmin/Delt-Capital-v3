import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function NewFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
    { question: t('faq.q9'), answer: t('faq.a9') },
    { question: t('faq.q10'), answer: t('faq.a10') },
  ];

  const leftColumnFaqs = faqs.filter((_, index) => index % 2 === 0);
  const rightColumnFaqs = faqs.filter((_, index) => index % 2 === 1);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderFaqItem = (faq: { question: string; answer: string }, index: number) => (
    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
      <button
        onClick={() => toggleFaq(index)}
        className="w-full flex items-start justify-between text-left gap-4 group"
      >
        <span className="text-lg font-semibold text-[#041E42] dark:text-white group-hover:text-[#1B17FF] dark:group-hover:text-[#1B17FF] transition-colors">
          {faq.question}
        </span>
        <Plus 
          className={`w-6 h-6 flex-shrink-0 transition-all ${
            openIndex === index 
              ? 'text-[#1B17FF] rotate-45' 
              : 'text-[#1B17FF] group-hover:scale-110'
          }`}
        />
      </button>
      {openIndex === index && (
        <div className="mt-4 pr-10 animate-in slide-in-from-top-2 duration-300">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <section id="new-faq-section" className="py-20 bg-white dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#041E42] dark:text-white">
            FAQ<span className="text-[#1B17FF]">.</span>
          </h2>
        </div>

        {/* Two Column FAQ Layout */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {/* Left Column */}
          <div className="space-y-8">
            {leftColumnFaqs.map((faq, idx) => renderFaqItem(faq, idx * 2))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {rightColumnFaqs.map((faq, idx) => renderFaqItem(faq, idx * 2 + 1))}
          </div>
        </div>
      </div>
    </section>
  );
}
