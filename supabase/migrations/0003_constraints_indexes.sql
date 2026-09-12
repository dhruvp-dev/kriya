-- Migration 0003: Constraints and Performance Indexes for Kriya
-- SRS References: §5, §6, §10, §11, §13, §15, §17

-- 1. CHECK Constraints for Data Integrity
ALTER TABLE public.characters
  ADD CONSTRAINT chk_characters_level CHECK (level >= 1),
  ADD CONSTRAINT chk_characters_total_xp CHECK (total_xp >= 0),
  ADD CONSTRAINT chk_characters_gold CHECK (gold >= 0),
  ADD CONSTRAINT chk_characters_current_streak CHECK (current_streak >= 0),
  ADD CONSTRAINT chk_characters_longest_streak CHECK (longest_streak >= 0);

ALTER TABLE public.attributes
  ADD CONSTRAINT chk_attributes_value CHECK (value >= 0);

ALTER TABLE public.quests
  ADD CONSTRAINT chk_quests_title CHECK (char_length(trim(title)) > 0),
  ADD CONSTRAINT chk_quests_xp_reward CHECK (xp_reward >= 0),
  ADD CONSTRAINT chk_quests_gold_reward CHECK (gold_reward >= 0);

ALTER TABLE public.quest_completions
  ADD CONSTRAINT chk_completions_xp CHECK (xp_gained >= 0),
  ADD CONSTRAINT chk_completions_gold CHECK (gold_gained >= 0),
  ADD CONSTRAINT chk_completions_attribute_amount CHECK (attribute_amount = 1); -- SRS §10: Fixed +1 attribute increment

ALTER TABLE public.shop_items
  ADD CONSTRAINT chk_shop_items_price CHECK (price >= 0);

ALTER TABLE public.inventory
  ADD CONSTRAINT chk_inventory_quantity CHECK (quantity > 0);

ALTER TABLE public.achievements
  ADD CONSTRAINT chk_achievements_threshold CHECK (threshold >= 0),
  ADD CONSTRAINT chk_achievements_reward_xp CHECK (reward_xp >= 0),
  ADD CONSTRAINT chk_achievements_reward_gold CHECK (reward_gold >= 0);

-- 2. Performance Indexes

-- Leaderboard Ranking Index (SRS §17: Level DESC, Total XP DESC, level_reached_at ASC)
CREATE INDEX idx_characters_leaderboard
  ON public.characters (level DESC, total_xp DESC, level_reached_at ASC);

-- Partial index for opt-in leaderboard profiles
CREATE INDEX idx_profiles_leaderboard_visible
  ON public.profiles (leaderboard_visible)
  WHERE leaderboard_visible = true;

-- Quest Completions History Index (chronological lookups per user)
CREATE INDEX idx_quest_completions_user_date
  ON public.quest_completions (user_id, completed_at DESC);

-- Quests Lookup Index (filtering pending/completed per user)
CREATE INDEX idx_quests_user_status
  ON public.quests (user_id, status);

-- Inventory User Lookup Index
CREATE INDEX idx_inventory_user
  ON public.inventory (user_id);

-- User Achievements Lookup Index
CREATE INDEX idx_user_achievements_user
  ON public.user_achievements (user_id);
