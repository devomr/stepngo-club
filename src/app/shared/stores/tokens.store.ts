import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withState } from '@ngrx/signals';
import { TokenService } from '@shared/services/token.service';
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
