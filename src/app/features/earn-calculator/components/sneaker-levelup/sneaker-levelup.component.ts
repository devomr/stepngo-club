import { Component, computed, input, signal } from '@angular/core';
import { Sneaker } from '@shared/types/sneaker.type';
import { SneakerLevelStatsComponent } from '../sneaker-level-stats/sneaker-level-stats.component';
import { SNEAKER_LEVELS } from '@shared/types/sneaker-level.type';
import { COMMON_SNEAKER } from '@shared/types/sneaker-quality.type';

@Component({
  selector: 'app-sneaker-levelup',
  standalone: true,
  imports: [SneakerLevelStatsComponent],
  templateUrl: './sneaker-levelup.component.html',
  styleUrl: './sneaker-levelup.component.css',
})
export class SneakerLevelupComponent {
  sneaker = input.required<Sneaker>();
  dailyEnergy = input.required<number>();
  fitnessLevel = input.required<number>();

  readonly statsOpen = signal(false);

  readonly remainingLevels = computed(() => {
    return SNEAKER_LEVELS.filter((ul) => ul.level > this.sneaker().level);
  });

  readonly totalCost = computed(() => {
    return this.remainingLevels().reduce((sum, level) => sum + level.cost, 0);
  });

  readonly totalMinutes = computed(() => {
    return this.remainingLevels().reduce(
      (sum, level) => sum + level.minutes,
      0,
    );
  });

  toggleStats(): void {
    this.statsOpen.set(!this.statsOpen());
  }

  isMaxLevel(): boolean {
    const isCommon = this.sneaker().quality.value === COMMON_SNEAKER.value;

    if (isCommon) {
      return this.sneaker().level === COMMON_SNEAKER.maxLevel;
    }
    return false;
  }
}
