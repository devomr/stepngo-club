import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-token-price-change',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './token-price-change.component.html',
  styleUrl: './token-price-change.component.css',
})
export class TokenPriceChangeComponent {
  change = input.required<number>();
}
