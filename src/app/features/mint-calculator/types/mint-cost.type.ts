export type MintCost = {
  mint: number;
  cost: number;
};

export const MINT_COSTS = new Map<number, number>();
MINT_COSTS.set(0, 200);
MINT_COSTS.set(1, 200);
MINT_COSTS.set(2, 300);
MINT_COSTS.set(3, 400);
MINT_COSTS.set(4, 500);
MINT_COSTS.set(5, 600);
MINT_COSTS.set(6, 700);
