import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-trend-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trend-badge.component.html',
  styleUrl: './trend-badge.component.css',
})
export class TrendBadgeComponent {
  change = input.required<number>();
  title = input<string>();
}
