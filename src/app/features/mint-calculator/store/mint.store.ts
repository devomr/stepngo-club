import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { COMMON_SNEAKER } from '@shared/types/sneaker-quality.type';
import { WALKER_SNEAKER } from '@shared/types/sneaker-type.type';
import { SneakerMint } from '../types/sneaker-mint.type';
import { MintService } from '../services/mint.service';
import { MintSneakerTypeResult } from '../types/mint-sneaker-type.type';

type MintState = {
  leftSneakerMint: SneakerMint;
  rightSneakerMint: SneakerMint;
  totalCost: number;
  sneakerTypeResult: MintSneakerTypeResult | null;
};

const initialState: MintState = {
  leftSneakerMint: {
    quality: COMMON_SNEAKER.value,
    type: WALKER_SNEAKER.value,
    mint: 0,
  },
  rightSneakerMint: {
    quality: COMMON_SNEAKER.value,
    type: WALKER_SNEAKER.value,
    mint: 0,
  },
  totalCost: 0,
  sneakerTypeResult: null,
};

export const MintStore = signalStore(
  withState<MintState>(initialState),
  withMethods((store, mintService = inject(MintService)) => ({
    updateLeftSneakerMint(sneakerMint: SneakerMint) {
      patchState(store, {
        leftSneakerMint: sneakerMint,
      });

      this.updateMintCost();
      this.updateSneakerTypeResult();
    },

    updateRightSneakerMint(sneakerMint: SneakerMint) {
      patchState(store, {
        rightSneakerMint: sneakerMint,
      });

      this.updateMintCost();
      this.updateSneakerTypeResult();
    },

    updateMintCost() {
      patchState(store, (state) => {
        const leftSneakerCost = mintService.getCostForMint(
          state.leftSneakerMint.mint,
        );
        const rightSneakerCost = mintService.getCostForMint(
          state.rightSneakerMint.mint,
        );

        return {
          totalCost: leftSneakerCost + rightSneakerCost,
        };
      });
    },
    updateSneakerTypeResult() {
      patchState(store, (state) => {
        const result = mintService.getMintSneakerTypePercentage(
          state.leftSneakerMint.type,
          state.rightSneakerMint.type,
        );

        return {
          sneakerTypeResult: result,
        };
      });
    },
  })),
  withHooks({
    onInit: async (store) => {
      store.updateMintCost();
      store.updateSneakerTypeResult();
    },
  }),
);
