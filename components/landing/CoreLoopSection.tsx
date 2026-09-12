import React from 'react';
import { ArrowRight, CheckCircle, Lightning, TrendUp, Compass } from '@phosphor-icons/react/dist/ssr';

export function CoreLoopSection() {
  const loopSteps = [
    {
      num: '01',
      verb: 'DO',
      subtitle: 'Take a real action.',
      body: 'Read 20 pages, go for a 5km run, ship a pull request, or reset your workspace. Real-world effort is the single input.',
      accent: 'text-[#070709]',
      dotBg: 'bg-[#070709]',
      icon: Compass,
    },
    {
      num: '02',
      verb: 'COMPLETE',
      subtitle: 'Mark your quest done.',
      body: 'A single crisp confirmation converts finished effort into a validated milestone with zero roleplay overhead.',
      accent: 'text-[#668F72]',
      dotBg: 'bg-[#668F72]',
      icon: CheckCircle,
    },
    {
      num: '03',
      verb: 'EARN',
      subtitle: 'Get XP and Gold.',
      body: 'Receive calibrated experience points mapped directly to difficulty, alongside Gold to collect character keepsakes.',
      accent: 'text-[#D9A441]',
      dotBg: 'bg-[#D9A441]',
      icon: Lightning,
    },
    {
      num: '04',
      verb: 'GROW',
      subtitle: 'Level up your character.',
      body: 'Watch your stats climb and your streak build. Your personal avatar evolves alongside your authentic daily habits.',
      accent: 'text-[#C85A3D]',
      dotBg: 'bg-[#C85A3D]',
      icon: TrendUp,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#070709] tracking-[-0.03em] leading-tight">
            TURN ACTION <br />
            INTO PROGRESS.
          </h2>
          <p className="text-base sm:text-lg text-[#60606C] leading-relaxed max-w-xl font-normal">
            A quiet, continuous four-step cycle that transforms daily consistency into tangible character momentum.
          </p>
        </div>

        {/* Oversized Connected Progression Sequence */}
        <div className="relative">
          {/* Subtle Horizontal Progression Track on Desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-0 right-0 h-[2px] bg-[#E6E6E8] z-0">
            <div className="h-full w-full bg-gradient-to-r from-[#070709] via-[#668F72] via-[#D9A441] to-[#C85A3D] opacity-40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 relative z-10">
            {loopSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.verb}
                  className="flex flex-col justify-between space-y-6 pt-4 group"
                >
                  {/* Top Node & Number */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      {/* Node on Progression Line */}
                      <div className="w-10 h-10 rounded-2xl bg-[#FFFFFF] border-2 border-[#E6E6E8] group-hover:border-[#070709] flex items-center justify-center shadow-xs transition-colors">
                        <span className={`w-3 h-3 rounded-full ${step.dotBg}`} />
                      </div>

                      <span className="text-sm font-extrabold text-[#8B8B8B] tabular-nums tracking-wider">
                        {step.num}
                      </span>
                    </div>

                    {/* Oversized Verb */}
                    <div className="space-y-1">
                      <div className={`text-4xl sm:text-5xl font-black tracking-[-0.03em] ${step.accent}`}>
                        {step.verb}
                      </div>
                      <div className="text-base font-bold text-[#070709]">
                        {step.subtitle}
                      </div>
                    </div>

                    {/* Body Detail */}
                    <p className="text-xs sm:text-sm text-[#60606C] leading-relaxed">
                      {step.body}
                    </p>
                  </div>

                  {/* Flow Arrow (Mobile/Tablet Indicator) */}
                  <div className="pt-4 border-t border-[#E6E6E8] flex items-center justify-between text-xs text-[#8B8B8B]">
                    <span className="font-semibold">Step {step.num}</span>
                    {idx < 3 ? (
                      <span className="text-[#8B8B8B] lg:hidden">&darr;</span>
                    ) : (
                      <span className="text-[#C85A3D] font-bold">Compounding</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
