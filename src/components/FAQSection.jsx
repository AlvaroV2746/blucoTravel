import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SchemaOrg from './SchemaOrg';
import { generateFAQPageSchema } from '../utils/schemas';

const FAQSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = t('faqs.items', { returnObjects: true }) || [];
  const faqSchema = generateFAQPageSchema(faqs);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <SchemaOrg schema={faqSchema} />

      <section className="mt-12 max-w-3xl mx-auto" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-cyan-500 pb-2 text-center">
          {t('faqs.title')}
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-white shadow border border-sky-100 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                  className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-blue-900 cursor-pointer transition-colors duration-300 hover:bg-sky-50 ${
                    isOpen ? 'bg-sky-50' : ''
                  }`}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-lg transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FAQSection;