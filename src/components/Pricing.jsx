import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { pricingPlans } from '../data/pricing';
import { fadeUpVariant, staggerContainer } from '../utils/animations';

export default function Pricing() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC]" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Choose the perfect plan for your team. Scale as you grow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center"
        >
          {pricingPlans.map((plan) => {
            const isHighlight = plan.highlight;

            return (
              <motion.div
                key={plan.id}
                variants={fadeUpVariant}
                className={`rounded-3xl p-8 flex flex-col relative transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  isHighlight
                    ? 'bg-blue-600 text-white rounded-3xl p-8 shadow-xl shadow-blue-600/25 md:-translate-y-4 border border-blue-500 hover:shadow-2xl hover:shadow-blue-600/40'
                    : 'bg-white rounded-3xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 p-4">
                    <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-2 ${isHighlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 text-sm font-medium ${isHighlight ? 'text-blue-100' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <div className="mb-8 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${isHighlight ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  {plan.frequency && (
                    <span className={`text-sm font-medium ${isHighlight ? 'text-blue-200' : 'text-slate-500'}`}>
                      {plan.frequency}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center text-sm font-medium ${
                        isHighlight ? 'text-white' : 'text-slate-700'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 mr-3 shrink-0 ${
                          isHighlight ? 'text-blue-300' : 'text-slate-400'
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.ctaLink}
                  className={`w-full block text-center px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 mt-auto ${
                    isHighlight
                      ? 'bg-white text-blue-600 font-bold hover:bg-blue-50 shadow-md hover:shadow-lg'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  {plan.ctaText}
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
