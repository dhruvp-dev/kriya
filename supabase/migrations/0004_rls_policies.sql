-- Migration 0004: Row Level Security (RLS) Policies for Kriya
-- SRS References: §3, §4.4, §17, §21; AGENTS.md Rule 4

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY profiles_select_policy ON public.profiles
  FOR SELECT USING (auth.uid() = id OR leaderboard_visible = true);

CREATE POLICY profiles_update_policy ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY profiles_insert_policy ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Characters Policies
CREATE POLICY characters_select_policy ON public.characters
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = characters.user_id AND p.leaderboard_visible = true
    )
  );

CREATE POLICY characters_update_policy ON public.characters
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY characters_insert_policy ON public.characters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Attributes Policies
CREATE POLICY attributes_select_policy ON public.attributes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.characters c 
      WHERE c.id = attributes.character_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY attributes_update_policy ON public.attributes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.characters c 
      WHERE c.id = attributes.character_id AND c.user_id = auth.uid()
    )
  );

-- 4. Quests Policies (Owner full access)
CREATE POLICY quests_all_policy ON public.quests
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. Quest Completions Policies (Owner read/insert)
CREATE POLICY quest_completions_select_policy ON public.quest_completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY quest_completions_insert_policy ON public.quest_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. Shop Items Policies (Read-only for all authenticated users)
CREATE POLICY shop_items_select_policy ON public.shop_items
  FOR SELECT USING (auth.role() = 'authenticated');

-- 7. Inventory Policies (Owner full access)
CREATE POLICY inventory_all_policy ON public.inventory
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 8. Achievements Policies (Read-only for all authenticated users)
CREATE POLICY achievements_select_policy ON public.achievements
  FOR SELECT USING (auth.role() = 'authenticated');

-- 9. User Achievements Policies (Owner read access)
CREATE POLICY user_achievements_select_policy ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY user_achievements_insert_policy ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);
