import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  ModalComponent,
  ModalConfigToken,
} from 'src/app/shared/modal/modal.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InitiativeService } from 'src/app/services/initiative.service';

type ChangeType = 'heal' | 'damage';

@Component({
  selector: 'app-change-hp-modal',
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './change-hp-modal.html',
  styleUrl: './change-hp-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeHpModal implements OnInit {
  private data = inject(ModalConfigToken);
  private initiativeService = inject(InitiativeService);

  private changeType: ChangeType = 'damage';

  hpFormControl = new FormControl('');

  get title(): string {
    return this.data.title;
  }

  ngOnInit(): void {
    this.changeType =
      (this.data.optionalData?.['changeType'] as ChangeType) || 'damage';
  }

  onSubmit(): void {
    const currentCombatantId = this.data.optionalData?.['id'];
    if (this.hpFormControl.value && currentCombatantId) {
      const numericValue = +this.hpFormControl.value;
      const value =
        this.changeType === 'damage' ? numericValue * -1 : numericValue;

      this.initiativeService.updateCombatant(
        currentCombatantId,
        'currentHp',
        value,
      );
    }
  }
}
