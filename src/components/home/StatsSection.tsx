'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import Counter from '@/components/animations/Counter';

const stats = [
  { label: 'Export Countries', value: 50, suffix: '+' },
  { label: 'Products', value: 500, suffix: '+' },
  { label: 'Global Reach', value: 100, suffix: '%' },
  { label: 'Quality Assurance', value: 100, suffix: '%' },
];

export default function StatsSection() {
  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => {
            return (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
