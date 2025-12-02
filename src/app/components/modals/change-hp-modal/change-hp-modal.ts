import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  ModalComponent,
  ModalConfig,
} from 'src/app/shared/modal/modal.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InitiativeService } from 'src/app/services/initiative.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Combatant } from 'src/model/interfaces/combatant.interface';
import { HpChangeType } from 'src/model/types/statblock.type';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-change-hp-modal',
  imports: [ModalComponent, ReactiveFormsModule, MatButtonModule],
  templateUrl: './change-hp-modal.html',
  styleUrl: './change-hp-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeHpModalComponent implements OnInit {
  private data = inject<ModalConfig>(MAT_DIALOG_DATA);
  private initiativeService = inject(InitiativeService);
  private dialogRef = inject(MatDialogRef);

  private changeType: HpChangeType = 'damage';

  hpFormControl = new FormControl('');

  get title(): string {
    return this.data.title;
  }

  get combatant(): Combatant {
    return this.data.optionalData?.['combatant'];
  }

  ngOnInit(): void {
    this.changeType =
      (this.data.optionalData?.['changeType'] as HpChangeType) || 'damage';
  }

  onSubmit(): void {
    const { id, currentHp, hp } = this.combatant;

    if (this.hpFormControl.value && currentHp) {
      const numericValue = +this.hpFormControl.value;
      const value =
        this.changeType === 'damage' ? numericValue * -1 : numericValue;
      const updatedValue = currentHp + value;
      const finalValue = updatedValue > hp ? hp : updatedValue;
      this.initiativeService.updateCombatant(id, 'currentHp', finalValue);

      this.dialogRef.close();
    }
  }
}
