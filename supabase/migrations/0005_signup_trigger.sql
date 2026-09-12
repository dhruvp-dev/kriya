-- Migration 0005: Auth Signup Trigger for Kriya
-- SRS References: §4.1, §5; AGENTS.md §3

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_display_name TEXT;
  v_avatar_seed TEXT;
  v_timezone TEXT;
  v_character_id UUID;
BEGIN
  -- Extract display name, avatar seed, and timezone from raw metadata or generate defaults
  v_display_name := COALESCE(
    NEW.raw_user_meta_data->>'display_name',
    NULLIF(split_part(NEW.email, '@', 1), ''),
    'Hero'
  );

  v_avatar_seed := COALESCE(
    NEW.raw_user_meta_data->>'avatar_seed',
    NEW.id::TEXT
  );

  v_timezone := COALESCE(
    NEW.raw_user_meta_data->>'timezone',
    'UTC'
  );

  -- 1. Create Profile
  INSERT INTO public.profiles (id, display_name, avatar_seed, timezone, leaderboard_visible)
  VALUES (NEW.id, v_display_name, v_avatar_seed, v_timezone, false);

  -- 2. Create Character (Initial State per SRS §4.1 & §5: Level 1, 0 XP, 0 Gold, 0 Streak)
  INSERT INTO public.characters (
    user_id, level, total_xp, gold, current_streak, longest_streak, level_reached_at
  )
  VALUES (
    NEW.id, 1, 0, 0, 0, 0, now()
  )
  RETURNING id INTO v_character_id;

  -- 3. Initialize 4 Fixed Attributes (Strength, Intellect, Discipline, Creativity at 0)
  INSERT INTO public.attributes (character_id, attribute_type, value)
  VALUES
    (v_character_id, 'strength'::public.attribute_type, 0),
    (v_character_id, 'intellect'::public.attribute_type, 0),
    (v_character_id, 'discipline'::public.attribute_type, 0),
    (v_character_id, 'creativity'::public.attribute_type, 0);

  RETURN NEW;
END;
$$;

-- Trigger to execute on auth.users creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
