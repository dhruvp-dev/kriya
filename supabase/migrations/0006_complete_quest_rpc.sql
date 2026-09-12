-- Migration 0006: complete_quest RPC Function for Kriya
-- SRS References: §7, §8, §9, §10, §11, §15, §16, §21, §23; AGENTS.md §3, §5

CREATE OR REPLACE FUNCTION public.complete_quest(p_quest_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID;
  v_quest RECORD;
  v_character RECORD;
  v_timezone TEXT;
  v_xp_reward INT;
  v_gold_reward INT;
  v_new_xp INT; 
  v_new_gold INT;
  v_new_attr_value INT;
  v_user_tz TEXT;
  v_today DATE;
  v_new_current_streak INT;
  v_new_longest_streak INT;
  v_old_level INT;
  v_current_level INT;
  v_leveled_up BOOLEAN;
  v_level_reached_at TIMESTAMPTZ;
  v_completed_quest_count INT;
  v_ach RECORD;
  v_unlocked_achievements JSONB := '[]'::jsonb;
  v_completion_id UUID;
BEGIN
  -- 1. Validate caller authentication
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Caller is not authenticated.';
  END IF;

  -- 2. Fetch and lock quest record
  SELECT * INTO v_quest
  FROM public.quests
  WHERE id = p_quest_id
  FOR UPDATE;

  IF v_quest.id IS NULL THEN
    RAISE EXCEPTION 'Quest not found.';
  END IF;

  IF v_quest.user_id <> v_user_id THEN
    RAISE EXCEPTION 'Forbidden: Quest does not belong to the authenticated user.';
  END IF;

  IF v_quest.status <> 'pending'::public.quest_status THEN
    RAISE EXCEPTION 'Invalid Action: Quest has already been completed.';
  END IF;

  -- 3. Determine server-authoritative XP and Gold rewards from fixed difficulty table (SRS §8)
  CASE v_quest.difficulty
    WHEN 'easy'::public.quest_difficulty THEN
      v_xp_reward := 20;
      v_gold_reward := 5;
    WHEN 'medium'::public.quest_difficulty THEN
      v_xp_reward := 50;
      v_gold_reward := 15;
    WHEN 'hard'::public.quest_difficulty THEN
      v_xp_reward := 100;
      v_gold_reward := 30;
    WHEN 'epic'::public.quest_difficulty THEN
      v_xp_reward := 200;
      v_gold_reward := 60;
    ELSE
      RAISE EXCEPTION 'Invalid quest difficulty: %', v_quest.difficulty;
  END CASE;

  -- 4. Fetch and lock character record & profile timezone
  SELECT timezone INTO v_timezone
  FROM public.profiles
  WHERE id = v_user_id;

  SELECT * INTO v_character
  FROM public.characters
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF v_character.id IS NULL THEN
    RAISE EXCEPTION 'Character record not found for user.';
  END IF;

  -- 5. Calculate new XP and Gold balances
  v_new_xp := v_character.total_xp + v_xp_reward;
  v_new_gold := v_character.gold + v_gold_reward;

  -- 6. Apply fixed +1 attribute increment to mapped attribute (SRS §10)
  UPDATE public.attributes
  SET value = value + 1,
      updated_at = now()
  WHERE character_id = v_character.id AND attribute_type = v_quest.attribute
  RETURNING value INTO v_new_attr_value;

  -- 7. Calculate Streak updates based on user timezone calendar date (SRS §11)
  -- Uses local wall-clock calendar date: (now() AT TIME ZONE user_tz)::date
  v_user_tz := COALESCE(v_timezone, 'UTC');
  v_today := (now() AT TIME ZONE v_user_tz)::date;

  IF v_character.last_activity_date IS NULL THEN
    -- First completion ever
    v_new_current_streak := 1;
    v_new_longest_streak := GREATEST(v_character.longest_streak, 1);
  ELSIF v_character.last_activity_date = v_today THEN
    -- Already completed a quest today; streak count remains unchanged
    v_new_current_streak := v_character.current_streak;
    v_new_longest_streak := v_character.longest_streak;
  ELSIF v_character.last_activity_date = v_today - 1 THEN
    -- Consecutive calendar day completion: increment streak
    v_new_current_streak := v_character.current_streak + 1;
    v_new_longest_streak := GREATEST(v_character.longest_streak, v_new_current_streak);
  ELSE
    -- Missed one or more full calendar days: reset current streak to 1
    v_new_current_streak := 1;
    v_new_longest_streak := GREATEST(v_character.longest_streak, 1);
  END IF;

  -- 8. Run Level-Up loop supporting multi-level jumps (SRS §9)
  -- Formula: threshold(N) = floor(100 * N^1.5)
  -- Level loop checks if total_xp >= threshold(level + 1)
  v_old_level := v_character.level;
  v_current_level := v_old_level;

  WHILE v_new_xp >= FLOOR(100.0 * POWER((v_current_level + 1)::NUMERIC, 1.5)) LOOP
    v_current_level := v_current_level + 1;
  END LOOP;

  v_leveled_up := (v_current_level > v_old_level);
  v_level_reached_at := v_character.level_reached_at;

  -- CRITICAL: level_reached_at is updated ONLY when a level increase occurs to preserve early attainment leaderboard tiebreaking (SRS §17)
  IF v_leveled_up THEN
    v_level_reached_at := now();
  END IF;

  -- 9. Persist updated Character progression state
  UPDATE public.characters
  SET level = v_current_level,
      total_xp = v_new_xp,
      gold = v_new_gold,
      current_streak = v_new_current_streak,
      longest_streak = v_new_longest_streak,
      last_activity_date = v_today,
      level_reached_at = v_level_reached_at,
      updated_at = now()
  WHERE id = v_character.id;

  -- 10. Update Quest completion status
  UPDATE public.quests
  SET status = 'completed'::public.quest_status,
      completed_at = now()
  WHERE id = p_quest_id;

  -- 11. Write persistent history audit log record (SRS §16)
  INSERT INTO public.quest_completions (
    user_id, quest_id, quest_title, xp_gained, gold_gained, attribute_increased, attribute_amount, completed_at
  )
  VALUES (
    v_user_id, v_quest.id, v_quest.title, v_xp_reward, v_gold_reward, v_quest.attribute, 1, now()
  )
  RETURNING id INTO v_completion_id;

  -- 12. Evaluate Data-Driven Achievements (SRS §15)
  SELECT COUNT(*) INTO v_completed_quest_count
  FROM public.quest_completions
  WHERE user_id = v_user_id;

  FOR v_ach IN
    SELECT a.*
    FROM public.achievements a
    WHERE NOT EXISTS (
      SELECT 1 FROM public.user_achievements ua
      WHERE ua.user_id = v_user_id AND ua.achievement_id = a.id
    )
  LOOP
    IF (
      (v_ach.trigger_type = 'first_quest_completed' AND v_completed_quest_count >= 1) OR
      (v_ach.trigger_type = 'level_reached' AND v_current_level >= v_ach.threshold) OR
      (v_ach.trigger_type = 'streak_reached' AND v_new_current_streak >= v_ach.threshold) OR
      (v_ach.trigger_type = 'quest_count_reached' AND v_completed_quest_count >= v_ach.threshold) OR
      (v_ach.trigger_type = 'gold_earned_total' AND v_new_gold >= v_ach.threshold)
    ) THEN
      -- Unlock achievement for user
      INSERT INTO public.user_achievements (user_id, achievement_id, unlocked_at)
      VALUES (v_user_id, v_ach.id, now());

      -- Append to response JSON array
      v_unlocked_achievements := v_unlocked_achievements || jsonb_build_object(
        'id', v_ach.id,
        'name', v_ach.name,
        'description', v_ach.description,
        'trigger_type', v_ach.trigger_type,
        'reward_xp', v_ach.reward_xp,
        'reward_gold', v_ach.reward_gold
      );
    END IF;
  END LOOP;

  -- 13. Return full server-confirmed result payload for frontend celebration animations (SRS §23)
  RETURN jsonb_build_object(
    'success', true,
    'quest_id', p_quest_id,
    'quest_title', v_quest.title,
    'xp_gained', v_xp_reward,
    'gold_gained', v_gold_reward,
    'total_xp', v_new_xp,
    'old_level', v_old_level,
    'new_level', v_current_level,
    'leveled_up', v_leveled_up,
    'attribute_increased', v_quest.attribute,
    'attribute_delta', 1,
    'new_attribute_value', v_new_attr_value,
    'current_streak', v_new_current_streak,
    'longest_streak', v_new_longest_streak,
    'unlocked_achievements', v_unlocked_achievements
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.complete_quest(UUID) TO authenticated, service_role;

