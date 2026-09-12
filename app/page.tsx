import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '../lib/supabase/server';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { HabitToQuestGenerator } from '../components/landing/HabitToQuestGenerator';
import { ProductFacts } from '../components/landing/ProductFacts';
import { CoreLoopSection } from '../components/landing/CoreLoopSection';
import { QuestShowcase } from '../components/landing/QuestShowcase';
import { ProgressionShowcase } from '../components/landing/ProgressionShowcase';
import { CharacterShowcase } from '../components/landing/CharacterShowcase';
import { StreakSection } from '../components/landing/StreakSection';
import { AchievementsSection } from '../components/landing/AchievementsSection';
import { RewardsSection } from '../components/landing/RewardsSection';
import { WhyKriyaSection } from '../components/landing/WhyKriyaSection';
import { ProductTrustSection } from '../components/landing/ProductTrustSection';
import { FinalCtaSection } from '../components/landing/FinalCtaSection';
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
        <HabitToQuestGenerator />
        <ProductFacts />
        <CoreLoopSection />
        <QuestShowcase />
        <ProgressionShowcase />
        <CharacterShowcase />
        <StreakSection />
        <AchievementsSection />
        <RewardsSection />
        <WhyKriyaSection />
        <ProductTrustSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
