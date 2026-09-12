'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { QuestCard, QuestItem } from '../../components/rpg/QuestCard';
import { CreateQuestModal } from '../../components/rpg/CreateQuestModal';
import { SubmissionCelebrationModal } from '../../components/rpg/SubmissionCelebrationModal';
import { useToast } from '../../components/ui/Toast';
import { Plus, Search, CheckCircle2, Layers, Shield, Brain, Zap, Palette } from 'lucide-react';
import { getRewardForDifficulty, calculateLevel, getXpThreshold } from '../../lib/progression';
import { getDashboardData } from '../../lib/queries/dashboard';
import { getQuestsData } from '../../lib/queries/quests';
import { createQuestAction, completeQuestAction } from '../../lib/actions/quests';

export default function QuestsPage() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Strength' | 'Intellect' | 'Discipline' | 'Creativity' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [userStats, setUserStats] = useState<{
    level: number;
    currentXp: number;
    nextLevelXp: number;
    gold: number;
    streak: number;
    displayName: string;
    avatarVariant?: string;
  } | null>(null);

  const [quests, setQuests] = useState<QuestItem[]>([]);

  // Completion Celebration state
  const [celebrationData, setCelebrationData] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    xpGained: number;
    goldGained: number;
    attributeGained?: string;
  }>({
    isOpen: false,
    title: 'Congrats on completing your submission!',
    subtitle: 'Your quest submission has been recorded and your attributes have compounded.',
    xpGained: 50,
    goldGained: 20,
    attributeGained: 'discipline',
  });

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [dashResult, questsResult] = await Promise.allSettled([
        getDashboardData(),
        getQuestsData(),
      ]);

      const dashData = dashResult.status === 'fulfilled' ? dashResult.value : null;
      const dbQuests = questsResult.status === 'fulfilled' ? questsResult.value : [];

      if (dashData && dashData.character && dashData.profile) {
        const { character, profile } = dashData;
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
      } else {
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

      const combinedQuestsMap = new Map<string, any>();
      if (dbQuests && dbQuests.length > 0) {
        dbQuests.forEach((q) => combinedQuestsMap.set(q.id, q));
      }
      if (dashData?.todayCompletedQuests && dashData.todayCompletedQuests.length > 0) {
        dashData.todayCompletedQuests.forEach((q) => combinedQuestsMap.set(q.id, q));
      }

      if (combinedQuestsMap.size > 0) {
        const mappedList: QuestItem[] = Array.from(combinedQuestsMap.values()).map((q) => {
          const reward = getRewardForDifficulty((q.difficulty?.toLowerCase() as any) || 'medium');
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
        });
        setQuests(mappedList);
      } else {
        setQuests([]);
      }
    } catch {
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

  const handleCompleteQuest = async (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.completed) return;

    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
    );

    try {
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

        // Automatically trigger graffiti confetti celebration on complete!
        setCelebrationData({
          isOpen: true,
          title: 'Congrats on completing your submission!',
          subtitle: `You completed "${quest.title}" and compounded your RPG progression.`,
          xpGained: res.xp_gained,
          goldGained: res.gold_gained,
          attributeGained: res.attribute_increased,
        });

        showToast(
          'success',
          'Quest Completed!',
          `+${res.xp_gained} XP  •  +${res.gold_gained} Gold`
        );
      } else {
        const reward = getRewardForDifficulty(quest.difficulty.toLowerCase() as any);
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

        // Automatically trigger graffiti confetti celebration on complete!
        setCelebrationData({
          isOpen: true,
          title: 'Congrats on completing your submission!',
          subtitle: `You completed "${quest.title}" and compounded your RPG progression.`,
          xpGained: reward.xp,
          goldGained: reward.gold,
          attributeGained: quest.attribute,
        });

        showToast(
          'success',
          'Quest Completed!',
          `+${reward.xp} XP  •  +${reward.gold} Gold${leveledUp ? '  •  LEVEL UP!' : ''}`
        );
      }
    } catch {
      setQuests((prev) =>
        prev.map((q) => (q.id === questId ? { ...q, completed: false } : q))
      );
      showToast('error', 'Error', 'Failed to complete quest.');
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
      showToast('success', 'Quest Created', `"${newQuestData.title}" added.`);
    } catch {
      setIsCreateModalOpen(false);
      showToast('error', 'Error', 'Failed to create quest.');
    }
  };

  const matchingQuests = quests.filter((quest) => {
    if (activeFilter === 'Completed') return quest.completed;
    if (activeFilter !== 'All' && quest.attribute.toLowerCase() !== activeFilter.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return quest.title.toLowerCase().includes(q) || (quest.description || '').toLowerCase().includes(q);
    }
    return true;
  });

  const activeQuestsList = activeFilter === 'Completed' ? [] : matchingQuests.filter((q) => !q.completed);
  const completedQuestsList = activeFilter === 'Completed' ? matchingQuests : matchingQuests.filter((q) => q.completed);

  const getFilterCount = (filter: string) => {
    if (filter === 'All') return quests.length;
    if (filter === 'Completed') return quests.filter((q) => q.completed).length;
    return quests.filter((q) => q.attribute.toLowerCase() === filter.toLowerCase()).length;
  };

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case 'All':
        return <Layers className="w-3.5 h-3.5" />;
      case 'Strength':
        return <Shield className="w-3.5 h-3.5 text-[#C85A3D]" />;
      case 'Intellect':
        return <Brain className="w-3.5 h-3.5 text-[#344653]" />;
      case 'Discipline':
        return <Zap className="w-3.5 h-3.5 text-[#668F72]" />;
      case 'Creativity':
        return <Palette className="w-3.5 h-3.5 text-[#D9A441]" />;
      case 'Completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#668F72]" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#070709] flex flex-col lg:flex-row font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="quests"
        isLoading={isLoading}
        userStats={userStats || undefined}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          isLoading={isLoading}
          userStats={userStats || undefined}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#070709] tracking-tight">
                Quests
              </h1>
              <p className="text-sm text-[#60606C] mt-1 font-medium">
                Small daily actions. Meaningful long-term progress.
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#070709] hover:bg-[#202025] text-white text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Quest</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#F7F7F8] p-2.5 rounded-2xl border border-[#E6E6E8]">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {(['All', 'Strength', 'Intellect', 'Discipline', 'Creativity', 'Completed'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-white text-[#070709] shadow-xs border border-[#E6E6E8]'
                      : 'text-[#60606C] hover:text-[#070709] hover:bg-white/60'
                  }`}
                >
                  {getFilterIcon(filter)}
                  <span>{filter}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeFilter === filter ? 'bg-[#070709] text-white' : 'bg-[#E6E6E8] text-[#60606C]'
                  }`}>
                    {getFilterCount(filter)}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#8B8B8B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search quests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-[#E6E6E8] rounded-xl text-xs text-[#070709] placeholder-[#8B8B8B] focus:outline-none focus:border-[#070709] transition-colors"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E6E6E8] animate-pulse flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-5 h-5 rounded-full bg-[#F3F4F5] shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="h-4 w-40 bg-[#E6E6E8] rounded" />
                      <div className="h-3 w-56 bg-[#F3F4F5] rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="h-6 w-14 bg-[#F3F4F5] rounded-lg" />
                    <div className="h-6 w-14 bg-[#F3F4F5] rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : activeQuestsList.length > 0 || completedQuestsList.length > 0 ? (
            <div className="space-y-6">
              {/* Active Quests Section */}
              {activeQuestsList.length > 0 && (
                <div className="space-y-3">
                  {completedQuestsList.length > 0 && activeFilter !== 'Completed' && (
                    <h3 className="text-xs font-bold text-[#60606C] uppercase tracking-wider">
                      Active Quests ({activeQuestsList.length})
                    </h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeQuestsList.map((quest) => (
                      <QuestCard
                        key={quest.id}
                        quest={quest}
                        onComplete={handleCompleteQuest}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Quests Section */}
              {completedQuestsList.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 pt-2 border-t border-[#E6E6E8]">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#ECFDF5] text-[#059669]">
                      <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <h3 className="text-xs font-bold text-[#60606C] uppercase tracking-wider">
                      Completed Quests ({completedQuestsList.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedQuestsList.map((quest) => (
                      <QuestCard
                        key={quest.id}
                        quest={quest}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-[#E6E6E8] rounded-2xl p-12 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#F7F7F8] flex items-center justify-center mx-auto text-[#60606C]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#070709]">No quests found</h3>
              <p className="text-xs text-[#60606C] max-w-sm mx-auto leading-relaxed">
                {activeFilter === 'Completed'
                  ? 'No completed quests yet. Complete active quests to populate your history.'
                  : 'Nothing planned for this filter yet. Create a new quest to start building momentum.'}
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#070709] hover:bg-[#202025] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer mt-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Quest</span>
              </button>
            </div>
          )}
        </div>
      </main>

      <CreateQuestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateQuest={handleCreateQuest}
      />

      <SubmissionCelebrationModal
        isOpen={celebrationData.isOpen}
        onClose={() => setCelebrationData((prev) => ({ ...prev, isOpen: false }))}
        title={celebrationData.title}
        subtitle={celebrationData.subtitle}
        xpGained={celebrationData.xpGained}
        goldGained={celebrationData.goldGained}
        attributeGained={celebrationData.attributeGained}
        delayMs={300}
      />
    </div>
  );
}
