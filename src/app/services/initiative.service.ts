import { Injectable, signal } from '@angular/core';
import { Combatant } from 'src/model/interfaces/combatant.interface';

@Injectable({ providedIn: 'root' })
export class InitiativeService {
  private combatantsSignal = signal<Combatant[]>([]);

  public readonly activeCombatants$ = this.combatantsSignal.asReadonly();

  setActiveCombatants(combatants: Combatant[]): void {
    this.combatantsSignal.set(combatants);
  }

  updateActiveStatus(id: string): void {
    this.combatantsSignal.update((currentCombatants) => {
      return currentCombatants.map((c) =>
        c.id === id ? { ...c, isActive: true } : { ...c, isActive: false },
      );
    });
  }

  updateCombatant<K extends keyof Combatant>(
    id: string,
    key: K,
    value: Combatant[K],
  ): void {
    this.combatantsSignal.update((currentCombatants) => {
      return currentCombatants.map((c) =>
        c.id === id ? { ...c, [key]: value } : c,
      );
    });
  }

  addNewCombatant(combatant: Combatant): void {
    this.combatantsSignal.update((currentCombatants) => [
      ...currentCombatants,
      combatant,
    ]);
  }

  removeCombatant(combatantId: string): void {
    const currentCombatants = this.activeCombatants$();
    currentCombatants.filter((c) => c.id !== combatantId);
  }
}
