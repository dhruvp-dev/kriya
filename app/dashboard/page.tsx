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
  const [userStats, setUserStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
  });

  const [attributes, setAttributes] = useState<AttributeData>({
    strength: 8,
    intellect: 12,
    discipline: 15,
    creativity: 10,
  });

  // Quests State
  const [quests, setQuests] = useState<QuestItem[]>([
    {
      id: 'q-1',
      title: 'Study React API Architecture',
      description: 'Review custom hooks and state management patterns.',
      attribute: 'intellect',
      difficulty: 'MEDIUM',
      xp: 50,
      gold: 15,
      completed: false,
    },
    {
      id: 'q-2',
      title: '30 minute workout',
      description: 'Build momentum through daily physical movement.',
      attribute: 'strength',
      difficulty: 'MEDIUM',
      xp: 50,
      gold: 15,
      completed: false,
    },
    {
      id: 'q-3',
      title: 'Read 20 pages of non-fiction',
      description: 'Focus mindfully without digital distractions.',
      attribute: 'discipline',
      difficulty: 'EASY',
      xp: 20,
      gold: 5,
      completed: false,
    },
    {
      id: 'q-4',
      title: 'Design retro typography tokens',
      description: 'Refine micro-spacing and chamfered card details.',
      attribute: 'creativity',
      difficulty: 'HARD',
      xp: 100,
      gold: 30,
      completed: false,
    },
  ]);

  // Achievements State
  const [achievements] = useState<AchievementItem[]>([
    {
      id: 'ach-1',
      title: 'FIRST STEP',
      description: 'Complete 1 quest',
      unlocked: true,
    },
    {
      id: 'ach-2',
      title: 'CONSISTENT',
      description: '7-day streak',
      unlocked: true,
    },
    {
      id: 'ach-3',
      title: 'SCHOLAR',
      description: 'Reach Level 10',
      unlocked: true,
    },
    {
      id: 'ach-4',
      title: 'DISCIPLINE MASTER',
      description: 'Complete 25 Discipline quests',
      unlocked: false,
    },
  ]);

  // Activity Feed
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 'act-1',
      title: 'Completed quest',
      subtext: 'Study React API Architecture',
      xp: 50,
      gold: 15,
      timeAgo: 'Just now',
      type: 'quest',
    },
    {
      id: 'act-2',
      title: 'Reached Level 12',
      timeAgo: 'Yesterday',
      type: 'level',
    },
  ]);

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

        setUserStats({
          level: character.level,
          currentXp: character.total_xp,
          nextLevelXp: nextThreshold,
          gold: character.gold,
          streak: character.current_streak,
          displayName: profile.display_name || 'Dhruv',
        });

        if (dbAttr) {
          setAttributes({
            strength: dbAttr.strength || 0,
            intellect: dbAttr.intellect || 0,
            discipline: dbAttr.discipline || 0,
            creativity: dbAttr.creativity || 0,
          });
        }
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
      }
    } catch (err) {
      // Graceful fallback to client state
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
        setUserStats((prev) => ({
          ...prev,
          level: res.new_level,
          currentXp: res.total_xp,
          nextLevelXp: getXpThreshold(res.new_level + 1),
          gold: prev.gold + res.gold_gained,
          streak: res.current_streak,
        }));

        setAttributes((prev) => ({
          ...prev,
          [res.attribute_increased]:
            (prev[res.attribute_increased as keyof AttributeData] || 0) + 1,
        }));

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
        const newXp = userStats.currentXp + reward.xp;
        const newGold = userStats.gold + reward.gold;
        const { newLevel, leveledUp } = calculateLevel(newXp, userStats.level);
        const nextThreshold = getXpThreshold(newLevel + 1);

        setUserStats((prev) => ({
          ...prev,
          level: newLevel,
          currentXp: newXp,
          nextLevelXp: nextThreshold,
          gold: newGold,
        }));

        setAttributes((prev) => ({
          ...prev,
          [targetQuest.attribute]:
            (prev[targetQuest.attribute as keyof AttributeData] || 0) + 1,
        }));

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
    <div className="min-h-screen bg-[#F7F5F0] text-[#171A21] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="home"
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          userStats={userStats}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Progression Hero Card */}
            <CharacterProgressionCard userStats={userStats} />

            {/* Today's Quests Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-[#171A21] tracking-tight">
                    Today’s quests
                  </h2>
                  <p className="text-xs text-[#686C73] font-medium mt-0.5">
                    Small actions. Real progress.
                  </p>
                </div>

                {/* Attribute Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {(['All', 'Strength', 'Intellect', 'Discipline', 'Creativity'] as const).map(
                    (filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          activeFilter === filter
                            ? 'bg-[#171A21] text-white shadow-2xs'
                            : 'text-[#686C73] hover:text-[#171A21] hover:bg-[#EAE6DE]'
                        }`}
                      >
                        {filter}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Quest Cards */}
              {filteredTodayQuests.length > 0 ? (
                <div className="grid grid-cols-1 gap-3.5">
                  {filteredTodayQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onComplete={handleCompleteQuest}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#E5E1D9] rounded-2xl p-8 text-center space-y-2">
                  <h3 className="text-sm font-bold text-[#171A21]">No quests pending</h3>
                  <p className="text-xs text-[#686C73]">
                    Nothing planned yet. Create your first quest and start building momentum.
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F05A3C] hover:bg-[#D9482B] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Quest</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Widgets */}
          <div className="lg:col-span-4">
            <RightSidebar
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
