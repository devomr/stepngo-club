import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, model } from '@angular/core';
import { SneakerLevel } from '@shared/types/sneaker-level.type';
import { TrendBadgeComponent } from '@shared/components/trend-badge/trend-badge.component';
import { EarningsStore } from '../../store/earnings.store';
import { EarningsService } from '../../services/earnings.service';
import { Sneaker } from '@shared/types/sneaker.type';
import { AlertComponent } from '@shared/components/alert/alert.component';

@Component({
  selector: 'app-sneaker-level-stats',
  standalone: true,
  imports: [TrendBadgeComponent, AlertComponent],
  templateUrl: './sneaker-level-stats.component.html',
  styleUrl: './sneaker-level-stats.component.css',
})
export class SneakerLevelStatsComponent {
  level = input.required<SneakerLevel>();
  open = model.required<boolean>();

  readonly earningsStore = inject(EarningsStore);
  readonly earningsService = inject(EarningsService);

  readonly newEfficiency = computed((): number => {
    const totalEfficiency = this.earningsStore.totalEfficiency();
    const qualityLevelPoints = this.earningsStore.sneaker.quality.levelPoints();
    const levelDiff = this.level().level - this.earningsStore.sneaker().level;

    return totalEfficiency + qualityLevelPoints * levelDiff;
  });

  readonly levelEarnings = computed((): number => {
    const qualityLevelPoints = this.earningsStore.sneaker.quality.levelPoints();
    const levelDiff = this.level().level - this.earningsStore.sneaker().level;
    const currentEfficiencyLevelPoints =
      this.earningsStore.sneaker().efficiencyLevelPoints;

    const newSneaker: Sneaker = {
      ...this.earningsStore.sneaker(),
      efficiencyLevelPoints:
        currentEfficiencyLevelPoints + qualityLevelPoints * levelDiff,
    };

    return this.earningsService.calculateEarnings(
      newSneaker,
      this.earningsStore.energy(),
      this.earningsStore.fitnessLevel(),
    );
  });

  readonly earningsPercentage = computed((): number => {
    const currentEarnings = this.earningsStore.earnings().ggt;
    const newEarnings = this.levelEarnings();

    if (currentEarnings === 0) {
      return 0;
    }

    return ((newEarnings - currentEarnings) / currentEarnings) * 100;
  });

  toggle(): void {
    this.open.update((current) => !current);
  }
}
