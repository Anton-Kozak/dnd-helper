import {
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  input,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface ModalButton {
  type: 'close' | 'submit';
  text: string;
  callback?: () => void;
}

export interface ModalConfig {
  title: string;
  closeButton: ModalButton;
  submitButton: ModalButton;
  optionalData?: { [key: string]: string };
}

export const ModalConfigToken = new InjectionToken<ModalConfig>(
  'Modal config token',
);

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  isSubmitDisabled = input(false);
  title = input('');

  readonly dialogRef = inject(MatDialogRef<ModalComponent>);

  close() {
    this.dialogRef.close();
  }
}
