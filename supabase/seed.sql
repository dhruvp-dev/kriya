-- Kriya Seed Data: Shop Items and Achievements Definitions
-- SRS References: §13, §15

-- 1. Initial Shop Items
INSERT INTO public.shop_items (id, name, description, price, type, is_unique, metadata)
VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    'Midnight Dark Theme',
    'Sleek deep midnight color scheme for your dashboard',
    50,
    'theme',
    true,
    '{"theme_key": "midnight"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Cyberpunk Neon Theme',
    'Vibrant synthwave neon accent palette',
    100,
    'theme',
    true,
    '{"theme_key": "cyberpunk"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'Golden Dragon Badge',
    'Display a golden dragon emblem on your profile',
    75,
    'badge',
    true,
    '{"icon": "dragon"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Master Strategist Badge',
    'Badge reserved for disciplined task achievers',
    150,
    'badge',
    true,
    '{"icon": "brain"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    'Warrior Helmet Accessory',
    'Armored helmet overlay for your avatar',
    60,
    'avatar_item',
    true,
    '{"accessory_key": "helmet", "avatar_accessory": {"slot": "hat", "option_key": "helmet_warrior"}}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000006',
    'Golden Aura Border',
    'Glowing golden aura profile card decoration',
    80,
    'profile_decoration',
    true,
    '{"border_style": "golden-glow"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000007',
    'Elixir of Focus',
    'Consumable cosmetic potion effect',
    25,
    'consumable',
    false,
    '{"effect": "focus-sparkles"}'::jsonb
  )
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  type = EXCLUDED.type,
  is_unique = EXCLUDED.is_unique,
  metadata = EXCLUDED.metadata;

-- 2. Initial Data-Driven Achievement Definitions
INSERT INTO public.achievements (id, name, description, trigger_type, threshold, reward_xp, reward_gold, metadata)
VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    'First Step',
    'Complete your very first real-world quest',
    'first_quest_completed',
    1,
    50,
    10,
    '{"badge_icon": "footsteps"}'::jsonb
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'Apprentice',
    'Reach Level 5',
    'level_reached',
    5,
    100,
    25,
    '{"badge_icon": "star"}'::jsonb
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    'Novice Adventurer',
    'Reach Level 10',
    'level_reached',
    10,
    250,
    50,
    '{"badge_icon": "shield"}'::jsonb
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    'Consistent Hero',
    'Maintain a 3-day quest completion streak',
    'streak_reached',
    3,
    75,
    15,
    '{"badge_icon": "flame"}'::jsonb
  ),
  (
    '20000000-0000-0000-0000-000000000005',
    'Unstoppable Streak',
    'Maintain a 7-day quest completion streak',
    'streak_reached',
    7,
    200,
    40,
    '{"badge_icon": "fire-crown"}'::jsonb
  ),
  (
    '20000000-0000-0000-0000-000000000006',
    'Quest Master',
    'Complete 10 total quests',
    'quest_count_reached',
    10,
    150,
    30,
    '{"badge_icon": "sword"}'::jsonb
  ),
  (
    '20000000-0000-0000-0000-000000000007',
    'Treasure Hunter',
    'Earn 100 total Gold from completing quests',
    'gold_earned_total',
    100,
    100,
    20,
    '{"badge_icon": "coins"}'::jsonb
  )
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  trigger_type = EXCLUDED.trigger_type,
  threshold = EXCLUDED.threshold,
  reward_xp = EXCLUDED.reward_xp,
  reward_gold = EXCLUDED.reward_gold,
  metadata = EXCLUDED.metadata;
