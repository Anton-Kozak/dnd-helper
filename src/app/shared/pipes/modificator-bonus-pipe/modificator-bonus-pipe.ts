import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'modificatorBonus',
})
export class ModificatorBonusPipe implements PipeTransform {
  transform(value: number | string): string {
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && /[a-zA-Z]/.test(value))
    ) {
      return 'N/A';
    }

    const numericValue = +value;
    const smbl = numericValue - 10 > 0 ? '+' : '';
    const modValue = Math.floor((numericValue - 10) / 2);

    return `${smbl}${modValue}`;
  }
}
