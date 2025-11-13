import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'modificatorBonus',
})
export class ModificatorBonusPipe implements PipeTransform {
  transform(value: number): string {
    const smbl = value - 10 > 0 ? '+' : '';
    const modValue = (value - 10) / 2;

    return `${smbl}${modValue}`;
  }
}
