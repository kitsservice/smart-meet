import { memo } from 'react';
import { m } from 'framer-motion';
import { ShieldCheck, Award, Mic, Cpu } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../utils/animations';

const stats = [
  {
    id: 'accuracy',
    value: '99.2%',
    label: 'Speech Accuracy',
    desc: 'Deepgram Nova-3 & Sarvam multilingual transcription tuned for global and regional accents.',
    icon: Mic,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    id: 'biometrics',
    value: '192-D',
    label: 'Neural Voice Calibration',
    desc: 'SpeechBrain ECAPA-TDNN neural embeddings for automatic multi-speaker identification.',
    icon: Cpu,
    color: 'text-purple-600 bg-purple-50',
  },
  {
    id: 'rating',
    value: '4.9 ★',
    label: 'Google Play Store',
    desc: 'Highest rated Smart Meeting Assistance companion by fast-moving engineering & sales teams.',
    icon: Award,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    id: 'security',
    value: 'SOC 2',
    label: 'Type II Certified',
    desc: 'AES-256 encrypted at rest & TLS 1.3 in transit. Never used to train public AI models.',
    icon: ShieldCheck,
    color: 'text-emerald-600 bg-emerald-50',
  },
];

function StatsBar() {
  return (
    <section className="py-12 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <m.div
                key={stat.id}
                variants={fadeUpVariant}
                className="flex flex-col p-4 rounded-2xl hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl shrink-0 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 font-normal leading-relaxed">
                  {stat.desc}
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

export default memo(StatsBar);
