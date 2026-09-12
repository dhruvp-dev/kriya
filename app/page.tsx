import React from 'react';
import type { Metadata } from 'next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { CharacterArchetypesSection } from '../components/landing/CharacterArchetypesSection';
import { CoreLoopSection } from '../components/landing/CoreLoopSection';
import { PhilosophySection } from '../components/landing/PhilosophySection';
import { QuestSection } from '../components/landing/QuestSection';
import { WorldSection } from '../components/landing/WorldSection';
import { StreakSection } from '../components/landing/StreakSection';
import { RewardsShelfSection } from '../components/landing/RewardsShelfSection';
import { EmptyAndLoadingShowcase } from '../components/landing/EmptyAndLoadingShowcase';
import { StorySection } from '../components/landing/StorySection';
import { LandingFooter } from '../components/landing/LandingFooter';

export const metadata: Metadata = {
  title: 'KRIYA: Aesthetic Productivity SaaS & Subtle RPG Progression',
  description: 'A modern aesthetic productivity SaaS paired with subtle RPG progression and distinctive blob avatars. Turn your real life into quests, build your character, and make your progress visible.',
  openGraph: {
    title: 'KRIYA: Aesthetic Productivity SaaS & Subtle RPG Progression',
    description: 'A modern aesthetic productivity SaaS paired with subtle RPG progression and distinctive blob avatars.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="bg-[#FFFFFF] text-[#070709] min-h-screen font-sans selection:bg-[#070709] selection:text-[#FFFFFF]">
      <LandingNavbar />
      <main>
        <HeroSection />
        <CharacterArchetypesSection />
        <CoreLoopSection />
        <PhilosophySection />
        <QuestSection />
        <WorldSection />
        <StreakSection />
        <RewardsShelfSection />
        <StorySection />
        <EmptyAndLoadingShowcase />
      </main>
      <LandingFooter />
    </div>
  );
}
