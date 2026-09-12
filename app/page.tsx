import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '../lib/supabase/server';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { TabbedFeatureSection } from '../components/landing/TabbedFeatureSection';
import { BentoGridSection } from '../components/landing/BentoGridSection';
import { StatsQuotesSection } from '../components/landing/StatsQuotesSection';
import { FaqSection } from '../components/landing/FaqSection';
import { SkyCtaBanner } from '../components/landing/SkyCtaBanner';
import { LandingFooter } from '../components/landing/LandingFooter';

export const metadata: Metadata = {
  title: 'Kriya — Turn Action Into Progress',
  description:
    'Turn everyday actions into quests, earn XP, build your character, and make your progress visible.',
  openGraph: {
    title: 'Kriya — Turn Action Into Progress',
    description:
      'Turn everyday actions into quests, earn XP, build your character, and make your progress visible.',
    type: 'website',
  },
};

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="bg-[#FFFFFF] text-[#070709] min-h-[100dvh] font-sans selection:bg-[#070709] selection:text-[#FFFFFF]">
      <LandingNavbar />
      <main>
        <HeroSection />
        <TabbedFeatureSection />
        <BentoGridSection />
        <StatsQuotesSection />
        <FaqSection />
        <SkyCtaBanner />
      </main>
      <LandingFooter />
    </div>
  );
}
