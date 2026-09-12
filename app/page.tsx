import React from 'react';
import type { Metadata } from 'next';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { StorySection } from '../components/landing/StorySection';
import { CoreLoopSection } from '../components/landing/CoreLoopSection';
import { CharacterArchetypesSection } from '../components/landing/CharacterArchetypesSection';
import { WorldSection } from '../components/landing/WorldSection';
import { QuestSection } from '../components/landing/QuestSection';
import { StreakSection } from '../components/landing/StreakSection';
import { RewardsShelfSection } from '../components/landing/RewardsShelfSection';
import { EmptyAndLoadingShowcase } from '../components/landing/EmptyAndLoadingShowcase';
import { LandingFooter } from '../components/landing/LandingFooter';

export const metadata: Metadata = {
  title: 'KRIYA: Turn Action Into Progress',
  description: 'A beautiful modern productivity product wrapped in a warm illustrated pixel art world. Turn your real life into quests, build your character, and make your progress visible.',
  openGraph: {
    title: 'KRIYA: Turn Action Into Progress',
    description: 'A beautiful modern productivity product wrapped in a warm illustrated pixel art world.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="bg-[#FAF8F5] text-[#192420] min-h-screen font-sans selection:bg-[#1B4332] selection:text-[#FAF8F5] bg-warm-paper-grid">
      <LandingNavbar />
      <main>
        <HeroSection />
        <StorySection />
        <CoreLoopSection />
        <CharacterArchetypesSection />
        <WorldSection />
        <QuestSection />
        <StreakSection />
        <RewardsShelfSection />
        <EmptyAndLoadingShowcase />
      </main>
      <LandingFooter />
    </div>
  );
}
