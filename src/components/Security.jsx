import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Server } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../utils/animations';

const securityFeatures = [
  {
    id: 'enterprise-security',
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'SOC2 Type II compliant. Your data is processed securely and never used to train public AI models.',
    iconColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'end-to-end-encryption',
    icon: Lock,
    title: 'End-to-End Encryption',
    desc: 'All meetings, transcripts, and insights are encrypted at rest with AES-256 and in transit with TLS 1.3.',
    iconColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  {
    id: 'data-residency',
    icon: Server,
    title: 'Data Residency',
    desc: 'Choose where your data lives. We support local data residency across US, EU, and APAC regions.',
    iconColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
];

export default function Security() {
  return (
    <section aria-label="Security and Compliance" className="py-14 sm:py-16 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Eyebrow */}
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 sm:mb-10">
          Enterprise Security & Data Privacy
        </p>

        {/* 3 Modern Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {securityFeatures.map((sec) => {
            const Icon = sec.icon;

            return (
              <motion.div
                key={sec.id}
                variants={fadeUpVariant}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-7 hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-300 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border shadow-inner group-hover:scale-105 transition-transform duration-300 ${sec.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {sec.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-normal">
                    {sec.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
