'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Volume2, VolumeX, Eye, EyeOff, Globe, User, Save } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

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

  const [settings, setSettings] = useState({
    soundEnabled: true,
    leaderboardVisible: false,
    timezone: 'Asia/Kolkata',
    displayName: 'Dhruv',
  });

  const handleSave = () => {
    showToast('success', 'Settings Saved', 'Your preferences have been updated.');
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#171A21] flex flex-col lg:flex-row font-sans">
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

        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A21] tracking-tight">
              Settings
            </h1>
            <p className="text-sm text-[#686C73] mt-1 font-medium">
              Configure application audio, privacy visibility, and profile details.
            </p>
          </div>

          <div className="bg-white border border-[#E5E1D9] rounded-2xl shadow-2xs divide-y divide-[#E5E1D9]">
            {/* Audio Toggle */}
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E1D9] flex items-center justify-center text-[#171A21]">
                  {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-[#F05A3C]" /> : <VolumeX className="w-5 h-5 text-[#686C73]" />}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#171A21]">Sound Effects</h3>
                  <p className="text-xs text-[#686C73] mt-0.5">
                    Play Web Audio synthesizer chimes on quest completion & gold spend.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.soundEnabled ? 'bg-[#F05A3C]' : 'bg-[#E5E1D9]'
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
                <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E1D9] flex items-center justify-center text-[#171A21]">
                  {settings.leaderboardVisible ? <Eye className="w-5 h-5 text-[#2E9B72]" /> : <EyeOff className="w-5 h-5 text-[#686C73]" />}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#171A21]">Leaderboard Visibility</h3>
                  <p className="text-xs text-[#686C73] mt-0.5">
                    Opt-in to display your Level and Total XP on public community rankings. (Defaults to OFF)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSettings((s) => ({ ...s, leaderboardVisible: !s.leaderboardVisible }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.leaderboardVisible ? 'bg-[#2E9B72]' : 'bg-[#E5E1D9]'
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
                <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E1D9] flex items-center justify-center text-[#171A21]">
                  <Globe className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#171A21]">Timezone</h3>
                  <p className="text-xs text-[#686C73] mt-0.5">
                    Used to calculate wall-clock calendar daily streak boundaries.
                  </p>
                </div>
              </div>

              <select
                value={settings.timezone}
                onChange={(e) => setSettings((s) => ({ ...s, timezone: e.target.value }))}
                className="px-3 py-2 bg-[#F7F5F0] border border-[#E5E1D9] rounded-xl text-xs font-semibold text-[#171A21] focus:outline-none focus:border-[#F05A3C]"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171A21] hover:bg-[#202B3C] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
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
