import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SneakerType, WALKER_SNEAKER } from '@shared/types/sneaker-type.type';
import { HausContract } from '../types/haus-contract.type';
import { EarningsService } from '../../earn-calculator/services/earnings.service';

type HausState = {
  contract: HausContract;
  isLoading: boolean;
};

const initialState: HausState = {
  contract: {
    type: WALKER_SNEAKER,
    efficiency: 1,
    energy: 2,
    duration: 14,
    hostProfit: 90,
    guestProfit: 10,
    earnings: {
      host: 0,
      guest: 0,
      total: 0,
      mintQuota: 0,
    },
  },
  isLoading: false,
};

export const HausStore = signalStore(
  withState<HausState>(initialState),
  withComputed(({ contract }) => ({
    durationWeeks: computed(() => contract.duration() / 7),
    hostDailyEarnings: computed(() => contract.earnings.host()),
    hostTotalEarnings: computed(
      () => contract.earnings.host() * contract.duration(),
    ),
    guestDailyEarnings: computed(() => contract.earnings.guest()),
    guestTotalEarnings: computed(
      () => contract.earnings.guest() * contract.duration(),
    ),
  })),
  withMethods((store, earningsService = inject(EarningsService)) => ({
    updateContractType(quality: SneakerType) {
      patchState(store, (state) => ({
        contract: {
          ...state.contract,
          type: quality,
        },
      }));
    },

    updateContractEfficiency(efficiency: number) {
      patchState(store, (state) => ({
        contract: {
          ...state.contract,
          efficiency,
        },
      }));
    },

    updateContractEnergy(energy: number) {
      patchState(store, (state) => ({
        contract: {
          ...state.contract,
          energy,
        },
      }));
    },

    updateContractDuration(duration: number) {
      patchState(store, (state) => ({
        contract: {
          ...state.contract,
          duration,
        },
      }));
    },

    updateContractHostProfit(hostProfit: number) {
      patchState(store, (state) => ({
        contract: {
          ...state.contract,
          hostProfit,
          guestProfit: 100 - hostProfit,
        },
      }));
    },

    calculateEarnings() {
      patchState(store, (state) => {
        const contract = state.contract;
        const ggtEarnings = earningsService.calculateHausEarnings(
          contract.type,
          contract.efficiency,
          contract.energy,
        );

        const hostEarnings = ggtEarnings * (contract.hostProfit / 100);
        const gustEarnings = ggtEarnings * (contract.guestProfit / 100);
        const mintQuota = Math.floor(
          (contract.energy * contract.duration) / 15,
        );

        return {
          contract: {
            ...state.contract,
            earnings: {
              mintQuota: mintQuota,
              host: hostEarnings,
              guest: gustEarnings,
              total: ggtEarnings,
            },
          },
        };
      });
    },
  })),

  withHooks({
    onInit: async (store) => {
      store.calculateEarnings();
    },
  }),
);
