import React from 'react';
import { ArchitectSvg } from './Architect';
import { ScholarSvg } from './Scholar';
import { MakerSvg } from './Maker';
import { RunnerSvg } from './Runner';
import { CreatorSvg } from './Creator';
import { BuilderSvg } from './Builder';
import { ExplorerSvg } from './Explorer';
import { StrategistSvg } from './Strategist';
import { AvatarVariant } from '../avatarTypes';

export const AVATAR_COMPONENTS: Record<
  AvatarVariant,
  React.ComponentType<{ className?: string }>
> = {
  architect: ArchitectSvg,
  scholar: ScholarSvg,
  maker: MakerSvg,
  runner: RunnerSvg,
  creator: CreatorSvg,
  builder: BuilderSvg,
  explorer: ExplorerSvg,
  strategist: StrategistSvg,
};

export {
  ArchitectSvg,
  ScholarSvg,
  MakerSvg,
  RunnerSvg,
  CreatorSvg,
  BuilderSvg,
  ExplorerSvg,
  StrategistSvg,
};
