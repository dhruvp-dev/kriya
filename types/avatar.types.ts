/**
 * 3D Avatar System Type Definitions for Kriya
 */

export type BaseModelId = 'warrior' | 'mage' | 'rogue' | 'cleric' | 'bard';
export type HatOption = 'none' | 'helmet_warrior' | 'hood_mage' | 'beret_bard';
export type WeaponOption = 'none' | 'sword_01' | 'staff_01' | 'dagger_01';
export type BackOption = 'none' | 'cape_crimson' | 'wings_feather';

export interface AvatarConfig {
  baseModel: BaseModelId;
  tint: string; // Hex color code e.g. '#6366f1'
  hat: HatOption;
  weapon: WeaponOption;
  back: BackOption;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  baseModel: 'warrior',
  tint: '#6366f1',
  hat: 'none',
  weapon: 'none',
  back: 'none',
};

export interface BaseModelMeta {
  id: BaseModelId;
  name: string;
  description: string;
  defaultTint: string;
}

export const BASE_MODELS: BaseModelMeta[] = [
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'Heavy armored, broad stance built for strength',
    defaultTint: '#6366f1', // Indigo
  },
  {
    id: 'mage',
    name: 'Mage',
    description: 'Tall, robed scholar focusing on intellect',
    defaultTint: '#8b5cf6', // Violet
  },
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'Agile, sleek build favored by the swift',
    defaultTint: '#10b981', // Emerald
  },
  {
    id: 'cleric',
    name: 'Cleric',
    description: 'Stalwart protector with disciplined aura',
    defaultTint: '#f59e0b', // Amber
  },
  {
    id: 'bard',
    name: 'Bard',
    description: 'Expressive adventurer driven by creativity',
    defaultTint: '#ec4899', // Pink
  },
];

export interface AccessoryOptionMeta {
  key: string;
  name: string;
  slot: 'hat' | 'weapon' | 'back';
}

export const ACCESSORY_OPTIONS: Record<'hat' | 'weapon' | 'back', AccessoryOptionMeta[]> = {
  hat: [
    { key: 'none', name: 'None', slot: 'hat' },
    { key: 'helmet_warrior', name: 'Warrior Helmet', slot: 'hat' },
    { key: 'hood_mage', name: 'Mage Cowl', slot: 'hat' },
    { key: 'beret_bard', name: 'Feathered Beret', slot: 'hat' },
  ],
  weapon: [
    { key: 'none', name: 'None', slot: 'weapon' },
    { key: 'sword_01', name: 'Iron Broadsword', slot: 'weapon' },
    { key: 'staff_01', name: 'Arcane Staff', slot: 'weapon' },
    { key: 'dagger_01', name: 'Shadow Dagger', slot: 'weapon' },
  ],
  back: [
    { key: 'none', name: 'None', slot: 'back' },
    { key: 'cape_crimson', name: 'Crimson Cloak', slot: 'back' },
    { key: 'wings_feather', name: 'Guardian Wings', slot: 'back' },
  ],
};
