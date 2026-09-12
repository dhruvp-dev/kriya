-- Migration 0008: Leaderboard View for Kriya
-- SRS References: §17; AGENTS.md §5

-- Public leaderboard view exposing opt-in progression rankings
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
  p.id AS user_id,
  p.display_name,
  p.avatar_seed,
  c.level,
  c.total_xp,
  DENSE_RANK() OVER (
    ORDER BY c.level DESC, c.total_xp DESC, c.level_reached_at ASC
  ) AS rank
FROM public.profiles p
JOIN public.characters c ON c.user_id = p.id
WHERE p.leaderboard_visible = true;

-- Grant access to authenticated and anonymous users
GRANT SELECT ON public.leaderboard TO authenticated;
GRANT SELECT ON public.leaderboard TO anon;

COMMENT ON VIEW public.leaderboard IS 'Public leaderboard exposing display_name, avatar_seed, level, total_xp, and rank for opt-in profiles only (leaderboard_visible = true). Order: Level DESC, Total XP DESC, level_reached_at ASC.';
