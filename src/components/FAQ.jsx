import { memo } from 'react';
import { m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/faqs';
import { fadeUpVariant, staggerContainer } from '../utils/animations';

function FAQ() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100 scroll-mt-16" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <m.h2
            variants={fadeUpVariant}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Frequently Asked Questions
          </m.h2>
          <m.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-500 font-medium"
          >
            Everything you need to know about ARES - Smart Meeting Assistance.
          </m.p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <m.details
              key={faq.id}
              variants={fadeUpVariant}
              className="group border border-slate-200 rounded-2xl bg-[#F8FAFC] hover:bg-slate-100/80 transition-colors [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900 select-none list-none text-base sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl">
                <span>{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform duration-300 shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed text-sm sm:text-base border-t border-slate-200/50 pt-4">
                {faq.answer}
              </div>
            </m.details>
          ))}
        </m.div>
      </div>
    </section>
  );
}

export default memo(FAQ);
