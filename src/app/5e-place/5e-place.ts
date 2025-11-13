import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AutocompleteSearch } from '../shared/autocomplete-search/autocomplete-search';
import { Statblock } from '../statblock/statblock';

@Component({
  selector: 'app-5e-place',
  standalone: true,
  imports: [AutocompleteSearch, Statblock],
  templateUrl: './5e-place.html',
  styleUrls: ['./5e-place.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FivePlaceComponent {}
