import { Component, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { SneakerCardComponent } from './components/sneaker-card/sneaker-card.component';
import { Sneaker } from './types/sneaker.type';
import {
  COMMON_SNEAKER,
  SNEAKER_QUALITIES,
  SneakerQuality,
} from './types/sneaker-quality.type';
import {
  SNEAKER_TYPES,
  SneakerType,
  WALKER_SNEAKER,
} from './types/sneaker-type.type';
import { InfoTooltipComponent } from '@shared/components/info-tooltip/info-tooltip.component';
import { sneakerLevelValidator } from './validators/sneaker-level.validator';
import { SneakerAttribute } from './types/sneaker-attribute.type';
import { TokensStore } from '@shared/stores/tokens.store';
import { ggt } from '@shared/services/token.service';

@Component({
  selector: 'app-earn-calculator',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    SneakerCardComponent,
    InfoTooltipComponent,
  ],
  templateUrl: './earn-calculator.component.html',
  styleUrl: './earn-calculator.component.css',
})
export class EarnCalculatorComponent {
  private fb = inject(FormBuilder);
  private readonly store = inject(TokensStore);

  readonly sneaker = signal<Sneaker>({
    quality: COMMON_SNEAKER,
    type: WALKER_SNEAKER,
    level: 0,
    efficiency: 1,
    efficiencyLevelPoints: 0,
  });
  readonly ggtEarnings = signal(0);
  readonly maxGgt = signal(5);
  readonly totalPoints = signal(0);
  readonly usdtEarnings = computed(() => {
    const ggtPrice = this.store.tokens().find((t) => t.id === ggt.id)?.price;

    if (!ggtPrice) {
      return 0;
    }

    return this.ggtEarnings() * ggtPrice;
  });

  readonly sneakerQualities = SNEAKER_QUALITIES.map((q) => q.value);
  readonly sneakerTypes = SNEAKER_TYPES.map((t) => t.value);

  private readonly qualityControl = new FormControl<string>(
    { value: COMMON_SNEAKER.value, disabled: true },
    [Validators.required],
  );

  readonly typeControl = new FormControl(WALKER_SNEAKER.value, [
    Validators.required,
  ]);
  readonly levelControl = new FormControl<number>(0, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.min(0),
      sneakerLevelValidator(this.qualityControl),
    ],
  });
  readonly effciencyControl = new FormControl(1, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
  ]);
  readonly efficiencyLevelPointsControl = new FormControl(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(0),
  ]);

  readonly energyControl = new FormControl(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(30),
  ]);

  readonly fitnessControl = new FormControl(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(150),
  ]);

  readonly earningsForm = this.fb.nonNullable.group({
    quality: this.qualityControl,
    type: this.typeControl,
    level: this.levelControl,
    efficiency: this.effciencyControl,
    efficiencyLevelPoints: this.efficiencyLevelPointsControl,
    energy: this.energyControl,
    fitness: this.fitnessControl,
  });

  constructor() {
    this.earningsForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((_) => this.calculateEarnings());

    this.typeControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        const sneakerType = SNEAKER_TYPES.find((t) => t.value === value);

        if (sneakerType) {
          this.sneaker.set({ ...this.sneaker(), type: sneakerType });
        }
      });

    this.levelControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (this.levelControl.invalid) {
          return;
        }

        // set the maximum GGT amount that can be earned
        this.maxGgt.set((value + 1) * 5);

        // calculate available points that can be set to the attributes
        this.totalPoints.set(value * this.sneaker().quality.levelPoints);

        // update effciency level points control
        this.efficiencyLevelPointsControl.reset();
        this.efficiencyLevelPointsControl.setValidators([
          Validators.min(0),
          Validators.max(this.totalPoints()),
        ]);
        this.efficiencyLevelPointsControl.updateValueAndValidity();

        this.sneaker.set({ ...this.sneaker(), level: value });
      });

    this.effciencyControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (this.effciencyControl.invalid || value == null) {
          return;
        }

        this.sneaker.set({ ...this.sneaker(), efficiency: value });
      });

    this.efficiencyLevelPointsControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        const efficiencyLevelPoints = value ?? 0;

        const level = this.levelControl.value ?? 0;
        const levelTotalPoints = level * this.sneaker().quality.levelPoints;
        this.totalPoints.set(levelTotalPoints - efficiencyLevelPoints);

        if (this.efficiencyLevelPointsControl.invalid) {
          return;
        }

        this.sneaker.set({
          ...this.sneaker(),
          efficiencyLevelPoints: efficiencyLevelPoints,
        });
      });
  }

  onMaxPoints(attribute: SneakerAttribute): void {
    if (attribute === 'Efficiency') {
      const currentEfficiencyLevelPoints =
        this.efficiencyLevelPointsControl.value ?? 0;

      this.efficiencyLevelPointsControl.setValue(
        this.totalPoints() + currentEfficiencyLevelPoints,
      );
    }
    this.totalPoints.set(0);
  }

  onResetPoints(): void {
    this.effciencyControl.setValue(1);
    this.efficiencyLevelPointsControl.setValue(0);

    const level = this.levelControl.value ?? 0;
    this.totalPoints.set(level * this.sneaker().quality.levelPoints);
  }

  private calculateEarnings(): void {
    const effciency = this.sneaker().efficiency;
    const efficiencyLevelPoints = this.sneaker().efficiencyLevelPoints;
    const type = this.sneaker().type;

    const totalEfficiency = effciency + efficiencyLevelPoints;

    const energy = this.energyControl.value ?? 0;
    const fitness = this.fitnessControl.value ?? 0;

    const p = type.return * Math.pow(totalEfficiency, 0.5);
    const ep = p * energy;
    const epfl = (ep * fitness) / 100;
    const ggt = Math.round(epfl * 100) / 100;

    this.ggtEarnings.set(ggt);
  }
}
