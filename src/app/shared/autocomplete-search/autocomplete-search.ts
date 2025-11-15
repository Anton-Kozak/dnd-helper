import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import * as MonsterInfo from '../../../resources/bestiary/bestiary-mm.json';
import { StatblockService } from 'src/app/services/stat-block.service';
import { statblockMapper } from 'src/util/statBlockMapper.util';

@Component({
  selector: 'app-autocomplete-search',
  imports: [MatAutocompleteModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './autocomplete-search.html',
  styleUrl: './autocomplete-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSearch implements OnInit {
  searchResults = signal<any[]>([]);
  myControl: FormControl = new FormControl('');

  private statblockService = inject(StatblockService);

  ngOnInit(): void {
    this.myControl.valueChanges
      ?.pipe(
        filter((v) => !!v),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.searchForMonsterInfo(value);
      });
  }

  selectStatblock(statBlock: any): void {
    const mappedStatblock = statblockMapper(statBlock);
    this.statblockService.setSelectedStatBlock(mappedStatblock);
  }

  searchForMonsterInfo(subStr: string): void {
    this.searchResults.set(
      MonsterInfo.monster.filter((monster) => {
        return monster.name.toLowerCase().includes(subStr);
      }),
    );
  }
}
