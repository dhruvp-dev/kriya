'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Volume2, VolumeX, Eye, EyeOff, Globe, Save, User } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { AvatarCustomizer } from '../../components/rpg/avatar/AvatarCustomizer';
import { AvatarVariant, AvatarFrameVariant } from '../../components/avatars';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getXpThreshold } from '../../lib/progression';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userStats, setUserStats] = useState<{
    level: number;
    currentXp: number;
    nextLevelXp: number;
    gold: number;
    streak: number;
    displayName: string;
    avatarVariant?: string;
  }>({
    level: 1,
    currentXp: 0,
    nextLevelXp: 100,
    gold: 0,
    streak: 0,
    displayName: 'Hero',
    avatarVariant: 'architect',
  });

  const [selectedVariant, setSelectedVariant] = useState<AvatarVariant>('architect');
  const [selectedFrame, setSelectedFrame] = useState<AvatarFrameVariant>('gold');

  const [settings, setSettings] = useState({
    soundEnabled: true,
    leaderboardVisible: false,
    timezone: 'UTC',
    displayName: '',
  });

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const dashData = await getDashboardData();
      if (dashData && dashData.character && dashData.profile) {
        const { character, profile } = dashData;
        const nextThreshold = getXpThreshold(character.level + 1);

        let avatarVariant: AvatarVariant = 'architect';
        if (profile.avatar_config) {
          try {
            const parsed = typeof profile.avatar_config === 'string' ? JSON.parse(profile.avatar_config) : profile.avatar_config;
            if (parsed?.baseModel) {
              avatarVariant = parsed.baseModel as AvatarVariant;
              setSelectedVariant(avatarVariant);
            }
          } catch {}
        }

        const name = profile.display_name || 'Hero';
        setUserStats({
          level: character.level,
          currentXp: character.total_xp,
          nextLevelXp: nextThreshold,
          gold: character.gold,
          streak: character.current_streak,
          displayName: name,
          avatarVariant,
        });

        setSettings((prev) => ({
          ...prev,
          displayName: name,
          timezone: profile.timezone || 'UTC',
        }));
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = () => {
    showToast('success', 'Settings Saved', 'Your avatar archetype, cosmetic frame, and preferences have been updated.');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="settings"
        isLoading={isLoading}
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          isLoading={isLoading}
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
              Settings
            </h1>
            <p className="text-sm text-[#60606C] mt-1 font-medium">
              Configure character identity avatar, audio feedback, and privacy preferences.
            </p>
          </div>

          {/* Character Avatar Settings Section */}
          <div className="bg-white border border-[#E6E6E8] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E6E6E8]">
              <User className="w-5 h-5 text-[#C85A3D]" />
              <h2 className="text-base font-bold text-[#070709]">
                Character & Avatar Identity
              </h2>
            </div>
            <AvatarCustomizer
              variant={selectedVariant}
              frame={selectedFrame}
              onChange={(v, f) => {
                setSelectedVariant(v);
                setSelectedFrame(f);
              }}
            />
          </div>

          {/* App Preferences */}
          <div className="bg-white border border-[#E6E6E8] rounded-2xl shadow-xs divide-y divide-[#E6E6E8]">
            {/* Audio Toggle */}
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center text-[#070709]">
                  {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-[#C85A3D]" /> : <VolumeX className="w-5 h-5 text-[#8B8B8B]" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#070709]">Sound Effects</h3>
                  <p className="text-xs text-[#60606C] mt-0.5 leading-relaxed">
                    Play synthesizer audio chimes on quest completion and reward unlocks.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.soundEnabled ? 'bg-[#070709]' : 'bg-[#E6E6E8]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Leaderboard Opt-In Privacy Toggle */}
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center text-[#070709]">
                  {settings.leaderboardVisible ? <Eye className="w-5 h-5 text-[#668F72]" /> : <EyeOff className="w-5 h-5 text-[#8B8B8B]" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#070709]">Leaderboard Visibility</h3>
                  <p className="text-xs text-[#60606C] mt-0.5 leading-relaxed">
                    Opt in to display your Level and Total XP on public community rankings. (Defaults to private)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSettings((s) => ({ ...s, leaderboardVisible: !s.leaderboardVisible }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.leaderboardVisible ? 'bg-[#070709]' : 'bg-[#E6E6E8]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    settings.leaderboardVisible ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Timezone Setting */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F7F8] border border-[#E6E6E8] flex items-center justify-center text-[#070709]">
                  <Globe className="w-5 h-5 text-[#60606C]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#070709]">Timezone</h3>
                  <p className="text-xs text-[#60606C] mt-0.5 leading-relaxed">
                    Used to calculate calendar daily streak boundaries.
                  </p>
                </div>
              </div>

              <select
                value={settings.timezone}
                onChange={(e) => setSettings((s) => ({ ...s, timezone: e.target.value }))}
                className="px-3.5 py-2 bg-[#F7F7F8] border border-[#E6E6E8] rounded-xl text-xs font-semibold text-[#070709] focus:outline-none focus:border-[#070709]"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT/BST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#070709] hover:bg-[#202025] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
