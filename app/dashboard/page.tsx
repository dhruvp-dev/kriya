'use client';

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Plus } from 'lucide-react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { CharacterProgressionCard } from '../../components/rpg/CharacterProgressionCard';
import { QuestCard, QuestItem } from '../../components/rpg/QuestCard';
import { RightSidebar, AttributeData, AchievementItem, ActivityItem } from '../../components/rpg/RightSidebar';
import { CreateQuestModal } from '../../components/rpg/CreateQuestModal';
import { CelebrationOverlay } from '../../components/rpg/CelebrationOverlay';
import { useToast } from '../../components/ui/Toast';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getQuestsData } from '../../lib/queries/quests';
import { completeQuestAction, createQuestAction } from '../../lib/actions/quests';
import { getXpThreshold, getRewardForDifficulty, calculateLevel } from '../../lib/progression';

export default function DashboardPage() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Strength' | 'Intellect' | 'Discipline' | 'Creativity'>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Level Up Celebration state
  const [celebrationState, setCelebrationState] = useState<{
    isOpen: boolean;
    newLevel: number;
    rewardGold: number;
  }>({
    isOpen: false,
    newLevel: 13,
    rewardGold: 100,
  });

  // Database / Local Character State
  const [userStats, setUserStats] = useState<{
    level: number;
    currentXp: number;
    nextLevelXp: number;
    gold: number;
    streak: number;
    displayName: string;
    avatarVariant?: string;
  } | null>(null);

  const [attributes, setAttributes] = useState<AttributeData>({
    strength: 0,
    intellect: 0,
    discipline: 0,
    creativity: 0,
  });

  // Quests State
  const [quests, setQuests] = useState<QuestItem[]>([]);

  // Achievements State
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);

  // Activity Feed
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Load Database Data (Supabase Fallback)
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [dashData, dbQuests] = await Promise.all([
        getDashboardData(),
        getQuestsData(),
      ]);

      if (dashData && dashData.character && dashData.profile) {
        const { character, profile, attributes: dbAttr } = dashData;
        const nextThreshold = getXpThreshold(character.level + 1);

        let avatarVariant = 'architect';
        if (profile.avatar_config) {
          try {
            const parsed = typeof profile.avatar_config === 'string' ? JSON.parse(profile.avatar_config) : profile.avatar_config;
            if (parsed?.baseModel) avatarVariant = parsed.baseModel;
          } catch {}
        }

        setUserStats({
          level: character.level,
          currentXp: character.total_xp,
          nextLevelXp: nextThreshold,
          gold: character.gold,
          streak: character.current_streak,
          displayName: profile.display_name || 'Hero',
          avatarVariant,
        });

        if (dbAttr) {
          setAttributes({
            strength: dbAttr.strength || 0,
            intellect: dbAttr.intellect || 0,
            discipline: dbAttr.discipline || 0,
            creativity: dbAttr.creativity || 0,
          });
        }

        if (dashData.todayCompletedQuests && dashData.todayCompletedQuests.length > 0) {
          setActivities(
            dashData.todayCompletedQuests.map((q) => {
              const reward = getRewardForDifficulty((q.difficulty?.toLowerCase() as any) || 'medium');
              return {
                id: `act-${q.id}`,
                title: 'Completed quest',
                subtext: q.title,
                xp: reward.xp,
                gold: reward.gold,
                timeAgo: 'Today',
                type: 'quest',
              };
            })
          );
        } else {
          setActivities([]);
        }

        if (dashData.recentAchievements && dashData.recentAchievements.length > 0) {
          setAchievements(
            dashData.recentAchievements.map((ua: any) => ({
              id: ua.id || ua.achievement_id,
              title: ua.achievements?.title || 'Achievement Unlocked',
              description: ua.achievements?.description || 'Milestone reached',
              unlocked: true,
            }))
          );
        }
      } else {
        // Fallback for new / non-authenticated sessions
        setUserStats({
          level: 1,
          currentXp: 0,
          nextLevelXp: 100,
          gold: 0,
          streak: 0,
          displayName: 'Hero',
          avatarVariant: 'architect',
        });
      }

      if (dbQuests && dbQuests.length > 0) {
        setQuests(
          dbQuests.map((q) => {
            const reward = getRewardForDifficulty(
              (q.difficulty?.toLowerCase() as any) || 'medium'
            );
            return {
              id: q.id,
              title: q.title,
              description: q.description || undefined,
              attribute: (q.attribute as any) || 'intellect',
              difficulty: (q.difficulty?.toUpperCase() as any) || 'MEDIUM',
              xp: reward.xp,
              gold: reward.gold,
              completed: q.status === 'completed',
            };
          })
        );
      } else {
        setQuests([]);
      }
    } catch (err) {
      setUserStats({
        level: 1,
        currentXp: 0,
        nextLevelXp: 100,
        gold: 0,
        streak: 0,
        displayName: 'Hero',
        avatarVariant: 'architect',
      });
      setQuests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Complete Quest Handler
  const handleCompleteQuest = async (questId: string) => {
    const targetQuest = quests.find((q) => q.id === questId);
    if (!targetQuest || targetQuest.completed) return;

    // 1. Optimistic UI update (Checkmark only)
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
    );

    try {
      // Try database RPC completion
      const dbResult = await completeQuestAction(questId);

      if (dbResult && dbResult.success && dbResult.data) {
        const res = dbResult.data;
        setUserStats((prev) => prev ? ({
          ...prev,
          level: res.new_level,
          currentXp: res.total_xp,
          nextLevelXp: getXpThreshold(res.new_level + 1),
          gold: prev.gold + res.gold_gained,
          streak: res.current_streak,
        }) : null);

        setAttributes((prev) => ({
          ...prev,
          [res.attribute_increased]:
            (prev[res.attribute_increased as keyof AttributeData] || 0) + 1,
        }));

        setActivities((prev) => [
          {
            id: `act-${Date.now()}`,
            title: 'Completed quest',
            subtext: targetQuest.title,
            xp: res.xp_gained,
            gold: res.gold_gained,
            timeAgo: 'Just now',
            type: 'quest',
          },
          ...prev,
        ]);

        if (res.leveled_up) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setCelebrationState({
            isOpen: true,
            newLevel: res.new_level,
            rewardGold: 100,
          });
        }

        showToast(
          'success',
          'Quest Completed!',
          `+${res.xp_gained} XP  •  +${res.gold_gained} Gold`
        );
      } else {
        // Fallback local RPG Engine calculation
        const reward = getRewardForDifficulty(targetQuest.difficulty.toLowerCase() as any);
        const currentLevel = userStats?.level || 1;
        const currentXp = userStats?.currentXp || 0;
        const currentGold = userStats?.gold || 0;
        const newXp = currentXp + reward.xp;
        const newGold = currentGold + reward.gold;
        const { newLevel, leveledUp } = calculateLevel(newXp, currentLevel);
        const nextThreshold = getXpThreshold(newLevel + 1);

        setUserStats((prev) => ({
          level: newLevel,
          currentXp: newXp,
          nextLevelXp: nextThreshold,
          gold: newGold,
          streak: prev?.streak || 0,
          displayName: prev?.displayName || 'Hero',
          avatarVariant: prev?.avatarVariant || 'architect',
        }));

        setAttributes((prev) => ({
          ...prev,
          [targetQuest.attribute]:
            (prev[targetQuest.attribute as keyof AttributeData] || 0) + 1,
        }));

        setActivities((prev) => [
          {
            id: `act-${Date.now()}`,
            title: 'Completed quest',
            subtext: targetQuest.title,
            xp: reward.xp,
            gold: reward.gold,
            timeAgo: 'Just now',
            type: 'quest',
          },
          ...prev,
        ]);

        if (leveledUp) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setCelebrationState({
            isOpen: true,
            newLevel,
            rewardGold: 100,
          });
        }

        showToast(
          'success',
          'Quest Completed!'
        );
      }
    } catch (err) {
      // Rollback optimistic completion state
      setQuests((prev) =>
        prev.map((q) => (q.id === questId ? { ...q, completed: false } : q))
      );
      showToast('error', 'Quest Completion Failed');
    }
  };

  const handleCreateQuest = async (newQuestData: any) => {
    try {
      const dbResult = await createQuestAction(newQuestData);

      if (dbResult && dbResult.success && dbResult.data) {
        const qData = dbResult.data;
        const reward = getRewardForDifficulty(qData.difficulty.toLowerCase() as any);
        const newQuest: QuestItem = {
          id: qData.id,
          title: qData.title,
          description: qData.description || undefined,
          attribute: qData.attribute as any,
          difficulty: qData.difficulty.toUpperCase() as any,
          xp: reward.xp,
          gold: reward.gold,
          completed: false,
        };
        setQuests((prev) => [newQuest, ...prev]);
      } else {
        const reward = getRewardForDifficulty(newQuestData.difficulty.toLowerCase() as any);
        const newQuest: QuestItem = {
          id: `q-${Date.now()}`,
          title: newQuestData.title,
          description: newQuestData.description || undefined,
          attribute: newQuestData.attribute,
          difficulty: newQuestData.difficulty.toUpperCase() as any,
          xp: reward.xp,
          gold: reward.gold,
          completed: false,
        };
        setQuests((prev) => [newQuest, ...prev]);
      }

      setIsCreateModalOpen(false);
      showToast('success', 'Quest Created');
    } catch (err) {
      setIsCreateModalOpen(false);
      showToast('error', 'Failed to create quest.');
    }
  };

  const pendingQuests = quests.filter((q) => !q.completed);
  const filteredTodayQuests = pendingQuests.filter((q) =>
    activeFilter === 'All' ? true : q.attribute.toLowerCase() === activeFilter.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="home"
        isLoading={isLoading}
        userStats={userStats || undefined}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen bg-[#FFFFFF]">
        <Header
          isLoading={isLoading}
          userStats={userStats || undefined}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Progression Component */}
            <CharacterProgressionCard
              isLoading={isLoading}
              userStats={userStats || undefined}
              completedQuestsCount={quests.filter((q) => q.completed).length}
            />

            {/* Today's Quests Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#151515] tracking-tight">
                    Today&apos;s Quests
                  </h2>
                  <p className="text-xs text-[#8B8B8B] mt-0.5">
                    Small actions. Visible progress.
                  </p>
                </div>

                {/* Attribute Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {(['All', 'Strength', 'Intellect', 'Discipline', 'Creativity'] as const).map(
                    (filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                          activeFilter === filter
                            ? 'bg-[#070709] text-white'
                            : 'text-[#60606C] hover:text-[#070709] hover:bg-[#F3F4F5]'
                        }`}
                      >
                        {filter}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Quest Rows */}
              {isLoading ? (
                <div className="grid grid-cols-1 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E6E6E8] animate-pulse flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <div className="w-5 h-5 rounded-full bg-[#F3F4F5] shrink-0" />
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="h-4 w-44 bg-[#E6E6E8] rounded" />
                          <div className="h-3 w-60 bg-[#F3F4F5] rounded" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="h-6 w-16 bg-[#F3F4F5] rounded-lg" />
                        <div className="h-6 w-16 bg-[#F3F4F5] rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredTodayQuests.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {filteredTodayQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onComplete={handleCompleteQuest}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[#F7F7F8] border border-[#E6E6E8] rounded-2xl p-10 text-center space-y-3">
                  <h3 className="text-base font-bold text-[#151515]">No quests pending</h3>
                  <p className="text-xs text-[#60606C] max-w-xs mx-auto leading-relaxed">
                    Turn something you want to accomplish into your first quest today.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#070709] hover:bg-[#1B1C1F] text-white text-xs font-semibold rounded-lg transition-all shadow-xs cursor-pointer mt-1"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Create Quest</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Widgets */}
          <div className="lg:col-span-4">
            <RightSidebar
              isLoading={isLoading}
              level={userStats?.level ?? 1}
              displayName={userStats?.displayName || 'Hero'}
              avatarVariant={userStats?.avatarVariant || 'architect'}
              attributes={attributes}
              achievements={achievements}
              activities={activities}
            />
          </div>
        </div>
      </main>

      <CreateQuestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateQuest={handleCreateQuest}
      />

      <CelebrationOverlay
        isOpen={celebrationState.isOpen}
        onClose={() => setCelebrationState((prev) => ({ ...prev, isOpen: false }))}
        newLevel={celebrationState.newLevel}
        rewardGold={celebrationState.rewardGold}
      />
    </div>
  );
}
