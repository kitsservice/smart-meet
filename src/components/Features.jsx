import { motion } from 'framer-motion';
import { Mic, Sparkles, BrainCircuit } from 'lucide-react';
import { features } from '../data/features';
import { fadeUpVariant, staggerContainer } from '../utils/animations';

const iconMap = {
  Mic: Mic,
  Sparkles: Sparkles,
  BrainCircuit: BrainCircuit,
};

export default function Features() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC]" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mb-12 sm:mb-16"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Turn your meetings into action.
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-500 max-w-2xl font-medium leading-relaxed"
          >
            Record, transcribe, and extract intelligent insights from every conversation using our powerful AI.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((prod) => {
            const Icon = iconMap[prod.iconName] || Sparkles;
            return (
              <motion.div
                key={prod.id}
                variants={fadeUpVariant}
                className="bg-white p-8 rounded-2xl border border-slate-200/80 hover:shadow-lg hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 group flex flex-col"
              >
                <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{prod.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm mt-auto">{prod.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
