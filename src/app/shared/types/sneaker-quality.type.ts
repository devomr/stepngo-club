export type SneakerQuality = {
  value: string;
  levelPoints: number;
  maxLevel: number;
};

export const COMMON_SNEAKER: SneakerQuality = {
  value: 'Common',
  levelPoints: 4,
  maxLevel: 20,
};

export const SNEAKER_QUALITIES = [COMMON_SNEAKER];
