'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Shield, Brain, Zap, Palette, Trophy, Sparkles } from 'lucide-react';
import { Avatar, AvatarGallery } from '../../components/avatars';

export default function CharacterPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
    title: 'Architect of Habits',
  });

  const attributes = [
    {
      key: 'strength',
      label: 'Strength',
      description: 'Physical energy, endurance, and daily momentum',
      value: 8,
      max: 12,
      color: '#C85A3D',
      bgColor: '#FDF4F2',
      icon: Shield,
    },
    {
      key: 'intellect',
      label: 'Intellect',
      description: 'Deep focus, learning, and mental clarity',
      value: 12,
      max: 15,
      color: '#344653',
      bgColor: '#F0F4F7',
      icon: Brain,
    },
    {
      key: 'discipline',
      label: 'Discipline',
      description: 'Consistency, habit completion, and execution',
      value: 15,
      max: 20,
      color: '#668F72',
      bgColor: '#F2F7F4',
      icon: Zap,
    },
    {
      key: 'creativity',
      label: 'Creativity',
      description: 'Problem solving, design thinking, and synthesis',
      value: 10,
      max: 15,
      color: '#D9A441',
      bgColor: '#FDF8EC',
      icon: Palette,
    },
  ];

  const xpPercentage = Math.min(100, Math.round((userStats.currentXp / userStats.nextLevelXp) * 100));

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="character"
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
              Character Profile
            </h1>
            <p className="text-sm text-[#60606C] mt-1 font-medium">
              Your real-world attributes, level progression, and personality archetype.
            </p>
          </div>

          {/* Character Identity Hero Card */}
          <div className="bg-white border border-[#E6E6E8] rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="relative shrink-0 flex flex-col items-center">
              <Avatar variant="architect" size={104} frame="gold" system="blob" />
              <div className="absolute -bottom-2.5 bg-[#070709] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs z-20">
                LV. {userStats.level}
              </div>
            </div>

            <div className="space-y-3 text-center md:text-left flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-center md:justify-start">
                <h2 className="text-xl font-bold text-[#070709]">{userStats.displayName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F7F7F8] border border-[#E6E6E8] text-xs font-semibold text-[#60606C] w-fit mx-auto sm:mx-0">
                  {userStats.title}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center justify-between text-xs text-[#60606C]">
                  <span className="font-semibold text-[#070709]">Level {userStats.level} Progression</span>
                  <span className="tabular-nums font-medium text-[#8B8B8B]">
                    {userStats.currentXp.toLocaleString()} / {userStats.nextLevelXp.toLocaleString()} XP ({xpPercentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#070709] rounded-full transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-1 text-xs font-medium text-[#60606C]">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#C85A3D]" />
                  <span className="tabular-nums font-semibold text-[#070709]">{userStats.streak} day streak</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span className="tabular-nums font-semibold text-[#070709]">{userStats.gold} Gold</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#668F72]" />
                  <span>The Architect Archetype</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attributes Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#070709] uppercase tracking-wider">
              Gameplay Attributes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attributes.map((attr) => {
                const Icon = attr.icon;
                const percent = Math.round((attr.value / attr.max) * 100);

                return (
                  <div
                    key={attr.key}
                    className="bg-white border border-[#E6E6E8] rounded-2xl p-5 shadow-xs space-y-3.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: attr.bgColor, color: attr.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#070709]">{attr.label}</h4>
                          <p className="text-xs text-[#60606C]">{attr.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className="text-base font-bold tabular-nums"
                          style={{ color: attr.color }}
                        >
                          {attr.value}
                        </span>
                        <span className="text-xs tabular-nums text-[#8B8B8B]"> / {attr.max}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-[#F3F4F5] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%`, backgroundColor: attr.color }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-[#8B8B8B] font-medium pt-0.5">
                        <span>Tier {Math.floor(attr.value / 5) + 1}</span>
                        <span className="tabular-nums">{percent}% Mastery</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive KRIYA Avatar Collection Gallery */}
          <AvatarGallery />
        </div>
      </main>
    </div>
  );
}
