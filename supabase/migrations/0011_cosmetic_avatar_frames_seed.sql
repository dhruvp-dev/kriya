-- Migration 0011: Premium Cosmetic Avatar Frames Seed
-- Inserts purchasable cosmetic avatar frames into public.shop_items

INSERT INTO public.shop_items (id, name, description, price, type, is_unique, metadata)
VALUES
  (
    '10000000-0000-0000-0000-000000000021',
    'Coral Notch Frame',
    'Energetic KRIYA coral corner notches cosmetic avatar frame',
    150,
    'avatar_item',
    true,
    '{"avatar_frame": "coral", "frame_type": "coral"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000022',
    'Navy Tech Frame',
    'Deep navy technical grid border cosmetic avatar frame',
    200,
    'avatar_item',
    true,
    '{"avatar_frame": "navy", "frame_type": "navy"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000023',
    'Retro Seasonal Star Frame',
    'Cozy pixel stars corner cosmetic avatar frame',
    250,
    'avatar_item',
    true,
    '{"avatar_frame": "seasonal", "frame_type": "seasonal"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000024',
    'Gold Tier Frame',
    'Shimmering metallic gold border with studs cosmetic avatar frame',
    300,
    'avatar_item',
    true,
    '{"avatar_frame": "gold", "frame_type": "gold"}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000025',
    'Legendary Achievement Frame',
    'Prestige emerald & gold achievement cosmetic avatar frame',
    400,
    'avatar_item',
    true,
    '{"avatar_frame": "achievement", "frame_type": "achievement"}'::jsonb
  )
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  type = EXCLUDED.type,
  is_unique = EXCLUDED.is_unique,
  metadata = EXCLUDED.metadata;
