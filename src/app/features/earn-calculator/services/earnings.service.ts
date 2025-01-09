import { Injectable } from '@angular/core';
import { Sneaker } from '@shared/types/sneaker.type';

@Injectable({
  providedIn: 'root',
})
export class EarningsService {
  constructor() {}

  calculateEarnings(
    sneaker: Sneaker,
    energy: number,
    fitnessLevel: number,
  ): number {
    const totalEfficiency = sneaker.efficiency + sneaker.efficiencyLevelPoints;
    const p = sneaker.type.return * Math.pow(totalEfficiency, 0.5);
    const ep = p * energy;
    const epfl = (ep * fitnessLevel) / 100;

    return Math.round(epfl * 100) / 100;
  }
}
