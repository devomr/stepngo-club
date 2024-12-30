import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Token } from '@shared/types/token.type';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';

@Component({
  selector: 'app-token-price-widget',
  standalone: true,
  imports: [CurrencyPipe, DateAgoPipe],
  templateUrl: './token-price-widget.component.html',
  styleUrl: './token-price-widget.component.css',
})
export class TokenPriceWidgetComponent {
  token = input<Token>();
}
