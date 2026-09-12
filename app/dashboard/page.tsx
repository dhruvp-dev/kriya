'use client';

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Plus, Coins, Trophy } from 'lucide-react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { CharacterProgressionCard } from '../../components/rpg/CharacterProgressionCard';
import { QuestCard, QuestItem } from '../../components/rpg/QuestCard';
import { RightSidebar, AttributeData, AchievementItem, ActivityItem } from '../../components/rpg/RightSidebar';
import { CreateQuestModal } from '../../components/rpg/CreateQuestModal';
import { useToast } from '../../components/ui/Toast';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getQuestsData } from '../../lib/queries/quests';
import { createQuestAction, completeQuestAction } from '../../lib/actions/quests';
import { getXpThreshold, getRewardForDifficulty } from '../../lib/progression';

export default function DashboardPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [questFilter, setQuestFilter] = useState<'All' | 'Work' | 'Fitness' | 'Growth' | 'Completed'>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Real Database Character State
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

  // Real Quests State
  const [quests, setQuests] = useState<QuestItem[]>([
    {
      id: 'q-1',
      title: 'Study React',
      description: 'Build the API integration.',
      attribute: 'intellect',
      difficulty: 'MEDIUM',
      xp: 50,
      gold: 15,
      completed: false,
      subtasks: [
        { id: 'st-1', title: 'Review custom hooks logic', completed: true },
        { id: 'st-2', title: 'Implement typed query handlers', completed: false },
      ],
    },
    {
      id: 'q-2',
      title: 'Workout for 30 minutes',
      description: 'Move your body. Stronger you.',
      attribute: 'strength',
      difficulty: 'EASY',
      xp: 20,
      gold: 5,
      completed: false,
    },
    {
      id: 'q-3',
      title: 'Read 20 pages',
      description: 'Learn something new today.',
      attribute: 'discipline',
      difficulty: 'EASY',
      xp: 20,
      gold: 5,
      completed: false,
    },
    {
      id: 'q-4',
      title: 'Design retro UI components',
      description: 'Refine micro-typography and chamfered card borders.',
      attribute: 'creativity',
      difficulty: 'HARD',
      xp: 100,
      gold: 30,
      completed: false,
    },
  ]);

  // Real Achievements State
  const [achievements, setAchievements] = useState<AchievementItem[]>([
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
      subtext: 'Study React',
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
    {
      id: 'act-3',
      title: 'Achievement unlocked',
      subtext: 'Scholar',
      timeAgo: '2 days ago',
      type: 'achievement',
    },
  ]);

  // Load Real Supabase Database Data
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [dashData, dbQuests] = await Promise.all([
        getDashboardData(),
        getQuestsData(),
      ]);

      if (dashData && dashData.character && dashData.profile) {
        const { character, profile, attributes: dbAttr, recentAchievements } = dashData;

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

        if (recentAchievements && recentAchievements.length > 0) {
          setAchievements(
            recentAchievements.map((ua: any, i: number) => ({
              id: ua.id || `ach-${i}`,
              title: ua.achievement?.name || 'ACHIEVEMENT',
              description: ua.achievement?.description || 'Unlocked milestone',
              unlocked: true,
            }))
          );
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
              xp: q.xp_reward || reward.xp,
              gold: q.gold_reward || reward.gold,
              completed: q.status === 'completed',
            };
          })
        );
      }
    } catch {
      // Keep real fallback state active if user is guest or not signed in
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Real Quest Completion Action
  const handleCompleteQuest = async (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.completed) return;

    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#F05A3C', '#FFB547', '#2E9B72', '#202B3C'],
      });
    } catch {
      // Fallback
    }

    // Try executing database complete action if real quest UUID
    let dbSuccess = false;
    if (questId.includes('-') && questId.length > 20) {
      const res = await completeQuestAction(questId);
      if (res.success && res.data) {
        dbSuccess = true;
        if (res.data.leveled_up) {
          showToast(`🎉 LEVEL UP! You reached Level ${res.data.new_level}!`, 'success');
        } else {
          showToast(`+${res.data.xp_gained} XP & +${res.data.gold_gained} GOLD acquired!`, 'success');
        }
        loadData();
        return;
      }
    }

    // Client state update
    if (!dbSuccess) {
      setQuests((prev) =>
        prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
      );

      const newXp = userStats.currentXp + quest.xp;
      const newGold = userStats.gold + quest.gold;
      let newLevel = userStats.level;
      let nextXpThreshold = userStats.nextLevelXp;

      let leveledUp = false;
      if (newXp >= userStats.nextLevelXp) {
        newLevel += 1;
        nextXpThreshold = getXpThreshold(newLevel + 1);
        leveledUp = true;
      }

      setUserStats({
        ...userStats,
        level: newLevel,
        currentXp: newXp,
        nextLevelXp: nextXpThreshold,
        gold: newGold,
      });

      setAttributes((prev) => ({
        ...prev,
        [quest.attribute]: prev[quest.attribute] + 1,
      }));

      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: 'Completed quest',
          subtext: quest.title,
          xp: quest.xp,
          gold: quest.gold,
          timeAgo: 'Just now',
          type: 'quest',
        },
        ...prev,
      ]);

      if (leveledUp) {
        showToast(`🎉 LEVEL UP! You reached Level ${newLevel}!`, 'success');
      } else {
        showToast(`+${quest.xp} XP & +${quest.gold} GOLD acquired!`, 'success');
      }
    }
  };

  // Toggle Subtask
  const handleToggleSubtask = (questId: string, subtaskId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId && q.subtasks) {
          return {
            ...q,
            subtasks: q.subtasks.map((st) =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            ),
          };
        }
        return q;
      })
    );
  };

  // Real Create Quest Action
  const handleCreateQuest = async (newQuestData: {
    title: string;
    description: string;
    attribute: 'strength' | 'intellect' | 'discipline' | 'creativity';
    difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EPIC';
    xp: number;
    gold: number;
    subtasks?: string[];
  }) => {
    const res = await createQuestAction({
      title: newQuestData.title,
      description: newQuestData.description,
      attribute: newQuestData.attribute,
      difficulty: newQuestData.difficulty.toLowerCase() as any,
      category: 'general',
      is_recurring: false,
      recurrence: 'none',
    });

    if (res.success && res.data) {
      showToast('Quest created in database!', 'success');
      loadData();
      return;
    }

    const newQuest: QuestItem = {
      id: `q-${Date.now()}`,
      title: newQuestData.title,
      description: newQuestData.description,
      attribute: newQuestData.attribute,
      difficulty: newQuestData.difficulty,
      xp: newQuestData.xp,
      gold: newQuestData.gold,
      completed: false,
      subtasks: newQuestData.subtasks?.map((stTitle, idx) => ({
        id: `st-new-${idx}`,
        title: stTitle,
        completed: false,
      })),
    };

    setQuests([newQuest, ...quests]);
  };

  // Filtered Quests
  const filteredQuests = quests.filter((q) => {
    if (questFilter === 'Completed') return q.completed;
    if (questFilter === 'Work') return q.attribute === 'intellect';
    if (questFilter === 'Fitness') return q.attribute === 'strength';
    if (questFilter === 'Growth') return q.attribute === 'discipline' || q.attribute === 'creativity';
    return true;
  });

  const activeCount = quests.filter((q) => !q.completed).length;

  return (
    <div className="min-h-screen bg-editorial-grid text-[#171A21] flex font-sans">
      {/* Quiet Retro-Product Navigation Rail */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        userStats={userStats}
      />

      {/* Main Shell */}
      <div className="flex-1 lg:pl-60 flex flex-col min-w-0">
        {/* Header */}
        <Header
          displayName={userStats.displayName}
          gold={userStats.gold}
          streak={userStats.streak}
          level={userStats.level}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenCreateQuest={() => setIsCreateModalOpen(true)}
        />

        {/* Dynamic Main Body */}
        <main className="flex-1 p-4 lg:p-8 max-w-[1600px] w-full mx-auto space-y-8">
          {(activeTab === 'home' || activeTab === 'dashboard') && (
            <div className="flex flex-col xl:flex-row gap-8 items-start">
              {/* Main Content Column */}
              <div className="flex-1 min-w-0 space-y-8 w-full">
                {/* Visual Centerpiece: Main Progression */}
                <CharacterProgressionCard
                  level={userStats.level}
                  currentXp={userStats.currentXp}
                  nextLevelXp={userStats.nextLevelXp}
                  gold={userStats.gold}
                  streak={userStats.streak}
                />

                {/* TODAY'S QUESTS Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E5E1D9]">
                    <div className="flex items-baseline gap-3">
                      <h2 className="text-xl font-extrabold text-[#171A21] tracking-tight">
                        TODAY'S QUESTS
                      </h2>
                      <span className="text-xs font-semibold text-[#686C73]">
                        {activeCount} active
                      </span>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                      {(['All', 'Work', 'Fitness', 'Growth', 'Completed'] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setQuestFilter(filter)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                            questFilter === filter
                              ? 'bg-[#171A21] text-white shadow-2xs'
                              : 'bg-[#FFFFFF] text-[#686C73] hover:text-[#171A21] border border-[#E5E1D9]'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quest List */}
                  {filteredQuests.length === 0 ? (
                    <div className="bg-[#FFFFFF] border border-[#E5E1D9] rounded-xl p-8 text-center space-y-3">
                      <p className="text-sm font-medium text-[#686C73]">No quests match this filter.</p>
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 bg-[#F05A3C] text-white font-semibold text-xs rounded-lg uppercase tracking-wider"
                      >
                        + Create Quest
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredQuests.map((quest) => (
                        <QuestCard
                          key={quest.id}
                          quest={quest}
                          onComplete={handleCompleteQuest}
                          onToggleSubtask={handleToggleSubtask}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar (Character & Achievements) */}
              <RightSidebar
                level={userStats.level}
                attributes={attributes}
                achievements={achievements}
                activities={activities}
              />
            </div>
          )}

          {/* QUESTS VIEW */}
          {activeTab === 'quests' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl">
                <div>
                  <h2 className="text-2xl font-bold text-[#171A21]">Quests Log</h2>
                  <p className="text-xs text-[#686C73] mt-0.5">Manage daily task missions & objectives.</p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2.5 bg-[#F05A3C] text-white font-bold text-xs rounded-lg uppercase tracking-wider flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Create Quest
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={handleCompleteQuest}
                    onToggleSubtask={handleToggleSubtask}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CHARACTER VIEW */}
          {activeTab === 'character' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5E1D9] pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#171A21]">Character Sheet</h2>
                    <p className="text-xs text-[#686C73] mt-0.5">Level {userStats.level} Architect Operative</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center justify-center p-8 bg-[#F7F5F0] border border-[#E5E1D9] rounded-xl text-center">
                    <div className="w-28 h-28 rounded-full bg-[#202B3C] flex items-center justify-center border-4 border-[#F05A3C]">
                      <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                        <rect x="25" y="20" width="50" height="45" rx="8" fill="#283548" />
                        <rect x="30" y="32" width="40" height="10" rx="3" fill="#F05A3C" />
                        <path d="M15 85 C15 65 30 65 50 65 C70 65 85 65 85 85 Z" fill="#202B3C" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#171A21] mt-4">{userStats.displayName}</h3>
                    <p className="text-xs font-semibold text-[#686C73] mt-0.5">ARCHITECT</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-[#171A21] uppercase tracking-wider">Attributes Breakdown</h3>
                    <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E1D9] rounded-lg space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#DC2626]">
                        <span>STRENGTH</span>
                        <span>{String(attributes.strength).padStart(2, '0')}</span>
                      </div>
                      <p className="text-xs text-[#686C73]">Physical stamina, workouts, fitness endurance.</p>
                    </div>

                    <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E1D9] rounded-lg space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#2563EB]">
                        <span>INTELLECT</span>
                        <span>{String(attributes.intellect).padStart(2, '0')}</span>
                      </div>
                      <p className="text-xs text-[#686C73]">Coding, logic, system engineering, studying.</p>
                    </div>

                    <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E1D9] rounded-lg space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#2E9B72]">
                        <span>DISCIPLINE</span>
                        <span>{String(attributes.discipline).padStart(2, '0')}</span>
                      </div>
                      <p className="text-xs text-[#686C73]">Reading, habit consistency, streak building.</p>
                    </div>

                    <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E1D9] rounded-lg space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#7C3AED]">
                        <span>CREATIVITY</span>
                        <span>{String(attributes.creativity).padStart(2, '0')}</span>
                      </div>
                      <p className="text-xs text-[#686C73]">UI design, writing, side projects, exploration.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS VIEW */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-[#171A21]">Achievements</h2>
                <p className="text-xs text-[#686C73] mt-0.5">Unlocked milestones and badges.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FFFFFF] border border-[#E5E1D9] p-5 rounded-xl flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center shrink-0">
                      <Trophy className="w-5 h-5 text-[#D97706]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#171A21]">{item.title}</h3>
                      <p className="text-xs text-[#686C73] mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHOP VIEW */}
          {activeTab === 'shop' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl">
                <div>
                  <h2 className="text-2xl font-bold text-[#171A21]">Shop</h2>
                  <p className="text-xs text-[#686C73] mt-0.5">Exchange Gold for avatar cosmetics and perks.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#D97706] bg-[#FFFBEB] px-3 py-1.5 rounded-lg border border-[#FDE68A]">
                  <Coins className="w-4 h-4 text-[#FFB547]" />
                  <span>{userStats.gold} Gold</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Cyber Visor Cosmetic', cost: 100, type: 'AVATAR ITEM' },
                  { title: 'Golden Aura Frame', cost: 250, type: 'COSMETIC' },
                  { title: 'Streak Shield Booster', cost: 500, type: 'PERK' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl space-y-4">
                    <span className="text-[10px] font-bold text-[#F05A3C] uppercase">{item.type}</span>
                    <h3 className="text-base font-bold text-[#171A21]">{item.title}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E1D9]">
                      <span className="text-xs font-bold text-[#D97706]">{item.cost} Gold</span>
                      <button
                        onClick={() => showToast(`Purchased ${item.title}!`, 'success')}
                        className="px-3 py-1.5 bg-[#171A21] hover:bg-[#F05A3C] text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Purchase
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INVENTORY VIEW */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-[#171A21]">Inventory</h2>
                <p className="text-xs text-[#686C73] mt-0.5">Equipped gear and active items.</p>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E5E1D9] p-8 rounded-xl text-center text-xs text-[#686C73]">
                Default Operative equipment equipped.
              </div>
            </div>
          )}

          {/* LEADERBOARD VIEW */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-[#171A21]">Leaderboard</h2>
                <p className="text-xs text-[#686C73] mt-0.5">Community XP rankings.</p>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E5E1D9] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#F7F5F0] border-b border-[#E5E1D9] text-[11px] text-[#686C73] uppercase font-bold">
                      <th className="p-4">Rank</th>
                      <th className="p-4">Operative</th>
                      <th className="p-4">Level</th>
                      <th className="p-4">Streak</th>
                      <th className="p-4">Total XP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E1D9]">
                    <tr className="bg-[#FFF7ED]">
                      <td className="p-4 font-bold text-[#F05A3C]">#01</td>
                      <td className="p-4 font-bold text-[#171A21]">Dhruv (You)</td>
                      <td className="p-4">Level {userStats.level}</td>
                      <td className="p-4 text-[#F05A3C]">🔥 {userStats.streak} days</td>
                      <td className="p-4 font-bold text-[#D97706]">{userStats.currentXp} XP</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-[#686C73]">#02</td>
                      <td className="p-4 font-medium text-[#171A21]">Alex Vance</td>
                      <td className="p-4">Level 11</td>
                      <td className="p-4 text-[#F05A3C]">🔥 10 days</td>
                      <td className="p-4 font-bold text-[#D97706]">2,150 XP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* HISTORY VIEW */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-[#171A21]">History</h2>
                <p className="text-xs text-[#686C73] mt-0.5">Completed activity log.</p>
              </div>
              <div className="space-y-2">
                {activities.map((act) => (
                  <div key={act.id} className="bg-[#FFFFFF] border border-[#E5E1D9] p-4 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-[#171A21]">{act.title}</span>
                      {act.subtext && <span className="text-[#686C73] ml-2">• {act.subtext}</span>}
                    </div>
                    <span className="text-[11px] text-[#A8A29E] font-technical">{act.timeAgo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div className="bg-[#FFFFFF] border border-[#E5E1D9] p-6 rounded-xl space-y-4">
                <h2 className="text-2xl font-bold text-[#171A21]">Settings</h2>
                <div className="space-y-4 pt-4 border-t border-[#E5E1D9]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#171A21]">Sound Effects</h4>
                      <p className="text-xs text-[#686C73]">Audio chime on quest completion.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#F05A3C]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Quest Modal */}
      <CreateQuestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleCreateQuest}
      />
    </div>
  );
}
