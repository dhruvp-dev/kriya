import type { AvatarConfig } from './avatar.types';

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'epic';
export type QuestStatus = 'pending' | 'completed';
export type QuestRecurrence = 'none' | 'daily';
export type AttributeType = 'strength' | 'intellect' | 'discipline' | 'creativity';
export type ShopItemType = 'theme' | 'badge' | 'avatar_item' | 'profile_decoration' | 'consumable';
export type AchievementTriggerType =
  | 'first_quest_completed'
  | 'level_reached'
  | 'streak_reached'
  | 'quest_count_reached'
  | 'gold_earned_total';

export interface Profile {
  id: string;
  display_name: string;
  avatar_config: AvatarConfig;
  timezone: string;
  leaderboard_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Character {
  id: string;
  user_id: string;
  level: number;
  total_xp: number;
  gold: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  level_reached_at: string;
  created_at: string;
  updated_at: string;
}

export interface Attribute {
  id: string;
  character_id: string;
  attribute_type: AttributeType;
  value: number;
  created_at: string;
  updated_at: string;
}

export interface Quest {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  difficulty: QuestDifficulty;
  attribute: AttributeType;
  xp_reward: number;
  gold_reward: number;
  status: QuestStatus;
  is_recurring: boolean;
  recurrence: QuestRecurrence;
  created_at: string;
  completed_at: string | null;
}

export interface QuestCompletion {
  id: string;
  user_id: string;
  quest_id: string | null;
  quest_title: string;
  xp_gained: number;
  gold_gained: number;
  attribute_increased: AttributeType;
  attribute_amount: number;
  completed_at: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ShopItemType;
  is_unique: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  user_id: string;
  item_id: string;
  quantity: number;
  equipped: boolean;
  acquired_at: string;
  shop_item?: ShopItem;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  trigger_type: AchievementTriggerType;
  threshold: number;
  reward_xp: number;
  reward_gold: number;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement?: Achievement;
}

export interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  avatar_config: AvatarConfig;
  level: number;
  total_xp: number;
  rank: number;
}

export interface CompleteQuestResult {
  success: boolean;
  quest_id: string;
  quest_title: string;
  xp_gained: number;
  gold_gained: number;
  total_xp: number;
  old_level: number;
  new_level: number;
  leveled_up: boolean;
  attribute_increased: AttributeType;
  attribute_delta: number;
  new_attribute_value: number;
  current_streak: number;
  longest_streak: number;
  unlocked_achievements: Array<{
    id: string;
    name: string;
    description: string;
    trigger_type: AchievementTriggerType;
    reward_xp: number;
    reward_gold: number;
  }>;
}

export interface PurchaseItemResult {
  success: boolean;
  item_id: string;
  item_name: string;
  price_paid: number;
  new_gold_balance: number;
  inventory_id: string;
  purchased_at: string;
}

export interface AttributesMap {
  strength: number;
  intellect: number;
  discipline: number;
  creativity: number;
}

export interface DashboardData {
  profile: Profile;
  character: Character;
  attributes: AttributesMap;
  pendingQuests: Quest[];
  todayCompletedQuests: Quest[];
  recentAchievements: Array<UserAchievement & { achievement: Achievement }>;
}
