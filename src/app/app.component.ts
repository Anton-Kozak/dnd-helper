import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FivePlaceComponent } from './components/5e-place/5e-place';

@Component({
  selector: 'app-root',
  imports: [FivePlaceComponent],
  providers: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dnd-helper';
}
