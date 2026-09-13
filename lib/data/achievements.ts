import type { AchievementTriggerType } from '@/types/database.types';

export type AchievementIconName =
  | 'footsteps'
  | 'flame'
  | 'star'
  | 'shield'
  | 'sword'
  | 'coins'
  | 'trophy'
  | 'award';

export interface CanonicalAchievement {
  id: string;
  name: string;
  description: string;
  category: string;
  trigger_type: AchievementTriggerType;
  threshold: number;
  reward_xp: number;
  reward_gold: number;
  icon_name: AchievementIconName;
}

export const CANONICAL_ACHIEVEMENTS: CanonicalAchievement[] = [
  {
    id: '20000000-0000-0000-0000-000000000001',
    name: 'First Step',
    description: 'Complete your first quest.',
    category: 'Beginner',
    trigger_type: 'first_quest_completed',
    threshold: 1,
    reward_xp: 50,
    reward_gold: 10,
    icon_name: 'footsteps',
  },
  {
    id: '20000000-0000-0000-0000-000000000004',
    name: 'Consistent Hero',
    description: 'Maintain a 3-day quest streak.',
    category: 'Streak',
    trigger_type: 'streak_reached',
    threshold: 3,
    reward_xp: 75,
    reward_gold: 15,
    icon_name: 'flame',
  },
  {
    id: '20000000-0000-0000-0000-000000000002',
    name: 'Apprentice',
    description: 'Reach Level 5.',
    category: 'Level',
    trigger_type: 'level_reached',
    threshold: 5,
    reward_xp: 100,
    reward_gold: 25,
    icon_name: 'star',
  },
  {
    id: '20000000-0000-0000-0000-000000000005',
    name: 'Week Warrior',
    description: 'Maintain a 7-day quest streak.',
    category: 'Streak',
    trigger_type: 'streak_reached',
    threshold: 7,
    reward_xp: 200,
    reward_gold: 40,
    icon_name: 'flame',
  },
  {
    id: '20000000-0000-0000-0000-000000000003',
    name: 'Getting Serious',
    description: 'Reach Level 10.',
    category: 'Level',
    trigger_type: 'level_reached',
    threshold: 10,
    reward_xp: 250,
    reward_gold: 50,
    icon_name: 'shield',
  },
  {
    id: '20000000-0000-0000-0000-000000000006',
    name: 'Quest Master',
    description: 'Complete 10 total quests.',
    category: 'Quests',
    trigger_type: 'quest_count_reached',
    threshold: 10,
    reward_xp: 150,
    reward_gold: 30,
    icon_name: 'sword',
  },
  {
    id: '20000000-0000-0000-0000-000000000007',
    name: 'Treasure Hunter',
    description: 'Accumulate 100 total Gold.',
    category: 'Economy',
    trigger_type: 'gold_earned_total',
    threshold: 100,
    reward_xp: 100,
    reward_gold: 20,
    icon_name: 'coins',
  },
];
