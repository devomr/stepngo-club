import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SNEAKER_QUALITIES } from '@shared/types/sneaker-quality.type';

export function sneakerLevelValidator(
  qualityControl: AbstractControl,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const quality = qualityControl.value;
    const level = control.value;

    const sneakerQuality = SNEAKER_QUALITIES.find((q) => q.value === quality);

    if (!sneakerQuality) {
      return null;
    }

    if (level != null && level > sneakerQuality?.maxLevel) {
      return { levelExceeded: true };
    }

    return null; // No error
  };
}
