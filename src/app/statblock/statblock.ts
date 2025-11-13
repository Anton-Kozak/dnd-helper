import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { IStatBlock } from 'src/model/interfaces/statblock.interface';
import { StatblockService } from '../services/stat-block.service';
import { Language } from 'src/model/types/statblock.type';
import { ModificatorBonusPipe } from '../shared/pipes/modificator-bonus-pipe/modificator-bonus-pipe';

@Component({
  selector: 'app-statblock',
  imports: [MatCardModule, MatChipsModule, ModificatorBonusPipe],
  templateUrl: './statblock.html',
  styleUrl: './statblock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Statblock implements OnInit {
  // statblock: IStatBlock = {} as IStatBlock;

  // get statBlockInputValue() {
  //   return this.statblock();
  // }

  // get creatureName(): string {
  //   return this.statBlockInputValue?.name || 'N/A';
  // }

  get actionTags(): string[] | undefined {
    return this.statBlock?.actionTags;
  }

  get statBlock(): IStatBlock {
    return this.statblockService.getSelectedStatblock();
  }

  get resistances(): string[] {
    return this.statBlock?.resistances;
  }

  get skills(): [string, string][] {
    return Object.entries(this.statBlock?.skill);
  }

  get languages(): Language[] {
    return this.statBlock?.languages;
  }

  get senses(): string[] {
    return this.statBlock?.senses;
  }

  private statblockService = inject(StatblockService);

  ngOnInit(): void {
    console.log('selected stat block', this.statBlock);
    // this.statblock = this.statblockService.getSelectedStatblock();
  }
}
