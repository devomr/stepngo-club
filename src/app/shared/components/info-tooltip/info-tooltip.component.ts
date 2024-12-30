import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './info-tooltip.component.html',
  styleUrl: './info-tooltip.component.css',
})
export class InfoTooltipComponent {
  message = input.required<string>();
}
