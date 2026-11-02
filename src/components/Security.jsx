import { memo } from 'react';
import { m } from 'framer-motion';
import { ShieldCheck, Lock, Server } from 'lucide-react';
import { securityFeatures } from '../data/security';
import { fadeUpVariant, staggerContainer } from '../utils/animations';

const iconMap = {
  ShieldCheck,
  Lock,
  Server,
};

function Security() {
  return (
    <section aria-label="Security and Compliance" className="py-14 sm:py-16 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Eyebrow */}
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 sm:mb-10">
          Enterprise Security & Data Privacy
        </p>

        {/* 3 Modern Cards */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {securityFeatures.map((sec) => {
            const Icon = iconMap[sec.iconName] || ShieldCheck;

            return (
              <m.div
                key={sec.id}
                variants={fadeUpVariant}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-7 hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-300 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border shadow-inner group-hover:scale-105 transition-transform duration-300 ${sec.badgeColor}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {sec.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-normal">
                    {sec.desc}
                  </p>
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

export default memo(Security);
