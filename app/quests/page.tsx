'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { QuestCard, QuestItem } from '../../components/rpg/QuestCard';
import { CreateQuestModal } from '../../components/rpg/CreateQuestModal';
import { useToast } from '../../components/ui/Toast';
import { Plus, Search, CheckCircle2, Layers, Shield, Brain, Zap, Palette } from 'lucide-react';
import { getRewardForDifficulty, calculateLevel, getXpThreshold } from '../../lib/progression';

export default function QuestsPage() {
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Strength' | 'Intellect' | 'Discipline' | 'Creativity' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [userStats, setUserStats] = useState({
    level: 12,
    currentXp: 2480,
    nextLevelXp: 3200,
    gold: 680,
    streak: 14,
    displayName: 'Dhruv',
  });

  const [quests, setQuests] = useState<QuestItem[]>([
    {
      id: 'q-1',
      title: 'Study React API Architecture',
      description: 'Review state patterns and clean custom hooks.',
      attribute: 'intellect',
      difficulty: 'MEDIUM',
      xp: 50,
      gold: 15,
      completed: false,
    },
    {
      id: 'q-2',
      title: 'Workout for 30 minutes',
      description: 'Build momentum through physical movement.',
      attribute: 'strength',
      difficulty: 'EASY',
      xp: 20,
      gold: 5,
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
      description: 'Refine micro-spacing and subtle card details.',
      attribute: 'creativity',
      difficulty: 'HARD',
      xp: 100,
      gold: 30,
      completed: false,
    },
    {
      id: 'q-5',
      title: 'Deep work sprint (90 mins)',
      description: 'Uninterrupted technical problem solving.',
      attribute: 'intellect',
      difficulty: 'EPIC',
      xp: 200,
      gold: 60,
      completed: false,
    },
  ]);

  const handleCompleteQuest = async (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.completed) return;

    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
    );

    try {
      const reward = getRewardForDifficulty(quest.difficulty.toLowerCase() as any);
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

      showToast(
        'success',
        'Quest Completed!',
        `+${reward.xp} XP  •  +${reward.gold} Gold${leveledUp ? '  •  LEVEL UP!' : ''}`
      );
    } catch (err) {
      setQuests((prev) =>
        prev.map((q) => (q.id === questId ? { ...q, completed: false } : q))
      );
      showToast('error', 'Error', 'Failed to complete quest.');
    }
  };

  const handleCreateQuest = (newQuestData: any) => {
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
    setIsCreateModalOpen(false);
    showToast('success', 'Quest Created', `"${newQuest.title}" added.`);
  };

  const filteredQuests = quests.filter((quest) => {
    if (activeFilter === 'Completed') return quest.completed;
    if (activeFilter !== 'All' && quest.attribute.toLowerCase() !== activeFilter.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return quest.title.toLowerCase().includes(q) || (quest.description || '').toLowerCase().includes(q);
    }
    return !quest.completed;
  });

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
        userStats={userStats}
      />

      <main className="flex-1 lg:pl-60 min-w-0 flex flex-col min-h-screen">
        <Header
          userStats={userStats}
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

          {filteredQuests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={handleCompleteQuest}
                />
              ))}
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
    </div>
  );
}
