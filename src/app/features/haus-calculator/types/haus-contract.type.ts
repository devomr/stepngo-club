import { SneakerType } from '@shared/types/sneaker-type.type';

export type HausContract = {
  type: SneakerType;
  efficiency: number;
  energy: number;
  duration: number;
  hostProfit: number;
  guestProfit: number;
  earnings: {
    host: number;
    guest: number;
    total: number;
    mintQuota: number;
  };
};
