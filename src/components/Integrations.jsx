import { memo } from 'react';
import { m } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../utils/animations';

const integrations = [
  { name: 'Google Meet', category: 'Live Meeting', color: '#00897B' },
  { name: 'Zoom', category: 'Live Meeting', color: '#2D8CFF' },
  { name: 'Microsoft Teams', category: 'Live Meeting', color: '#5059C9' },
  { name: 'Google Calendar', category: 'Auto-Scheduling', color: '#4285F4' },
  { name: 'Slack', category: 'Sync Notes', color: '#4A154B' },
  { name: 'Notion', category: 'Docs & Wiki', color: '#000000' },
  { name: 'Jira', category: 'Task Extraction', color: '#0052CC' },
  { name: 'HubSpot', category: 'CRM Sync', color: '#FF7A59' },
];

function Integrations() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12 sm:mb-16"
        >
          <m.h2
            variants={fadeUpVariant}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Connects seamlessly with your workflow.
          </m.h2>
          <m.p
            variants={fadeUpVariant}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium"
          >
            ARES joins meetings across all major conference platforms and automatically pushes action items directly to the tools you already use.
          </m.p>
        </m.div>

        {/* Integrations Grid */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {integrations.map((item) => (
            <m.div
              key={item.name}
              variants={fadeUpVariant}
              className="p-5 sm:p-6 bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg mb-3 shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: item.color }}
              >
                {item.name[0]}
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
              <span className="text-[11px] font-medium text-slate-500">
                {item.category}
              </span>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

export default memo(Integrations);
