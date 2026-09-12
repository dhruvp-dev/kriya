-- Migration 0001: Enums for Kriya RPG progression system
-- SRS References: §5, §6, §13, §15

CREATE TYPE public.quest_difficulty AS ENUM ('easy', 'medium', 'hard', 'epic');
CREATE TYPE public.quest_status AS ENUM ('pending', 'completed');
CREATE TYPE public.quest_recurrence AS ENUM ('none', 'daily');
CREATE TYPE public.attribute_type AS ENUM ('strength', 'intellect', 'discipline', 'creativity');
CREATE TYPE public.shop_item_type AS ENUM ('theme', 'badge', 'avatar_item', 'profile_decoration', 'consumable');
CREATE TYPE public.achievement_trigger_type AS ENUM (
  'first_quest_completed',
  'level_reached',
  'streak_reached',
  'quest_count_reached',
  'gold_earned_total'
);
