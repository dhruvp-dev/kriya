import React from 'react';
import { CheckCircle2, XCircle, Zap, Target, Award, RefreshCw } from 'lucide-react';

export function PhilosophySection() {
  const loopSteps = [
    { step: '01', title: 'Capture Action', desc: 'Define real-world tasks and deep work sprints.', icon: Target },
    { step: '02', title: 'Execute & Log', desc: 'Focus on actual execution without roleplay overhead.', icon: CheckCircle2 },
    { step: '03', title: 'Attribute Gain', desc: 'Earn calibrated XP and Gold across four core attributes.', icon: Award },
    { step: '04', title: 'Advance Profile', desc: 'Level up your distinctive blob avatar archetype.', icon: Zap },
    { step: '05', title: 'Maintain Momentum', desc: 'Preserve your daily streak through consistent output.', icon: RefreshCw },
  ];

  return (
    <section id="philosophy" className="py-20 bg-white border-t border-[#E6E6E8] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Philosophy Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="text-xs uppercase tracking-wider text-[#C85A3D] font-bold">
            Design Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#070709] tracking-tight">
            Built for real execution, not fantasy roleplay.
          </h2>
          <p className="text-base text-[#60606C] leading-relaxed">
            KRIYA keeps the satisfying core of progression (XP, levels, streaks, and cosmetics) without turning your productivity into a chaotic fantasy video game.
          </p>
        </div>

        {/* 3-Column Comparative Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Traditional Todo Apps */}
          <div className="bg-[#F7F7F8] border border-[#E6E6E8] p-6 rounded-2xl space-y-4">
            <div className="text-xs uppercase font-bold text-[#8B8B8B] tracking-wider">
              Traditional Todo Apps
            </div>
            <ul className="space-y-3 text-xs text-[#60606C]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B8B]" />
                <span>Binary checklists without sense of growth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B8B]" />
                <span>Zero momentum carryover across weeks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B8B]" />
                <span>Forgettable, dry spreadsheet feel</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B8B]" />
                <span>High abandonment rate after 14 days</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Fantasy Gamification Apps */}
          <div className="bg-[#F7F7F8] border border-[#E6E6E8] p-6 rounded-2xl space-y-4">
            <div className="text-xs uppercase font-bold text-[#8B8B8B] tracking-wider">
              Fantasy Gamified Apps
            </div>
            <ul className="space-y-3 text-xs text-[#60606C]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B8B]" />
                <span>Heavy fantasy RPG roleplay and lore</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B8B]" />
                <span>Distracting virtual combat and health bars</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B8B]" />
                <span>Excessive cartoon noise and childish gimmicks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B8B]" />
                <span>Feels like a chore on top of daily work</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Kriya */}
          <div className="bg-white border-2 border-[#070709] p-6 rounded-2xl shadow-md space-y-4 relative">
            <div className="inline-block text-[10px] uppercase font-bold text-white tracking-wider px-2.5 py-0.5 bg-[#070709] rounded-md">
              The KRIYA Standard
            </div>
            <ul className="space-y-3 text-xs text-[#070709] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#668F72] shrink-0" />
                <span>High-craft modern aesthetic SaaS interface</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#668F72] shrink-0" />
                <span>Subtle, meaningful character progression</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#668F72] shrink-0" />
                <span>Distinctive vector blob avatar archetypes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#668F72] shrink-0" />
                <span>Zero gamification noise or roleplay fluff</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Progression Steps */}
        <div className="space-y-6 pt-6 border-t border-[#E6E6E8]">
          <div className="text-center space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#60606C] font-bold">
              Five Disciplined Steps
            </div>
            <h3 className="text-xl font-bold text-[#070709]">The Architecture of Daily Progress</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {loopSteps.map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#F7F7F8] border border-[#E6E6E8] p-5 rounded-xl flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="tabular-nums text-xs font-bold text-[#070709]">{item.step}</span>
                    <StepIcon className="w-4 h-4 text-[#60606C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#070709] text-sm">{item.title}</h4>
                    <p className="text-xs text-[#60606C] mt-1 leading-relaxed">{item.desc}</p>
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
