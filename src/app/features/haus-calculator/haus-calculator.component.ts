import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SNEAKER_TYPES, WALKER_SNEAKER } from '@shared/types/sneaker-type.type';
import { HausStore } from './store/haus.store';
import { CurrencyPipe } from '@angular/common';
import { TokensStore } from '@shared/stores/tokens.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-haus-calculator',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  providers: [HausStore],
  templateUrl: './haus-calculator.component.html',
  styleUrl: './haus-calculator.component.css',
})
export class HausCalculatorComponent {
  private readonly fb = inject(FormBuilder);
  readonly tokensStore = inject(TokensStore);
  readonly hausStore = inject(HausStore);

  readonly sneakerTypes = SNEAKER_TYPES.map((t) => t.value);

  readonly typeControl = new FormControl(WALKER_SNEAKER.value, [
    Validators.required,
  ]);
  readonly effciencyControl = new FormControl(1, [
    Validators.required,
    Validators.min(1),
    Validators.max(90),
  ]);

  readonly energyControl = new FormControl(2, [
    Validators.required,
    Validators.min(2),
    Validators.max(4),
  ]);
  readonly durationControl = new FormControl(14, [Validators.required]);

  readonly profitControl = new FormControl<number>(90, [
    Validators.required,
    Validators.min(0),
    Validators.max(100),
  ]);

  readonly hausForm = this.fb.nonNullable.group({
    type: this.typeControl,
    efficiency: this.effciencyControl,
    energy: this.energyControl,
    duration: this.durationControl,
    profit: this.profitControl,
  });

  constructor() {
    this.hausForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const sneakerType = SNEAKER_TYPES.find((t) => t.value === value.type);

      if (sneakerType != null) {
        this.hausStore.updateContractType(sneakerType);
      }

      if (this.effciencyControl.valid && value.efficiency != null) {
        this.hausStore.updateContractEfficiency(value.efficiency);
      }

      if (value.energy != null) {
        this.hausStore.updateContractEnergy(value.energy);
      }

      if (value.duration != null) {
        this.hausStore.updateContractDuration(value.duration);
      }

      if (value.profit != null) {
        this.hausStore.updateContractHostProfit(value.profit);
      }

      this.hausStore.calculateEarnings();
    });
  }

  get hostProfit() {
    return this.hausForm.value.profit;
  }
}
