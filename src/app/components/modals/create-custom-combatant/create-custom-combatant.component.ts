import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { InitiativeService } from '../../../services/initiative.service';
import { Combatant } from 'src/model/interfaces/combatant.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-create-custom-combatant',
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './create-custom-combatant.component.html',
  styleUrl: './create-custom-combatant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomCombatantComponent {
  private initiativeService = inject(InitiativeService);
  private dialogRef = inject(MatDialogRef);
  customCombatantGroup: FormGroup = new FormGroup({
    ac: new FormControl(0),
    hp: new FormControl(0),
    name: new FormControl(''),
    initiative: new FormControl(0),
  });

  submitCombatant(): void {
    const newCombatant: Combatant = {
      ...this.customCombatantGroup.value,
      id: crypto.randomUUID(),
      displayName: this.customCombatantGroup.value.name,
      currentHp: this.customCombatantGroup.value.hp,
      initBonus: 0,
      initiative: this.customCombatantGroup.value.initiative,
      type: 'npc',
      isActiveTurn: false,
      isStatblockSelected: false,
      status: 'active',
    };

    this.initiativeService.addNewCombatant(newCombatant);
    this.dialogRef.close();
  }
}
