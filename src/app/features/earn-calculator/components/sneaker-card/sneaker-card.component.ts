import { Component, computed, input } from '@angular/core';
import { Sneaker } from '@shared/types/sneaker.type';

@Component({
  selector: 'app-sneaker-card',
  standalone: true,
  imports: [],
  templateUrl: './sneaker-card.component.html',
  styleUrl: './sneaker-card.component.css',
  host: {
    class: 'w-full',
  },
})
export class SneakerCardComponent {
  sneaker = input.required<Sneaker>();

  readonly totalEfficiency = computed(() => {
    const efficiency = this.sneaker().efficiency;
    const efficiencyLevelPoints = this.sneaker().efficiencyLevelPoints;

    return efficiency + efficiencyLevelPoints;
  });

  readonly baseEfficiencyPercentage = computed(() => {
    const efficiency = this.sneaker().efficiency;
    const efficiencyLevelPoints = this.sneaker().efficiencyLevelPoints;
    const totalEfficiency = efficiency + efficiencyLevelPoints;

    let percentage = 0;

    if (totalEfficiency < efficiency) {
      percentage = 100;
    } else {
      percentage = (this.sneaker().efficiency / totalEfficiency) * 100;
    }

    return `${percentage}%`;
  });
}
