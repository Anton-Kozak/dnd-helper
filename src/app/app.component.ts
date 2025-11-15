import { Component } from '@angular/core';
import { FivePlaceComponent } from './5e-place/5e-place';

@Component({
  selector: 'app-root',
  imports: [FivePlaceComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dnd-helper';
}
