import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Token } from '@shared/types/token.type';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { TokenPriceChangeComponent } from '../token-price-change/token-price-change.component';

@Component({
  selector: 'app-token-price-widget',
  standalone: true,
  imports: [CurrencyPipe, DateAgoPipe, TokenPriceChangeComponent],
  templateUrl: './token-price-widget.component.html',
  styleUrl: './token-price-widget.component.css',
})
export class TokenPriceWidgetComponent {
  token = input.required<Token>();
}
