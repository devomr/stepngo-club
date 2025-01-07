import { SneakerQuality } from './sneaker-quality.type';
import { SneakerType } from './sneaker-type.type';

export type Sneaker = {
  quality: SneakerQuality;
  type: SneakerType;
  level: number;
  efficiency: number;
  efficiencyLevelPoints: number;
};
