import { Component, inject } from '@angular/core';
import { GiftBagStore } from './store/gift-bag.store';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { AlertComponent } from '@shared/components/alert/alert.component';

@Component({
  selector: 'app-gift-bag',
  standalone: true,
  imports: [LoaderComponent, AlertComponent],
  templateUrl: './gift-bag.component.html',
  styleUrl: './gift-bag.component.css',
})
export class GiftBagComponent {
  readonly store = inject(GiftBagStore);
  readonly infoItems = [
    'only brand new (empty) accounts can use a Gift Bag code',
    'Gift Bag code can be entered in the window that appears after your first login into the application',
    'an account that uses a Gift Bag code will receive 6 energy and a Trial Sneaker (Level 2 Trainer) ',
    'contract duration is for 2 weeks',
    'user can earn approx. 22-24 GGT',
    'all GGT earned will be erased unless the user buys and burns a new sneaker before the Gift Bag expires (contract ends)',
    'GGT earned cannot be withdrawn until the user activates the account (burns a sneaker)',
    'a Gift Bag user will be able to join a Haus once the contract ends',
    "Gift Bag Code Giver will receive 6% of the purchase price from the user's first shoe as GMT, and 2% from all future marketplace transactions",
  ];
}
