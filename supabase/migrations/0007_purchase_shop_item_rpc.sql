-- Migration 0007: purchase_shop_item RPC Function for Kriya
-- SRS References: §13, §21; AGENTS.md §3

CREATE OR REPLACE FUNCTION public.purchase_shop_item(p_item_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID;
  v_item RECORD;
  v_character RECORD;
  v_new_gold INT;
  v_existing_inventory RECORD;
  v_inventory_id UUID;
BEGIN
  -- 1. Validate caller authentication
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Caller is not authenticated.';
  END IF;

  -- 2. Fetch shop item details
  SELECT * INTO v_item
  FROM public.shop_items
  WHERE id = p_item_id;

  IF v_item.id IS NULL THEN
    RAISE EXCEPTION 'Item not found.';
  END IF;

  -- 3. Fetch and lock character record for gold validation
  SELECT * INTO v_character
  FROM public.characters
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF v_character.id IS NULL THEN
    RAISE EXCEPTION 'Character record not found for user.';
  END IF;

  -- 4. Check Gold Balance
  IF v_character.gold < v_item.price THEN
    RAISE EXCEPTION 'Insufficient Gold: Item costs % Gold, but user only has % Gold.', v_item.price, v_character.gold;
  END IF;

  -- 5. Validate Duplicate / Unique Ownership rules
  SELECT * INTO v_existing_inventory
  FROM public.inventory
  WHERE user_id = v_user_id AND item_id = p_item_id;

  IF v_item.is_unique AND v_existing_inventory.id IS NOT NULL THEN
    RAISE EXCEPTION 'Duplicate Purchase: Unique items can only be owned once.';
  END IF;

  -- 6. Deduct Gold balance atomically
  v_new_gold := v_character.gold - v_item.price;

  UPDATE public.characters
  SET gold = v_new_gold,
      updated_at = now()
  WHERE id = v_character.id;

  -- 7. Add or update inventory record
  IF v_existing_inventory.id IS NOT NULL THEN
    -- Consumable stackable item increment
    UPDATE public.inventory
    SET quantity = quantity + 1
    WHERE id = v_existing_inventory.id
    RETURNING id INTO v_inventory_id;
  ELSE
    -- Initial inventory insertion
    INSERT INTO public.inventory (user_id, item_id, quantity, equipped, acquired_at)
    VALUES (v_user_id, p_item_id, 1, false, now())
    RETURNING id INTO v_inventory_id;
  END IF;

  -- 8. Return purchase confirmation payload
  RETURN jsonb_build_object(
    'success', true,
    'item_id', p_item_id,
    'item_name', v_item.name,
    'price_paid', v_item.price,
    'new_gold_balance', v_new_gold,
    'inventory_id', v_inventory_id,
    'purchased_at', now()
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.purchase_shop_item(UUID) TO authenticated, service_role;

