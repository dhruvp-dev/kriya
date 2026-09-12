import React from 'react';

export function ProductFacts() {
  const facts = [
    {
      figure: '4',
      label: 'CORE ATTRIBUTES',
      description: 'Strength, Intellect, Discipline, and Creativity dynamically weight your character progression.',
    },
    {
      figure: '∞',
      label: 'WAYS TO CREATE A QUEST',
      description: 'From 20 pages of reading to 5km interval runs or shipping production code.',
    },
    {
      figure: '1',
      label: 'CHARACTER TO BUILD',
      description: 'A personal vector blob avatar that tangibly evolves with your daily focus.',
    },
  ];

  return (
    <section className="py-14 sm:py-18 border-y border-[#E6E6E8] bg-[#F7F7F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {facts.map((fact, idx) => (
            <div
              key={fact.label}
              className={`space-y-2.5 ${
                idx > 0 ? 'md:border-l md:border-[#E6E6E8] md:pl-10' : ''
              }`}
            >
              <div className="text-5xl sm:text-6xl font-black text-[#070709] tracking-[-0.04em] tabular-nums">
                {fact.figure}
              </div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#070709]">
                {fact.label}
              </div>
              <p className="text-xs sm:text-sm text-[#60606C] leading-relaxed max-w-sm">
                {fact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
