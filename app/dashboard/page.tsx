'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Plus, CheckSquare, Trophy } from 'lucide-react';
import { Sword, Brain, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import type { DashboardData, CompleteQuestResult, Quest } from '../../types/database.types';
import { getDashboardData } from '../../lib/queries/dashboard';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AttributeCard } from '../../components/rpg/AttributeCard';
import { QuestCard } from '../../components/rpg/QuestCard';
import { CreateQuestModal } from '../../components/rpg/CreateQuestModal';
import { EditQuestModal } from '../../components/rpg/EditQuestModal';
import { CelebrationOverlay } from '../../components/rpg/CelebrationOverlay';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [celebrationResult, setCelebrationResult] = useState<CompleteQuestResult | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const res = await getDashboardData();
    setData(res);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleQuestCompleteSuccess = (result: CompleteQuestResult) => {
    // Fire celebration modal if level up occurred or new achievement unlocked (SRS §23)
    if (result.leveled_up || (result.unlocked_achievements && result.unlocked_achievements.length > 0)) {
      setCelebrationResult(result);
    }
    // Refresh dashboard stats
    loadData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-400">Loading Character Dashboard...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-100">Session Expired or Character Not Found</h2>
        <p className="text-sm text-slate-400 mt-2 mb-4">Please log in to access your dashboard.</p>
        <Button variant="primary" onClick={() => (window.location.href = '/login')}>
          Log In
        </Button>
      </div>
    );
  }

  const { profile, character, attributes, pendingQuests, todayCompletedQuests, recentAchievements } = data;

  return (
    <div className="min-h-screen bg-[#0B0F19] flex">
      {/* Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content Shell */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          character={character}
          profile={profile}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/40">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Hero Dashboard
              </span>
              <h2 className="text-2xl font-black text-slate-100 mt-1">
                Welcome back, {profile.display_name}!
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Streak: {character.current_streak} days | Longest: {character.longest_streak} days
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsCreateModalOpen(true)}
              className="shrink-0"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" /> Create Quest
            </Button>
          </div>

          {/* 4 Fixed Attributes Grid */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Character Attributes
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <AttributeCard type="strength" value={attributes.strength} />
              <AttributeCard type="intellect" value={attributes.intellect} />
              <AttributeCard type="discipline" value={attributes.discipline} />
              <AttributeCard type="creativity" value={attributes.creativity} />
            </div>
          </section>

          {/* Active Quests & Pending Actions */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-100">
                  Pending Quests ({pendingQuests.length})
                </h3>
              </div>

              <Button variant="ghost" size="sm" onClick={() => (window.location.href = '/quests')}>
                View All Quests
              </Button>
            </div>

            {pendingQuests.length === 0 ? (
              <Card className="p-8 text-center border-dashed border-slate-800">
                <p className="text-sm text-slate-400">No pending quests!</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="mt-3"
                >
                  <Plus className="w-4 h-4" /> Create a Quest
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {pendingQuests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onEdit={(q) => setEditingQuest(q)}
                    onDeleted={() => loadData()}
                    onCompleteSuccess={handleQuestCompleteSuccess}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Today's Completed Quests & Recent Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recently Completed Quests */}
            <Card className="p-5 border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" /> Today's Completed Quests
              </h3>

              {todayCompletedQuests.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No quests completed yet today.</p>
              ) : (
                <div className="space-y-2">
                  {todayCompletedQuests.map((quest) => (
                    <div
                      key={quest.id}
                      className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-300">{quest.title}</span>
                      <span className="text-emerald-400 font-bold">Completed</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Achievements */}
            <Card className="p-5 border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-400" /> Recent Achievements
              </h3>

              {recentAchievements.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No achievements unlocked yet.</p>
              ) : (
                <div className="space-y-2">
                  {recentAchievements.map((ua) => (
                    <div
                      key={ua.id}
                      className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-purple-300">
                          {ua.achievement?.name || 'Achievement'}
                        </span>
                        <p className="text-[10px] text-slate-400">
                          {ua.achievement?.description}
                        </p>
                      </div>
                      <span className="text-purple-400 font-bold">Unlocked</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      {/* Modals & Overlays */}
      <CreateQuestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={() => loadData()}
      />

      <EditQuestModal
        quest={editingQuest}
        isOpen={Boolean(editingQuest)}
        onClose={() => setEditingQuest(null)}
        onUpdated={() => loadData()}
      />

      <CelebrationOverlay
        result={celebrationResult}
        onClose={() => setCelebrationResult(null)}
      />
    </div>
  );
}
