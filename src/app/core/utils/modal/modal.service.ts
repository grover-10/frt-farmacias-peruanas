import { Injectable, signal } from '@angular/core';
import { ModalConfig, ModalType } from '../../models/modal.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  modal = signal<ModalConfig | null>(null);

  showModal(title: string, message: string, type: ModalType) {
    this.modal.set({
      open: true,
      type,
      title,
      message
    });
  }

  close() {
    this.modal.set(null);
  }
}
