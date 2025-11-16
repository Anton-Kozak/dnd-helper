import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { InitiativeService } from '../services/initiative.service';
import { CombatantCacheService } from '../services/combatant-cache.service';
import { IStatBlock } from 'src/model/interfaces/statblock.interface';
import { StatblockService } from '../services/stat-block.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Combatant } from 'src/model/interfaces/combatant.interface';

@Component({
  selector: 'app-initiative',
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './initiative.component.html',
  styleUrl: './initiative.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitiativeComponent {
  private initiativeService = inject(InitiativeService);
  private combatantCacheService = inject(CombatantCacheService);
  private statblockService = inject(StatblockService);

  initiativeControl: FormControl = new FormControl(0);

  currentActiveCombatantId = '';

  isCombatActive = false;

  combatants$ = this.initiativeService.activeCombatants$;
  hasBattleStarted = false;

  editInitiative(newValue: number, currentCombatant: Combatant): void {
    if (
      currentCombatant.initiative !== newValue &&
      newValue !== null &&
      newValue !== undefined &&
      /\d+/.test(`${newValue}`)
    ) {
      this.initiativeService.updateCombatant(
        currentCombatant.id,
        'initiative',
        newValue,
      );
    }
  }

  private stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  private getCachedStatblock(name: string): IStatBlock | undefined {
    return this.combatantCacheService
      .cachedStatblocks$()
      .find((cc) => cc.name === name);
  }

  setSelectedStatblock(id: string, name: string, isSelectedByTurn = false) {
    this.initiativeService.updateSelectedStatuses(id, isSelectedByTurn);
    const cachedStatblock = this.getCachedStatblock(name);
    if (cachedStatblock) {
      this.statblockService.setSelectedStatBlock(cachedStatblock);
    }
  }

  onDamage(id: string, currentHp: number, event: Event): void {
    this.stopPropagation(event);
    this.initiativeService.updateCombatant(id, 'currentHp', currentHp - 5);
  }

  onHeal(id: string, event: Event): void {
    this.stopPropagation(event);
    console.log('on heal pressed');
  }

  onKill(id: string, event: Event): void {
    this.stopPropagation(event);
    console.log('on kill pressed');
  }

  startBattle(): void {
    this.hasBattleStarted = true;
    this.firstTurn();
    this.currentActiveCombatantId = this.combatants$()[0].id;
  }

  previousTurn(): void {
    const idx = this.combatants$().findIndex(
      (c) => c.id === this.currentActiveCombatantId,
    );

    if (idx === 0) {
      this.setActiveCombatant(this.combatants$().length - 1);
    } else {
      this.setActiveCombatant(idx - 1);
    }
  }

  firstTurn(): void {
    const currentActiveCombatant = this.combatants$()[0];

    this.setSelectedStatblock(
      currentActiveCombatant.id,
      currentActiveCombatant.name,
      true,
    );
  }

  nextTurn(): void {
    // get current active combatant and move to the next one
    const idx = this.combatants$().findIndex(
      (c) => c.id === this.currentActiveCombatantId,
    );

    if (this.combatants$().length > idx + 1) {
      this.setActiveCombatant(idx + 1);
    } else if (this.combatants$().length === idx + 1) {
      this.setActiveCombatant(0);
    }
  }

  private setActiveCombatant(idx: number) {
    const newActiveCombatant = this.combatants$()[idx];
    this.currentActiveCombatantId = newActiveCombatant.id;
    this.setSelectedStatblock(
      this.currentActiveCombatantId,
      newActiveCombatant.name,
      true,
    );
  }

  rollInitiative(): void {
    this.initiativeService.updateCombatantsInitiative();
  }
}
