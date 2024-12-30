import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TokenConverterStore } from './store/token-converter.store';
import { DateAgoPipe } from '@shared/pipes/date-ago.pipe';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CurrencyPipe, DateAgoPipe, LoaderComponent],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  readonly store = inject(TokenConverterStore);

  updateToken(symbol: string, event: Event) {
    const target = event.target as HTMLInputElement;
    this.store.updateToken(symbol, parseFloat(target.value));
  }

  formatNumber(amount: number) {
    if (amount === 0) return '';

    return amount.toFixed(2);
  }
}
