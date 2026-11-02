import { useState, memo } from 'react';
import { m } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { pricingPlans } from '../data/pricing';
import { fadeUpVariant, staggerContainer } from '../utils/animations';
import { useAuth } from '../context/useAuth';

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { openSignUp, isAuthenticated } = useAuth();

  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC] scroll-mt-16" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-12"
        >
          <m.h2
            variants={fadeUpVariant}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Simple, transparent pricing
          </m.h2>
          <m.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Choose the perfect plan for your team. Scale as you grow.
          </m.p>

          {/* Billing Cycle Toggle */}
          <m.div variants={fadeUpVariant} className="mt-8 inline-flex items-center justify-center">
            <div className="bg-slate-200/80 p-1 rounded-full flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  !isAnnual
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={!isAnnual}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isAnnual
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={isAnnual}
              >
                <span>Annual</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isAnnual ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  Save 20%
                </span>
              </button>
            </div>
          </m.div>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch"
        >
          {pricingPlans.map((plan) => {
            const isHighlight = plan.highlight;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const frequency = isAnnual ? plan.annualFrequency : plan.monthlyFrequency;

            return (
              <m.div
                key={plan.id}
                variants={fadeUpVariant}
                className={`rounded-3xl p-8 flex flex-col relative transition-all duration-300 hover:scale-[1.02] ${
                  isHighlight
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/25 md:-translate-y-2 border border-blue-500 hover:shadow-2xl hover:shadow-blue-600/40'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'
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

                <div className="mb-2 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${isHighlight ? 'text-white' : 'text-slate-900'}`}>
                    {price}
                  </span>
                  {frequency && (
                    <span className={`text-sm font-medium ${isHighlight ? 'text-blue-200' : 'text-slate-500'}`}>
                      {frequency}
                    </span>
                  )}
                </div>

                <div className="h-6 mb-6">
                  {isAnnual && plan.annualNote && (
                    <p className={`text-xs font-semibold ${isHighlight ? 'text-blue-100' : 'text-emerald-600'}`}>
                      {plan.annualNote}
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className={`flex items-center text-sm font-medium ${
                        isHighlight ? 'text-white' : 'text-slate-700'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 mr-3 shrink-0 ${
                          isHighlight ? 'text-blue-300' : 'text-blue-600'
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    if (plan.id === 'enterprise') {
                      window.location.href = 'mailto:sales@ares.ai?subject=ARES%20Enterprise%20Inquiry';
                    } else {
                      openSignUp();
                    }
                  }}
                  className={`w-full block text-center px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer ${
                    isHighlight
                      ? 'bg-white text-blue-600 font-bold hover:bg-blue-50 shadow-md hover:shadow-lg focus-visible:ring-white'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:shadow-sm focus-visible:ring-blue-500'
                  }`}
                >
                  {isAuthenticated && plan.id !== 'enterprise' ? 'Select Plan' : plan.ctaText}
                </button>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

export default memo(Pricing);
