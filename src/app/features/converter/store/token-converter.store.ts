import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TokenService } from '@shared/services/token.service';
import { Token } from '@shared/types/token.type';

type TokenConversion = Token & {
  amount: number;
};

type TokenConverterState = {
  tokens: TokenConversion[];
  isLoading: boolean;
};

const initialState: TokenConverterState = {
  tokens: [],
  isLoading: false,
};

export const TokenConverterStore = signalStore(
  { providedIn: 'root' },
  withState<TokenConverterState>(initialState),
  withComputed(({ tokens }) => ({
    lastUpdate: computed(() => {
      return tokens()[0].updatedDate;
    }),
  })),
  withMethods((store) => ({
    updateToken(symbol: string, amount: number): void {
      const baseToken = store.tokens().find((t) => t.symbol === symbol);

      if (!baseToken) {
        return;
      }

      const convertedTokens = store.tokens().map((token) =>
        token.symbol === symbol
          ? { ...token }
          : {
              ...token,
              amount: (amount * baseToken.price) / token.price,
            },
      );

      patchState(store, {
        tokens: convertedTokens,
      });
    },
  })),
  withHooks({
    onInit: async (store) => {
      const tokenService = inject(TokenService);

      patchState(store, { isLoading: true });

      const results = await tokenService.getTokensWithPrice();
      const tokenConversions = results.map((token) => ({
        ...token,
        amount: 0,
      }));

      patchState(store, {
        tokens: tokenConversions,
        isLoading: false,
      });
    },
  }),
);
