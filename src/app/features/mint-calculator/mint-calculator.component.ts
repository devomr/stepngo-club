import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  COMMON_SNEAKER,
  SNEAKER_QUALITIES,
} from '@shared/types/sneaker-quality.type';
import { SNEAKER_TYPES, WALKER_SNEAKER } from '@shared/types/sneaker-type.type';
import { InfoTooltipComponent } from '@shared/components/info-tooltip/info-tooltip.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { MintStore } from './store/mint.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SneakerMint } from './types/sneaker-mint.type';
import { TokensStore } from '@shared/stores/tokens.store';

@Component({
  selector: 'app-mint-calculator',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    InfoTooltipComponent,
    AlertComponent,
  ],
  providers: [MintStore],
  templateUrl: './mint-calculator.component.html',
  styleUrl: './mint-calculator.component.css',
})
export class MintCalculatorComponent {
  private readonly fb = inject(FormBuilder);
  readonly tokensStore = inject(TokensStore);
  readonly store = inject(MintStore);

  readonly sneakerQualities = SNEAKER_QUALITIES.map((q) => q.value);
  readonly sneakerTypes = SNEAKER_TYPES.map((t) => t.value);

  readonly leftSneakerForm = this.fb.nonNullable.group({
    quality: new FormControl<string>(
      { value: COMMON_SNEAKER.value, disabled: true },
      [Validators.required],
    ),
    type: new FormControl<string>(WALKER_SNEAKER.value, [Validators.required]),
    mint: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(6),
    ]),
  });

  readonly rightSneakerForm = this.fb.nonNullable.group({
    quality: new FormControl<string>(
      { value: COMMON_SNEAKER.value, disabled: true },
      [Validators.required],
    ),
    type: new FormControl<string>(WALKER_SNEAKER.value, [Validators.required]),
    mint: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(7),
    ]),
  });

  constructor() {
    this.leftSneakerForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (data.type == null) {
          return;
        }
        const sneakerMint: SneakerMint = {
          quality: COMMON_SNEAKER.value, // remove this when enable quality dropdown
          type: data.type,
          mint: data.mint ?? 0,
        };

        this.store.updateLeftSneakerMint(sneakerMint);
      });

    this.rightSneakerForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (data.type == null) {
          return;
        }
        const sneakerMint: SneakerMint = {
          quality: COMMON_SNEAKER.value, // remove this when enable quality dropdown
          type: data.type,
          mint: data.mint ?? 0,
        };

        this.store.updateRightSneakerMint(sneakerMint);
      });
  }

  get leftSneakerMint() {
    return this.leftSneakerForm.value.mint;
  }

  get rightSneakerMint() {
    return this.rightSneakerForm.value.mint;
  }
}
