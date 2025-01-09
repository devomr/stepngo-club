import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { COMMON_SNEAKER } from '@shared/types/sneaker-quality.type';
import { SneakerType, WALKER_SNEAKER } from '@shared/types/sneaker-type.type';
import { Sneaker } from '@shared/types/sneaker.type';
import { EarningsService } from '../services/earnings.service';

type EarningsState = {
  sneaker: Sneaker;
  energy: number;
  fitnessLevel: number;
  earnings: {
    ggt: number;
    maxGgt: number;
  };
  levelPoints: number;
  isLoading: boolean;
};

const initialState: EarningsState = {
  sneaker: {
    quality: COMMON_SNEAKER,
    type: WALKER_SNEAKER,
    level: 0,
    efficiency: 1,
    efficiencyLevelPoints: 0,
  },
  energy: 0,
  fitnessLevel: 0,
  earnings: {
    ggt: 0,
    maxGgt: 5,
  },
  levelPoints: 0,
  isLoading: false,
};

export const EarningsStore = signalStore(
  { providedIn: 'root' },
  withState<EarningsState>(initialState),
  withComputed(({ sneaker }) => ({
    totalEfficiency: computed(
      () => sneaker.efficiency() + sneaker.efficiencyLevelPoints(),
    ),
  })),

  withMethods((store, earningsService = inject(EarningsService)) => ({
    updateSneakerType(type: SneakerType) {
      patchState(store, {
        sneaker: {
          ...store.sneaker(),
          type,
        },
      });
    },

    updateSneakerLevel(level: number) {
      patchState(store, (state) => {
        return {
          sneaker: {
            ...store.sneaker(),
            level,
          },
          earnings: {
            ...state.earnings,
            maxGgt: (level + 1) * 5,
          },
          levelPoints: level * state.sneaker.quality.levelPoints,
        };
      });
    },

    updateSneakerEfficiency(efficiency: number) {
      patchState(store, {
        sneaker: {
          ...store.sneaker(),
          efficiency,
        },
      });
    },

    updateSneakerEfficiencyLevelPoints(efficiencyLevelPoints: number) {
      patchState(store, (state) => {
        const levelTotalPoints =
          state.sneaker.level * state.sneaker.quality.levelPoints;

        return {
          sneaker: {
            ...store.sneaker(),
            efficiencyLevelPoints,
          },
          levelPoints: levelTotalPoints - efficiencyLevelPoints,
        };
      });
    },

    updateEnergy(energy: number) {
      patchState(store, {
        energy,
      });
    },

    updateFitnessLevel(fitnessLevel: number) {
      patchState(store, {
        fitnessLevel,
      });
    },

    calculateEarnings() {
      patchState(store, (state) => {
        const ggtEarnings = earningsService.calculateEarnings(
          state.sneaker,
          state.energy,
          state.fitnessLevel,
        );

        return {
          earnings: {
            ...state.earnings,
            ggt: ggtEarnings,
          },
        };
      });
    },

    resetLevelPoints() {
      patchState(store, (state) => {
        return {
          levelPoints: state.sneaker.level * state.sneaker.quality.levelPoints,
        };
      });
    },
  })),
  withHooks({
    onInit: async (store) => {},
  }),
);
