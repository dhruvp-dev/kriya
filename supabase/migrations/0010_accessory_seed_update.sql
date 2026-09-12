-- Migration 0010: Shop Items Update for 3D Avatar Accessories
-- Updates existing avatar items and inserts new swappable avatar accessories

INSERT INTO public.shop_items (id, name, description, price, type, is_unique, metadata)
VALUES
  (
    '10000000-0000-0000-0000-000000000005',
    'Warrior Helmet Accessory',
    'Armored helmet overlay for your 3D avatar',
    60,
    'avatar_item',
    true,
    '{"accessory_key": "helmet", "avatar_accessory": {"slot": "hat", "option_key": "helmet_warrior"}}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000010',
    'Mage Cowl',
    'Mystic robed cowl for scholars of magic',
    70,
    'avatar_item',
    true,
    '{"avatar_accessory": {"slot": "hat", "option_key": "hood_mage"}}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000011',
    'Feathered Beret',
    'Stylish cap with a dashing feather',
    50,
    'avatar_item',
    true,
    '{"avatar_accessory": {"slot": "hat", "option_key": "beret_bard"}}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000012',
    'Iron Broadsword',
    'Sturdy iron blade for valiant warriors',
    80,
    'avatar_item',
    true,
    '{"avatar_accessory": {"slot": "weapon", "option_key": "sword_01"}}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000013',
    'Arcane Staff',
    'Glowing crystal staff imbued with raw energy',
    90,
    'avatar_item',
    true,
    '{"avatar_accessory": {"slot": "weapon", "option_key": "staff_01"}}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000014',
    'Shadow Dagger',
    'Swift curved blade crafted for stealth',
    75,
    'avatar_item',
    true,
    '{"avatar_accessory": {"slot": "weapon", "option_key": "dagger_01"}}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000015',
    'Crimson Cloak',
    'Flowing red cape that commands attention',
    85,
    'avatar_item',
    true,
    '{"avatar_accessory": {"slot": "back", "option_key": "cape_crimson"}}'::jsonb
  ),
  (
    '10000000-0000-0000-0000-000000000016',
    'Guardian Wings',
    'Golden winged backpiece for elite heroes',
    120,
    'avatar_item',
    true,
    '{"avatar_accessory": {"slot": "back", "option_key": "wings_feather"}}'::jsonb
  )
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  type = EXCLUDED.type,
  is_unique = EXCLUDED.is_unique,
  metadata = EXCLUDED.metadata;
