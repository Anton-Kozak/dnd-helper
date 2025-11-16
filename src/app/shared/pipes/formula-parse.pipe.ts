import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'formulaParse',
})
export class FormulaParsePipe implements PipeTransform {
  // @atk mw - melee weapon
  // @atk rw - range weapon
  // @hit - bonus to hit
  // @h - damage in avereage
  // @damage - damage in dice

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }
}
