import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import * as MonsterInfo from '../../resources/bestiary/bestiary-mm.json';

@Component({
  selector: 'app-5e-place',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './5e-place.html',
  styleUrls: ['./5e-place.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FivePlaceComponent implements AfterViewInit {
  monsterData = '';
  monsterFormGroup: FormGroup = new FormGroup({
    monsterName: new FormControl(''),
  });

  ngAfterViewInit(): void {
    this.monsterFormGroup
      .get('monsterName')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchValue: string) => {
        console.log('value', searchValue);
        this.searchForMonsterInfo(searchValue);
      });
  }

  searchForMonsterInfo(subStr: string): void {
    MonsterInfo.monster.map((monster) => {
      if (monster.name.toLowerCase().includes(subStr)) {
        this.monsterData =
          (monster.reprintedAs && monster.reprintedAs[0]) || 'N/A';
        return;
      }
    });
  }
}
