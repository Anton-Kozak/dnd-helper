import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AutocompleteSearch } from 'src/app/shared/autocomplete-search/autocomplete-search';
import { InitiativeComponent } from '../initiative/initiative.component';
import { Statblock } from '../statblock/statblock';

@Component({
  selector: 'app-5e-place',
  standalone: true,
  imports: [AutocompleteSearch, Statblock, InitiativeComponent],
  templateUrl: './5e-place.html',
  styleUrls: ['./5e-place.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FivePlaceComponent {}
