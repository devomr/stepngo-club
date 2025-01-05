import { Component, inject } from '@angular/core';
import { GiftBagStore } from '../../store/gift-bag.store';

@Component({
  selector: 'app-gift-bag-banner',
  standalone: true,
  imports: [],
  templateUrl: './gift-bag-banner.component.html',
  styleUrl: './gift-bag-banner.component.css',
})
export class GiftBagBannerComponent {
  readonly store = inject(GiftBagStore);
}
