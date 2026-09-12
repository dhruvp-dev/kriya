'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Shield, Brain, Zap, Palette, Award, Trophy, Sparkles } from 'lucide-react';

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
      color: '#E54D42',
      bgColor: '#FDF2F1',
      icon: Shield,
      bars: '████████░░░░',
    },
    {
      key: 'intellect',
      label: 'Intellect',
      description: 'Deep focus, learning & mental clarity',
      value: 12,
      max: 15,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      icon: Brain,
      bars: '████████████░░░',
    },
    {
      key: 'discipline',
      label: 'Discipline',
      description: 'Consistency, daily habits & execution',
      value: 15,
      max: 20,
      color: '#2E9B72',
      bgColor: '#F0FDF4',
      icon: Zap,
      bars: '███████████████░░░░░',
    },
    {
      key: 'creativity',
      label: 'Creativity',
      description: 'Problem solving, design & synthesis',
      value: 10,
      max: 15,
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
      icon: Palette,
      bars: '██████████░░░░░',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#171A21] flex flex-col lg:flex-row font-sans">
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A21] tracking-tight">
              Character
            </h1>
            <p className="text-sm text-[#686C73] mt-1 font-medium">
              Your real-world attributes, level progression, and stats sheet.
            </p>
          </div>

          {/* Character Identity Hero Card */}
          <div className="bg-white border border-[#E5E1D9] rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row items-center gap-6">
            {/* Pixel Avatar Display */}
            <div className="w-24 h-24 rounded-2xl bg-[#202B3C] border-2 border-[#E5E1D9] flex items-center justify-center relative shrink-0">
              <span className="text-4xl">🧙‍♂️</span>
              <div className="absolute -bottom-2 bg-[#F05A3C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                LV. {userStats.level}
              </div>
            </div>

            <div className="space-y-2 text-center md:text-left flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
                <h2 className="text-xl font-extrabold text-[#171A21]">{userStats.displayName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F7F5F0] border border-[#E5E1D9] text-xs font-semibold text-[#686C73] w-fit mx-auto sm:mx-0">
                  {userStats.title}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-[#686C73]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FFB547]" />
                  <span className="font-technical font-semibold text-[#171A21]">
                    {userStats.currentXp.toLocaleString()} / {userStats.nextLevelXp.toLocaleString()} XP
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#F05A3C]" />
                  <span>{userStats.streak} day streak</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#FFB547]" />
                  <span>{userStats.gold} Gold</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attributes Section */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-[#171A21]">Attributes</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attributes.map((attr) => {
                const Icon = attr.icon;
                const percent = Math.round((attr.value / attr.max) * 100);

                return (
                  <div
                    key={attr.key}
                    className="bg-white border border-[#E5E1D9] rounded-2xl p-5 shadow-2xs space-y-4"
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
                          <h4 className="text-sm font-extrabold text-[#171A21]">{attr.label}</h4>
                          <p className="text-xs text-[#686C73]">{attr.description}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className="text-lg font-extrabold font-technical"
                          style={{ color: attr.color }}
                        >
                          {attr.value}
                        </span>
                        <span className="text-xs text-[#686C73]"> / {attr.max}</span>
                      </div>
                    </div>

                    {/* Restrained Attribute Progress Bar */}
                    <div className="space-y-1">
                      <div className="h-2 w-full bg-[#F7F5F0] border border-[#E5E1D9] rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%`, backgroundColor: attr.color }}
                        />
                      </div>
                      <div className="text-[10px] font-technical font-semibold tracking-wider text-[#686C73] pt-1">
                        {attr.bars}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
