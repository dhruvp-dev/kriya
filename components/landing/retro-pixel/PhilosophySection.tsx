import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Zap, Target, Award, Flame, RefreshCw } from 'lucide-react';

export function PhilosophySection() {
  const loopSteps = [
    { step: '01', title: 'DO', desc: 'Perform real-world actions and habits.', icon: Target },
    { step: '02', title: 'COMPLETE', desc: 'Log completed quests in your dashboard.', icon: CheckCircle2 },
    { step: '03', title: 'EARN', desc: 'Receive server-validated XP & Gold.', icon: Award },
    { step: '04', title: 'PROGRESS', desc: 'Watch your level and attributes advance.', icon: Zap },
    { step: '05', title: 'REPEAT', desc: 'Maintain daily streak momentum.', icon: RefreshCw },
  ];

  return (
    <section id="philosophy" className="py-20 bg-[#051F20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Editorial Philosophy Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-technical uppercase tracking-widest text-[#34D399] font-bold">
            DESIGN PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E2F1ED] tracking-tight leading-tight">
            BUILT FOR REAL LIFE, NOT FANTASY WORLDS.
          </h2>
          <p className="text-base sm:text-lg text-[#80A79D] leading-relaxed">
            Kriya keeps the satisfying parts of progression — XP, levels, streaks, and rewards — without turning your productivity into a game you have to roleplay.
          </p>
        </div>

        {/* 3-Column Comparative Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Traditional Todo Apps */}
          <div className="bg-[#0F3132] border border-[#1D5254] p-6 chamfer-panel space-y-4">
            <div className="text-xs font-technical uppercase font-bold text-[#80A79D] tracking-wider">
              TRADITIONAL TODO APPS
            </div>
            <ul className="space-y-3 text-sm text-[#80A79D]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80A79D]" />
                <span>Basic checklist tasks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80A79D]" />
                <span>Binary checkoff state</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80A79D]" />
                <span>No long-term momentum</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80A79D]" />
                <span>Forgettable experience</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Fantasy Productivity Apps */}
          <div className="bg-[#0F3132] border border-[#1D5254] p-6 chamfer-panel space-y-4">
            <div className="text-xs font-technical uppercase font-bold text-[#80A79D] tracking-wider">
              FANTASY PRODUCTIVITY APPS
            </div>
            <ul className="space-y-3 text-sm text-[#80A79D]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80A79D]" />
                <span>Heavy RPG roleplay mechanics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80A79D]" />
                <span>Distracting virtual worlds</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80A79D]" />
                <span>Excessive visual noise & neon</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80A79D]" />
                <span>Childish reward loops</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Kriya */}
          <div className="bg-[#0F3132] border-2 border-[#34D399] p-6 chamfer-panel shadow-md space-y-4 relative">
            <div className="inline-block text-xs font-technical uppercase font-bold text-[#34D399] tracking-wider px-2 py-0.5 bg-[#083B37] rounded-2xs">
              KRIYA ENGINE
            </div>
            <ul className="space-y-3 text-sm text-[#E2F1ED] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                <span>Real-world daily actions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                <span>Visible character progression</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                <span>Meaningful atomic rewards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                <span>Calm, tactile, cozy design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Progression Loop Sequence */}
        <div className="space-y-8 pt-8 border-t border-[#1D5254]">
          <div className="text-center space-y-1">
            <div className="text-xs font-technical uppercase tracking-widest text-[#80A79D] font-bold">
              THE KRIYA LOOP
            </div>
            <h3 className="text-2xl font-extrabold text-[#E2F1ED]">FIVE STEPS TO DAILY MOMENTUM</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {loopSteps.map((item, idx) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#0F3132] border border-[#1D5254] p-5 chamfer-panel flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-technical text-xs font-bold text-[#34D399]">{item.step}</span>
                    <StepIcon className="w-4 h-4 text-[#80A79D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#E2F1ED] text-base">{item.title}</h4>
                    <p className="text-xs text-[#80A79D] mt-1">{item.desc}</p>
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
