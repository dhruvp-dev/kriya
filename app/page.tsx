import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B0F19] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Header Nav */}
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-600/30">
            K
          </div>
          <span className="text-2xl font-black tracking-tight">KRIYA</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="md">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="md">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
          <Zap className="w-3.5 h-3.5" /> Turn Real-World Action Into RPG Progression
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-100 leading-tight">
          Level Up Your Real Life.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400">
            One Quest At A Time.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
          Complete daily tasks, gain XP, earn Gold, boost your attributes, maintain your streak, and unlock powerful achievements.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/signup">
            <Button variant="primary" size="lg" className="text-base px-8 py-4">
              Create Your Character <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="lg" className="text-base px-8 py-4">
              Existing Adventurer? Log In
            </Button>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left w-full">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-200">RPG Mechanics</h3>
            <p className="text-xs text-slate-400 mt-2">
              Difficulty-driven XP rewards, gold economy, and exponential level calculations.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-200">Attribute Growth</h3>
            <p className="text-xs text-slate-400 mt-2">
              Every quest boosts Strength, Intellect, Discipline, or Creativity by +1.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-200">Shop & Achievements</h3>
            <p className="text-xs text-slate-400 mt-2">
              Spend Gold on themes and badges, and unlock data-driven achievement milestones.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
        Kriya RPG Progression Platform — Turn action into progress.
      </footer>
    </div>
  );
}
