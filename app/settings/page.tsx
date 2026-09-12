'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Save } from 'lucide-react';
import type { Profile } from '../../types/database.types';
import { AvatarConfig, DEFAULT_AVATAR_CONFIG } from '../../types/avatar.types';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getOwnedAccessoriesQuery } from '../../lib/queries/inventory';
import { updateProfileSettingsAction } from '../../lib/actions/profile';
import { updateAvatarConfigAction } from '../../lib/actions/avatar';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AvatarCustomizer } from '../../components/rpg/avatar3d/AvatarCustomizer';
import { useToast } from '../../components/ui/Toast';

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [characterData, setCharacterData] = useState<any>(null);
  const [displayName, setDisplayName] = useState('');
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR_CONFIG);
  const [ownedAccessories, setOwnedAccessories] = useState<string[]>([]);
  const [timezone, setTimezone] = useState('');
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    async function load() {
      const [dashRes, ownedRes] = await Promise.all([
        getDashboardData(),
        getOwnedAccessoriesQuery(),
      ]);

      if (dashRes?.profile) {
        setProfile(dashRes.profile);
        setDisplayName(dashRes.profile.display_name);
        setAvatarConfig(dashRes.profile.avatar_config || DEFAULT_AVATAR_CONFIG);
        setTimezone(dashRes.profile.timezone);
        setLeaderboardVisible(dashRes.profile.leaderboard_visible);
      }
      setCharacterData(dashRes);
      setOwnedAccessories(ownedRes);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      showToast('Display name cannot be empty.', 'error');
      return;
    }

    setIsSubmitting(true);

    const [profileRes, avatarRes] = await Promise.all([
      updateProfileSettingsAction({
        display_name: displayName.trim(),
        timezone: timezone.trim(),
        leaderboard_visible: leaderboardVisible,
      }),
      updateAvatarConfigAction(avatarConfig),
    ]);

    setIsSubmitting(false);

    if (!profileRes.success) {
      showToast(profileRes.error || 'Failed to update profile settings.', 'error');
      return;
    }

    if (!avatarRes.success) {
      showToast(avatarRes.error || 'Failed to update 3D avatar configuration.', 'error');
      return;
    }

    showToast('Settings & 3D Avatar saved successfully!', 'success');
    setProfile(avatarRes.data || profileRes.data);
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <span className="text-sm text-slate-400 font-semibold">Loading Settings...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          character={characterData?.character}
          profile={profile}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 space-y-6 max-w-4xl w-full mx-auto">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-black text-slate-100">Hero Settings</h1>
          </div>

          <Card className="p-6 border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    maxLength={50}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Timezone (for Streak Calculations)
                  </label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* 3D Avatar Customizer */}
              <div className="pt-4 border-t border-slate-800">
                <AvatarCustomizer
                  config={avatarConfig}
                  onChange={setAvatarConfig}
                  ownedAccessories={ownedAccessories}
                />
              </div>

              {/* Leaderboard Visibility Toggle */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Public Leaderboard Visibility</h3>
                  <p className="text-xs text-slate-400">
                    Opt-in to share your Level, Total XP, Display Name, and 3D Avatar on the global leaderboard.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={leaderboardVisible}
                    onChange={(e) => setLeaderboardVisible(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <Button type="submit" variant="primary" size="md" isLoading={isSubmitting}>
                  <Save className="w-4 h-4" /> Save Settings
                </Button>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
}
