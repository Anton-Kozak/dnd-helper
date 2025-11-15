import { Injectable, signal } from '@angular/core';
import { IStatBlock } from 'src/model/interfaces/statblock.interface';

@Injectable({ providedIn: 'root' })
export class CombatantCacheService {
  private cachedStatblocks = signal<IStatBlock[]>([]);
  public readonly cachedStatblocks$ = this.cachedStatblocks.asReadonly();

  addToCachedStatblocks(statblock: IStatBlock): void {
    if (!this.cachedStatblocks$().some((cs) => cs.name === statblock.name)) {
      this.cachedStatblocks.update((cs) => [...cs, statblock]);
    }
  }
}
