'use client';

import React from 'react';

export function StatsQuotesSection() {
  const testimonials = [
    {
      stat: '14.2 Days',
      statLabel: 'Average Streak Maintained',
      quote:
        '“We cut our habit drop-off rate by over 60% after switching to Kriya. Turning tasks into real quests gave me the same visceral dopamine as gaming, but with real-world fitness and engineering gains.”',
      name: 'David Chen',
      role: 'Senior Software Engineer & Runner',
      initials: 'DC',
      color: '#1D64EC',
    },
    {
      stat: '87%',
      statLabel: '30-Day Habit Retention Rate',
      quote:
        '“I’ve tried Todoist, Notion, and Habitica. Kriya is the only system that doesn’t feel childish or overwhelming. It feels like an executive dashboard for your personal life.”',
      name: 'Elena Rostova',
      role: 'Product Lead & Triathlete',
      initials: 'ER',
      color: '#10B981',
    },
    {
      stat: '3,162 XP',
      statLabel: 'Average Monthly Attribute Gain',
      quote:
        '“Watching my character evolve from a Novice to a Level 14 Scholar changed my relationship with daily writing. Kriya makes personal progression undeniable.”',
      name: 'Alex Barker',
      role: 'Author & Designer at Olabs',
      initials: 'AB',
      color: '#8B5CF6',
    },
  ];

  return (
    <section id="progression" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EBEBEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium text-[#070709] tracking-normal leading-tight">
            Our community is building momentum
          </h2>
          <p className="text-base sm:text-lg text-[#60606C] leading-relaxed font-normal tracking-normal">
            We value the personal growth of every practitioner. Here is what mindful achievers share after switching to Kriya.
          </p>
        </div>

        {/* 3 Asymmetric Rows */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 ${
                idx !== testimonials.length - 1 ? 'border-b border-[#F0F1F3]' : ''
              }`}
            >
              {/* Left Column: Huge Stat */}
              <div className="md:col-span-4 space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-[3.25rem] font-medium text-[#070709] tracking-normal tabular-nums">
                  {item.stat}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#8B8B8B] tracking-normal">
                  {item.statLabel}
                </div>
              </div>

              {/* Right Column: Clean White Quote Card */}
              <div className="md:col-span-8">
                <div className="bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-5">
                  <p className="text-sm sm:text-base text-[#1F2937] leading-relaxed font-normal tracking-normal">
                    {item.quote}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-xs"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-[#070709] tracking-normal">
                        {item.name}
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#8B8B8B] tracking-normal">
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
