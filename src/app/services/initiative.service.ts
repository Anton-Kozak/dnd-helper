import { Injectable, signal } from '@angular/core';
import { Combatant } from 'src/model/interfaces/combatant.interface';

@Injectable({ providedIn: 'root' })
export class InitiativeService {
  private combatantsSignal = signal<Combatant[]>([]);

  public readonly activeCombatants$ = this.combatantsSignal.asReadonly();

  setActiveCombatants(combatants: Combatant[]): void {
    this.combatantsSignal.set(combatants);
  }

  updateSelectedStatuses(id: string, isSelectedByTurn = false): void {
    this.combatantsSignal.update((currentCombatants) => {
      return currentCombatants.map((c) =>
        c.id === id
          ? {
              ...c,
              isStatblockSelected: true,
              isActiveTurn: isSelectedByTurn ? true : c.isActiveTurn,
            }
          : { ...c, isStatblockSelected: false, isActiveTurn: false },
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

  updateCombatantsInBulk<K extends keyof Combatant>(
    key: K,
    value: Combatant[K],
  ): void {
    this.combatantsSignal.update((currentCombatants) => {
      return currentCombatants.map((c) => ({ ...c, [key]: value }));
    });
  }

  updateCombatantsInitiative(): void {
    // add sorting
    this.combatantsSignal.update((cc) => {
      return cc
        .map((c) => {
          const roll = Math.floor(Math.random() * 20) + 1;
          const initiative = roll + c.initBonus;

          return {
            ...c,
            initiative,
          };
        })
        .sort((a, b) => b.initiative - a.initiative);
    });
  }

  addNewCombatant(combatant: Combatant): void {
    let combatantToAdd = combatant;
    const existingCombatants = this.combatantsSignal().filter(
      (c) => c.name === combatant.name,
    );
    if (existingCombatants.length) {
      combatantToAdd = {
        ...combatant,
        displayName: `${combatant.displayName}_${existingCombatants.length}`,
      };
    }

    this.combatantsSignal.update((currentCombatants) => [
      ...currentCombatants,
      combatantToAdd,
    ]);
  }

  removeCombatant(combatantId: string): void {
    const currentCombatants = this.activeCombatants$();
    currentCombatants.filter((c) => c.id !== combatantId);
  }
}
