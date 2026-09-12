'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import type { Quest, CompleteQuestResult, QuestStatus } from '../../types/database.types';
import { getQuestsData } from '../../lib/queries/quests';
import { getDashboardData } from '../../lib/queries/dashboard';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Header } from '../../components/navigation/Header';
import { Button } from '../../components/ui/Button';
import { QuestCard } from '../../components/rpg/QuestCard';
import { CreateQuestModal } from '../../components/rpg/CreateQuestModal';
import { EditQuestModal } from '../../components/rpg/EditQuestModal';
import { CelebrationOverlay } from '../../components/rpg/CelebrationOverlay';

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [characterData, setCharacterData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'recurring'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [celebrationResult, setCelebrationResult] = useState<CompleteQuestResult | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [qList, dashData] = await Promise.all([
      getQuestsData(),
      getDashboardData(),
    ]);
    setQuests(qList);
    setCharacterData(dashData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleQuestCompleteSuccess = (result: CompleteQuestResult) => {
    if (result.leveled_up || (result.unlocked_achievements && result.unlocked_achievements.length > 0)) {
      setCelebrationResult(result);
    }
    loadData();
  };

  const filteredQuests = quests.filter((q) => {
    if (activeTab === 'pending' && q.status !== 'pending') return false;
    if (activeTab === 'completed' && q.status !== 'completed') return false;
    if (activeTab === 'recurring' && !q.is_recurring) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        q.title.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query) ||
        q.difficulty.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#161310] flex">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          character={characterData?.character}
          profile={characterData?.profile}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-100">Quest Management</h1>
              <p className="text-xs text-slate-400">
                Manage, edit, and complete real-world activity quests.
              </p>
            </div>

            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4" /> Create Quest
            </Button>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-panel p-3 rounded-2xl border border-slate-800">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'pending'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'completed'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab('recurring')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'recurring'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Daily Recurrent
              </button>
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quests..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Quests List */}
          {isLoading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading quests...</div>
          ) : filteredQuests.length === 0 ? (
            <div className="py-16 text-center glass-panel rounded-2xl border border-slate-800 p-8 space-y-3">
              <Filter className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">No quests found matching your filter.</p>
              <Button variant="primary" size="sm" onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4" /> Create Quest
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQuests.map((quest) => (
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
        </main>
      </div>

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
