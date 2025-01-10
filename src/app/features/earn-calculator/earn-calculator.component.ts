import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { SneakerCardComponent } from './components/sneaker-card/sneaker-card.component';
import {
  COMMON_SNEAKER,
  SNEAKER_QUALITIES,
} from '@shared/types/sneaker-quality.type';
import { SNEAKER_TYPES, WALKER_SNEAKER } from '@shared/types/sneaker-type.type';
import { InfoTooltipComponent } from '@shared/components/info-tooltip/info-tooltip.component';
import { sneakerLevelValidator } from './validators/sneaker-level.validator';
import { SneakerAttribute } from '@shared/types/sneaker-attribute.type';
import { TokensStore } from '@shared/stores/tokens.store';
import { SneakerLevelupComponent } from './components/sneaker-levelup/sneaker-levelup.component';
import { EarningsStore } from './store/earnings.store';
import { AlertComponent } from '@shared/components/alert/alert.component';

@Component({
  selector: 'app-earn-calculator',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    SneakerCardComponent,
    InfoTooltipComponent,
    SneakerLevelupComponent,
    AlertComponent,
  ],
  templateUrl: './earn-calculator.component.html',
  styleUrl: './earn-calculator.component.css',
})
export class EarnCalculatorComponent {
  private readonly fb = inject(FormBuilder);

  readonly tokensStore = inject(TokensStore);
  readonly earningsStore = inject(EarningsStore);

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
    this.typeControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        const sneakerType = SNEAKER_TYPES.find((t) => t.value === value);

        if (sneakerType) {
          this.earningsStore.updateSneakerType(sneakerType);
          this.earningsStore.calculateEarnings();
        }
      });

    this.levelControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (this.levelControl.invalid) {
          return;
        }

        this.earningsStore.updateSneakerLevel(value);
        this.earningsStore.calculateEarnings();

        // update effciency level points control
        this.efficiencyLevelPointsControl.reset();
        this.efficiencyLevelPointsControl.setValidators([
          Validators.min(0),
          Validators.max(this.earningsStore.levelPoints()),
        ]);
        this.efficiencyLevelPointsControl.updateValueAndValidity();
      });

    this.effciencyControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (this.effciencyControl.invalid || value == null) {
          return;
        }
        this.earningsStore.updateSneakerEfficiency(value);
        this.earningsStore.calculateEarnings();
      });

    this.efficiencyLevelPointsControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (this.efficiencyLevelPointsControl.invalid) {
          return;
        }

        this.earningsStore.updateSneakerEfficiencyLevelPoints(value ?? 0);
        this.earningsStore.calculateEarnings();
      });

    this.energyControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (this.energyControl.invalid || value == null) {
          return;
        }

        this.earningsStore.updateEnergy(value);
        this.earningsStore.calculateEarnings();
      });

    this.fitnessControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (this.fitnessControl.invalid || value == null) {
          return;
        }

        this.earningsStore.updateFitnessLevel(value);
        this.earningsStore.calculateEarnings();
      });
  }

  onMaxPoints(attribute: SneakerAttribute): void {
    if (attribute === 'Efficiency') {
      const currentEfficiencyLevelPoints =
        this.efficiencyLevelPointsControl.value ?? 0;

      this.efficiencyLevelPointsControl.setValue(
        this.earningsStore.levelPoints() + currentEfficiencyLevelPoints,
      );
    }
    // this.totalPoints.set(0);
  }

  onResetPoints(): void {
    this.effciencyControl.setValue(1);
    this.efficiencyLevelPointsControl.setValue(0);

    this.earningsStore.resetLevelPoints();
  }
}
