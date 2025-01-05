import { Component, inject } from '@angular/core';
import { GiftBagStore } from './store/gift-bag.store';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-gift-bag',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './gift-bag.component.html',
  styleUrl: './gift-bag.component.css',
})
export class GiftBagComponent {
  readonly store = inject(GiftBagStore);
  readonly infoItems = [
    'only brand new (empty) accounts can use a Gift Bag code',
    'an account that uses a Gift Bag code will receive 6 energy and a temporary Level 2 Trainer',
    'contract duration is for 14 days',
    'user can earn approx. 22-24 GGT',
    'GGT earned cannot be withdrawn until the user activates the account (burns a sneaker)',
    'all GGT earned will be erased unless the user burns a new sneaker before the Gift Bag expires (max 2 weeks duration)',
    'a Gift Bag user will be able to join a Haus once the contract ends',
    "Gift Bag Code Giver will receive 6% of the purchase price from the user's first shoe as GMT, and 2% from all future marketplace transactions",
  ];
}
