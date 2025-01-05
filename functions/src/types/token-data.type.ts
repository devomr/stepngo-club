type TokenInfo = {
  usd: number;
  usd_24h_change: number;
};

export type TokenData = {
  [key: string]: TokenInfo;
};
