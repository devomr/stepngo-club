import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withState,
} from '@ngrx/signals';
import { ggt, TokenService } from '@shared/services/token.service';
import { Token } from '@shared/types/token.type';

type TokensState = {
  tokens: Token[];
  isLoading: boolean;
};

const initialState: TokensState = {
  tokens: [],
  isLoading: false,
};

export const TokensStore = signalStore(
  { providedIn: 'root' },
  withState<TokensState>(initialState),
  withComputed(({ tokens }) => ({
    ggtPrice: computed(() => {
      const ggtToken = tokens().find((t) => t.id === ggt.id);
      return ggtToken?.price ?? 0;
    }),
  })),
  withHooks({
    onInit: async (store) => {
      const tokenService = inject(TokenService);

      patchState(store, { isLoading: true });

      const results = await tokenService.getTokensWithPrice();

      patchState(store, {
        tokens: results,
      });
      patchState(store, { isLoading: false });
    },
  }),
);
