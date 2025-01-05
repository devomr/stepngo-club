import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withState } from '@ngrx/signals';
import { GiftBagService } from '../services/gift-bag.service';

type GiftBagState = {
  code: string | null;
  isLoading: boolean;
};

const initialState: GiftBagState = {
  code: null,
  isLoading: false,
};

export const GiftBagStore = signalStore(
  { providedIn: 'root' },
  withState<GiftBagState>(initialState),
  withHooks({
    onInit: async (store) => {
      const giftBagService = inject(GiftBagService);

      patchState(store, { isLoading: true });

      const giftCode = await giftBagService.getGiftBagCode();

      patchState(store, {
        code: giftCode,
      });
      patchState(store, { isLoading: false });
    },
  }),
);
