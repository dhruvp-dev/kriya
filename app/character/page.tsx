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
      description: 'Physical energy, endurance & momentum',
      value: 8,
      max: 12,
      color: '#C85A3D',
      bgColor: '#FBF0EC',
      icon: Shield,
      bars: '████████░░░░',
    },
    {
      key: 'intellect',
      label: 'Intellect',
      description: 'Deep focus, learning & mental clarity',
      value: 12,
      max: 15,
      color: '#344653',
      bgColor: '#F0F4F7',
      icon: Brain,
      bars: '████████████░░░',
    },
    {
      key: 'discipline',
      label: 'Discipline',
      description: 'Consistency, daily habits & execution',
      value: 15,
      max: 20,
      color: '#668F72',
      bgColor: '#F4F8F5',
      icon: Zap,
      bars: '███████████████░░░░░',
    },
    {
      key: 'creativity',
      label: 'Creativity',
      description: 'Problem solving, design & synthesis',
      value: 10,
      max: 15,
      color: '#D9A441',
      bgColor: '#FAF4E6',
      icon: Palette,
      bars: '██████████░░░░░',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F1E8] text-[#20231F] flex flex-col lg:flex-row font-sans">
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

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20231F] tracking-tight">
              Character Profile
            </h1>
            <p className="text-sm text-[#70736B] mt-1 font-medium">
              Your real-world attributes, level progression, and personality archetype.
            </p>
          </div>

          {/* Character Identity Hero Card */}
          <div className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row items-center gap-6">
            {/* KRIYA Custom SVG Pixel Avatar Display */}
            <div className="relative shrink-0 flex flex-col items-center">
              <Avatar variant="architect" size={96} frame="gold" />
              <div className="absolute -bottom-2 bg-[#C85A3D] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-20">
                LV. {userStats.level}
              </div>
            </div>

            <div className="space-y-2 text-center md:text-left flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
                <h2 className="text-xl font-extrabold text-[#20231F]">{userStats.displayName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F3F1E8] border border-[#DFDDD2] text-xs font-semibold text-[#70736B] w-fit mx-auto sm:mx-0">
                  {userStats.title}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-[#70736B]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span className="font-technical font-semibold text-[#20231F]">
                    {userStats.currentXp.toLocaleString()} / {userStats.nextLevelXp.toLocaleString()} XP
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#C85A3D]" />
                  <span>{userStats.streak} day streak</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#D9A441]" />
                  <span>{userStats.gold} Gold</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attributes Section */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-[#20231F]">Gameplay Attributes</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attributes.map((attr) => {
                const Icon = attr.icon;
                const percent = Math.round((attr.value / attr.max) * 100);

                return (
                  <div
                    key={attr.key}
                    className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl p-5 shadow-2xs space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: attr.bgColor, color: attr.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-[#20231F]">{attr.label}</h4>
                          <p className="text-xs text-[#70736B]">{attr.description}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className="text-lg font-extrabold font-technical"
                          style={{ color: attr.color }}
                        >
                          {attr.value}
                        </span>
                        <span className="text-xs text-[#70736B]"> / {attr.max}</span>
                      </div>
                    </div>

                    {/* Restrained Attribute Progress Bar */}
                    <div className="space-y-1">
                      <div className="h-2 w-full bg-[#F3F1E8] border border-[#DFDDD2] rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%`, backgroundColor: attr.color }}
                        />
                      </div>
                      <div className="text-[10px] font-technical font-semibold tracking-wider text-[#70736B] pt-1">
                        {attr.bars}
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

