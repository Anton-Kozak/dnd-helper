import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { KeyValuePipe } from '@angular/common';
import { mapStatblockToCombatant } from 'src/util/statBlockMapper.util';
import { CombatantCacheService } from 'src/app/services/combatant-cache.service';
import { InitiativeService } from 'src/app/services/initiative.service';
import { StatblockService } from 'src/app/services/stat-block.service';
import { ModificatorBonusPipe } from 'src/app/shared/pipes/modificator-bonus-pipe/modificator-bonus-pipe';

@Component({
  selector: 'app-statblock',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    KeyValuePipe,
    ModificatorBonusPipe,
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
