import { ArchitectBlob } from './ArchitectBlob';
import { ScholarBlob } from './ScholarBlob';
import { MakerBlob } from './MakerBlob';
import { RunnerBlob } from './RunnerBlob';
import { CreatorBlob } from './CreatorBlob';
import { BuilderBlob } from './BuilderBlob';
import { ExplorerBlob } from './ExplorerBlob';
import { StrategistBlob } from './StrategistBlob';
import { AvatarVariant } from '../avatarTypes';

export const BLOB_AVATAR_COMPONENTS: Record<AvatarVariant, React.ComponentType<{ className?: string }>> = {
  architect: ArchitectBlob,
  scholar: ScholarBlob,
  maker: MakerBlob,
  runner: RunnerBlob,
  creator: CreatorBlob,
  builder: BuilderBlob,
  explorer: ExplorerBlob,
  strategist: StrategistBlob,
};

export {
  ArchitectBlob,
  ScholarBlob,
  MakerBlob,
  RunnerBlob,
  CreatorBlob,
  BuilderBlob,
  ExplorerBlob,
  StrategistBlob,
};
