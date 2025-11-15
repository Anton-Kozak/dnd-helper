import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { StatblockService } from '../services/stat-block.service';
import { ModificatorBonusPipe } from '../shared/pipes/modificator-bonus-pipe/modificator-bonus-pipe';
import { MatDividerModule } from '@angular/material/divider';
import { KeyValuePipe } from '@angular/common';
import { InitiativeService } from '../services/initiative.service';
import { mapStatblockToCombatant } from 'src/util/statBlockMapper.util';
import { CombatantCacheService } from '../services/combatant-cache.service';

@Component({
  selector: 'app-statblock',
  imports: [
    MatCardModule,
    MatChipsModule,
    ModificatorBonusPipe,
    MatDividerModule,
    KeyValuePipe,
  ],
  templateUrl: './statblock.html',
  styleUrl: './statblock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Statblock implements OnInit {
  private statblockService = inject(StatblockService);
  private initiativeService = inject(InitiativeService);
  private combatantCacheService = inject(CombatantCacheService);

  protected statblockSignal = this.statblockService.selectedStatblock$;

  protected dexValueSignal = computed(
    () =>
      this.statblockSignal().stats.find((stat) => stat.name === 'dex')?.value ||
      0,
  );

  get skills(): [string, string][] {
    return Object.entries(this.statblockSignal()?.skill);
  }

  ngOnInit(): void {
    console.log('init stat block');
  }

  addToInit(): void {
    const statblock = this.statblockSignal();
    const combatantFromStatblock = mapStatblockToCombatant(statblock);

    this.initiativeService.addNewCombatant(combatantFromStatblock);
    this.combatantCacheService.addToCachedStatblocks(statblock);
  }
}
