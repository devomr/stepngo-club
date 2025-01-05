type TokenData = {
  id: string;
  price: number;
  change: number;
};

export type TokenDataResponse = {
  tokenData: TokenData[];
  updatedDate: Date;
};
