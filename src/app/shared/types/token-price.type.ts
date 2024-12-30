type TokenPrice = {
  id: string;
  price: number;
};

export type TokenPriceResponse = {
  tokenPrices: TokenPrice[];
  updatedDate: Date;
};
