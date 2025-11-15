import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { InitiativeService } from '../services/initiative.service';

@Component({
  selector: 'app-initiative',
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './initiative.component.html',
  styleUrl: './initiative.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitiativeComponent {
  private initiativeService = inject(InitiativeService);

  combatants$ = this.initiativeService.activeCombatants$;

  private stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setActive(id: string) {
    this.initiativeService.updateActiveStatus(id);
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

  nextTurn(): void {
    console.log('on next turn pressed');
  }

  rollInitiative(): void {
    this.combatants$().map((c) => {
      console.log('stat block', c);

      console.log('bonus to initiative', c.initBonus);
      console.log('current iniaitive, should be 0', c.initiative);
      const roll = Math.floor(Math.random() * 20) + 1;
      console.log('roll', roll);
      console.log('new iniative with modifier', roll + c.initBonus);
      console.log('____________________________________________');
    });
  }
}
