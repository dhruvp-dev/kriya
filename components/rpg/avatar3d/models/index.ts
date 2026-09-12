import * as THREE from 'three';
import { BaseModelId } from '../../../../types/avatar.types';
import { createWarriorModel } from './warrior';
import { createMageModel } from './mage';
import { createRogueModel } from './rogue';
import { createClericModel } from './cleric';
import { createBardModel } from './bard';

export const MODEL_REGISTRY: Record<BaseModelId, (tint: string) => THREE.Group> = {
  warrior: createWarriorModel,
  mage: createMageModel,
  rogue: createRogueModel,
  cleric: createClericModel,
  bard: createBardModel,
};
