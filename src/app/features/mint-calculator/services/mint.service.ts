import { Injectable } from '@angular/core';
import { MINT_COSTS } from '../types/mint-cost.type';
import {
  MINT_SNEAKER_TYPE_PERCENTAGES,
  MintSneakerTypeResult,
} from '../types/mint-sneaker-type.type';

@Injectable({
  providedIn: 'root',
})
export class MintService {
  constructor() {}

  getMintSneakerTypePercentage(
    firstSneakerType: string,
    secondSneakerType: string,
  ): MintSneakerTypeResult | null {
    const key1 = `${firstSneakerType.toLowerCase()}:${secondSneakerType.toLowerCase()}`;
    const key2 = `${secondSneakerType.toLowerCase()}:${firstSneakerType.toLowerCase()}`;

    // Return percentages if key exists in the table
    return (
      MINT_SNEAKER_TYPE_PERCENTAGES[key1] ||
      MINT_SNEAKER_TYPE_PERCENTAGES[key2] ||
      null
    );
  }

  getCostForMint(mint: number): number {
    return MINT_COSTS.get(mint) ?? 0;
  }
}
