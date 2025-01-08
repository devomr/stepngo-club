export type MintSneakerTypeResult = {
  walker: number;
  jogger: number;
  runner: number;
  trainer: number;
};

type MintSneakerTypePercentage = {
  [key: string]: MintSneakerTypeResult;
};

export const MINT_SNEAKER_TYPE_PERCENTAGES: MintSneakerTypePercentage = {
  'walker:walker': { walker: 85, jogger: 6, runner: 6, trainer: 3 },
  'walker:jogger': { walker: 45, jogger: 45, runner: 7, trainer: 3 },
  'walker:runner': { walker: 45, jogger: 7, runner: 45, trainer: 3 },
  'walker:trainer': { walker: 80, jogger: 6, runner: 6, trainer: 8 },
  'jogger:jogger': { walker: 6, jogger: 85, runner: 6, trainer: 3 },
  'jogger:runner': { walker: 7, jogger: 45, runner: 45, trainer: 3 },
  'jogger:trainer': { walker: 6, jogger: 80, runner: 6, trainer: 8 },
  'runner:runner': { walker: 6, jogger: 6, runner: 85, trainer: 3 },
  'runner:trainer': { walker: 6, jogger: 6, runner: 80, trainer: 8 },
  'trainer:trainer': { walker: 25, jogger: 25, runner: 25, trainer: 25 },
};
