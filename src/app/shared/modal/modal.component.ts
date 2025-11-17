import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ModalButton {
  type: 'close' | 'submit';
  text: string;
  callback?: () => void;
}

export interface ModalConfig {
  title: string;
  closeButton: ModalButton;
  submitButton: ModalButton;
  optionalData?: unknown;
}

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  private data = inject(MAT_DIALOG_DATA);
  isSubmitDisabled = input(false);
  title = input('');


  get configData(): ModalConfig {
    return this.data;
  }

  readonly dialogRef = inject(MatDialogRef<ModalComponent>);


  close() {
    this.dialogRef.close();
  }
}
