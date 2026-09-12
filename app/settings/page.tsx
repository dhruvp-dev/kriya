'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Volume2, VolumeX, Eye, EyeOff, Globe, Save, User } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { AvatarCustomizer } from '../../components/rpg/avatar/AvatarCustomizer';
import { AvatarVariant, AvatarFrameVariant } from '../../components/avatars';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
  });

  const [selectedVariant, setSelectedVariant] = useState<AvatarVariant>('architect');
  const [selectedFrame, setSelectedFrame] = useState<AvatarFrameVariant>('gold');

  const [settings, setSettings] = useState({
    soundEnabled: true,
    leaderboardVisible: false,
    timezone: 'Asia/Kolkata',
    displayName: 'Dhruv',
  });

  const handleSave = () => {
    showToast('success', 'Settings Saved', 'Your avatar archetype, cosmetic frame, and preferences have been updated.');
  };

  return (
    <div className="min-h-screen bg-[#F3F1E8] text-[#20231F] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="settings"
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20231F] tracking-tight">
              Settings
            </h1>
            <p className="text-sm text-[#70736B] mt-1 font-medium">
              Configure character identity avatar, audio preferences, and privacy settings.
            </p>
          </div>

          {/* Character Avatar Settings Section */}
          <div className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#DFDDD2]">
              <User className="w-5 h-5 text-[#C85A3D]" />
              <h2 className="text-base font-extrabold text-[#20231F]">
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
          <div className="bg-[#FFFDF7] border border-[#DFDDD2] rounded-2xl shadow-2xs divide-y divide-[#DFDDD2]">
            {/* Audio Toggle */}
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F3F1E8] border border-[#DFDDD2] flex items-center justify-center text-[#20231F]">
                  {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-[#C85A3D]" /> : <VolumeX className="w-5 h-5 text-[#70736B]" />}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#20231F]">Sound Effects</h3>
                  <p className="text-xs text-[#70736B] mt-0.5">
                    Play Web Audio synthesizer chimes on quest completion & gold spend.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.soundEnabled ? 'bg-[#C85A3D]' : 'bg-[#DFDDD2]'
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
                <div className="w-10 h-10 rounded-xl bg-[#F3F1E8] border border-[#DFDDD2] flex items-center justify-center text-[#20231F]">
                  {settings.leaderboardVisible ? <Eye className="w-5 h-5 text-[#668F72]" /> : <EyeOff className="w-5 h-5 text-[#70736B]" />}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#20231F]">Leaderboard Visibility</h3>
                  <p className="text-xs text-[#70736B] mt-0.5">
                    Opt-in to display your Level and Total XP on public community rankings. (Defaults to OFF)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSettings((s) => ({ ...s, leaderboardVisible: !s.leaderboardVisible }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.leaderboardVisible ? 'bg-[#668F72]' : 'bg-[#DFDDD2]'
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
                <div className="w-10 h-10 rounded-xl bg-[#F3F1E8] border border-[#DFDDD2] flex items-center justify-center text-[#20231F]">
                  <Globe className="w-5 h-5 text-[#344653]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#20231F]">Timezone</h3>
                  <p className="text-xs text-[#70736B] mt-0.5">
                    Used to calculate wall-clock calendar daily streak boundaries.
                  </p>
                </div>
              </div>

              <select
                value={settings.timezone}
                onChange={(e) => setSettings((s) => ({ ...s, timezone: e.target.value }))}
                className="px-3 py-2 bg-[#F3F1E8] border border-[#DFDDD2] rounded-xl text-xs font-semibold text-[#20231F] focus:outline-none focus:border-[#C85A3D]"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#20231F] hover:bg-[#344653] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
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
