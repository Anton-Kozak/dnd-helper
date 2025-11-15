import { Injectable, signal } from '@angular/core';
import { IStatBlock } from 'src/model/interfaces/statblock.interface';

@Injectable({ providedIn: 'root' })
export class StatblockService {
  private selectedStatblock = signal<IStatBlock>({} as IStatBlock);

  public readonly selectedStatblock$ = this.selectedStatblock.asReadonly();

  setSelectedStatBlock(statBlock: IStatBlock): void {
    this.selectedStatblock.set(statBlock);
  }
}
