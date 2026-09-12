/**
 * KRIYA SVG Avatar System Type Definitions
 */

export type AvatarVariant =
  | 'architect'
  | 'scholar'
  | 'maker'
  | 'runner'
  | 'creator'
  | 'builder'
  | 'explorer'
  | 'strategist';

export type AvatarFrameVariant =
  | 'default'
  | 'coral'
  | 'gold'
  | 'navy'
  | 'achievement'
  | 'seasonal';

export interface AvatarProps {
  variant: AvatarVariant;
  size?: number;
  frame?: AvatarFrameVariant;
  showFrame?: boolean;
  className?: string;
}

export interface AvatarFrameProps {
  variant?: AvatarFrameVariant;
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface AvatarArchetypeMeta {
  id: AvatarVariant;
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  trait: string;
}

export const AVATAR_ARCHETYPES: Record<AvatarVariant, AvatarArchetypeMeta> = {
  architect: {
    id: 'architect',
    name: 'The Architect',
    subtitle: 'Systemic Design & Clarity',
    description: 'Master of structure, long-term vision, and elegant systems.',
    accentColor: '#FFB547', // Gold
    trait: 'Systemic Planning',
  },
  scholar: {
    id: 'scholar',
    name: 'The Scholar',
    subtitle: 'Deep Focus & Knowledge',
    description: 'Driven by curiosity, continuous learning, and sharp intellect.',
    accentColor: '#202B3C', // Navy
    trait: 'Deep Work',
  },
  maker: {
    id: 'maker',
    name: 'The Maker',
    subtitle: 'Craft & Hands-on Energy',
    description: 'Transforms abstract ideas into tangible reality with grit.',
    accentColor: '#F05A3C', // Coral
    trait: 'Execution',
  },
  runner: {
    id: 'runner',
    name: 'The Runner',
    subtitle: 'Momentum & Endurance',
    description: 'Thrives on physical vitality, daily streak consistency, and rhythm.',
    accentColor: '#F05A3C', // Coral
    trait: 'Physical Momentum',
  },
  creator: {
    id: 'creator',
    name: 'The Creator',
    subtitle: 'Synthesis & Expression',
    description: 'Channels imagination and aesthetics into meaningful artifacts.',
    accentColor: '#FFB547', // Gold
    trait: 'Creative Flow',
  },
  builder: {
    id: 'builder',
    name: 'The Builder',
    subtitle: 'Foundation & Resilience',
    description: 'Constructs sturdy habits brick by brick with unwavering discipline.',
    accentColor: '#2E9B72', // Green
    trait: 'Habit Foundations',
  },
  explorer: {
    id: 'explorer',
    name: 'The Explorer',
    subtitle: 'Adaptability & Growth',
    description: 'Seeks new horizons, experiments fearlessly, and learns constantly.',
    accentColor: '#2E9B72', // Green
    trait: 'Growth Mindset',
  },
  strategist: {
    id: 'strategist',
    name: 'The Strategist',
    subtitle: 'Analysis & Tactical Mastery',
    description: 'Evaluates trade-offs, optimizes workflows, and maintains steady calm.',
    accentColor: '#171A21', // Charcoal
    trait: 'Tactical Precision',
  },
};
