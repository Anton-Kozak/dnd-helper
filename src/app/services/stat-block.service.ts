import { Injectable, signal } from '@angular/core';
import { IStatBlock } from 'src/model/interfaces/statblock.interface';

@Injectable({ providedIn: 'root' })
export class StatblockService {
  private selectedStatblock = signal<IStatBlock>({} as IStatBlock);

  setSelectedStatBlock(statBlock: IStatBlock): void {
    this.selectedStatblock.set(statBlock);
  }

  getSelectedStatblock(): IStatBlock {
    return this.selectedStatblock();
  }
}
