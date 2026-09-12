-- Migration 0009: 3D Avatar System Schema Update
-- Replaces avatar_seed string with avatar_config JSONB on profiles table

-- 1. Add avatar_config JSONB column to profiles
ALTER TABLE public.profiles
  ADD COLUMN avatar_config JSONB NOT NULL DEFAULT '{
    "baseModel": "warrior",
    "tint": "#6366f1",
    "hat": "none",
    "weapon": "none",
    "back": "none"
  }'::jsonb;

-- 2. Drop legacy avatar_seed column
ALTER TABLE public.profiles DROP COLUMN avatar_seed;

-- 3. Update handle_new_user() trigger function to handle avatar_config
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_display_name TEXT;
  v_avatar_config JSONB;
  v_timezone TEXT;
  v_character_id UUID;
BEGIN
  v_display_name := COALESCE(
    NEW.raw_user_meta_data->>'display_name',
    NULLIF(split_part(NEW.email, '@', 1), ''),
    'Hero'
  );

  -- Extract avatar_config if present in user metadata, otherwise fallback to default
  IF NEW.raw_user_meta_data ? 'avatar_config' THEN
    IF jsonb_typeof(NEW.raw_user_meta_data->'avatar_config') = 'string' THEN
      v_avatar_config := (NEW.raw_user_meta_data->>'avatar_config')::jsonb;
    ELSE
      v_avatar_config := NEW.raw_user_meta_data->'avatar_config';
    END IF;
  ELSE
    v_avatar_config := '{
      "baseModel": "warrior",
      "tint": "#6366f1",
      "hat": "none",
      "weapon": "none",
      "back": "none"
    }'::jsonb;
  END IF;

  v_timezone := COALESCE(
    NEW.raw_user_meta_data->>'timezone',
    'UTC'
  );

  -- 1. Create Profile
  INSERT INTO public.profiles (id, display_name, avatar_config, timezone, leaderboard_visible)
  VALUES (NEW.id, v_display_name, v_avatar_config, v_timezone, false);

  -- 2. Create Character
  INSERT INTO public.characters (
    user_id, level, total_xp, gold, current_streak, longest_streak, level_reached_at
  )
  VALUES (
    NEW.id, 1, 0, 0, 0, 0, now()
  )
  RETURNING id INTO v_character_id;

  -- 3. Initialize 4 Attributes
  INSERT INTO public.attributes (character_id, attribute_type, value)
  VALUES
    (v_character_id, 'strength'::public.attribute_type, 0),
    (v_character_id, 'intellect'::public.attribute_type, 0),
    (v_character_id, 'discipline'::public.attribute_type, 0),
    (v_character_id, 'creativity'::public.attribute_type, 0);

  RETURN NEW;
END;
$$;

-- 4. Recreate public.leaderboard view to select avatar_config instead of avatar_seed
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
  p.id AS user_id,
  p.display_name,
  p.avatar_config,
  c.level,
  c.total_xp,
  DENSE_RANK() OVER (
    ORDER BY c.level DESC, c.total_xp DESC, c.level_reached_at ASC
  ) AS rank
FROM public.profiles p
JOIN public.characters c ON c.user_id = p.id
WHERE p.leaderboard_visible = true;

GRANT SELECT ON public.leaderboard TO authenticated;
GRANT SELECT ON public.leaderboard TO anon;

COMMENT ON VIEW public.leaderboard IS 'Public leaderboard exposing display_name, avatar_config, level, total_xp, and rank for opt-in profiles only.';
