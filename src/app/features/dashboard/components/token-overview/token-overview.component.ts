import { Component, inject } from '@angular/core';
import { TokensStore } from '@shared/stores/tokens.store';
import { TokenPriceWidgetComponent } from '@shared/components/token-price-widget/token-price-widget.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-token-overview',
  standalone: true,
  imports: [TokenPriceWidgetComponent, LoaderComponent],
  providers: [TokensStore],
  templateUrl: './token-overview.component.html',
  styleUrl: './token-overview.component.css',
})
export class TokenOverviewComponent {
  readonly store = inject(TokensStore);

  readonly visibleTokens = [
    'go-game-token',
    'stepn',
    'polygon-ecosystem-token',
  ];
}
