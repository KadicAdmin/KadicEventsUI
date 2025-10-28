import { Component, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { ModalComponent, ModalConfig } from './modal.component';

@Component({
    selector: 'app-modal-wrapper',
    standalone: true,
    imports: [
        CommonModule,
        ModalComponent,
    ],
    template: `
    @for (modal of activeModals(); track modal.id) {
    <app-modal 
      [visible]="modal.visible" 
      [config]="modal.config"
      (onVisibleChange)="handleModalVisibleChange(modal.id, $event)"
      (onCancel)="handleModalCancel(modal.id)"
      (onSave)="handleModalSave(modal.id)">
      
      <!-- Contenido dinámico basado en el tipo de modal -->
      @switch (modal.config.title) {
        @case ('Nueva Fecha del Evento') {
          <ng-content select="[slot=event-date]"></ng-content>
        }
        @case ('Nuevo Speaker') {
          <ng-content select="[slot=speaker]"></ng-content>
        }
        @case ('Nueva Charla') {
          <ng-content select="[slot=talk]"></ng-content>
        }
        @case ('Nueva Ubicación') {
          <ng-content select="[slot=location]"></ng-content>
        }
        @default {
          <ng-content></ng-content>
        }
      }
    </app-modal>
    }
  `,
})
export class ModalWrapperComponent {
    private modalService = inject(ModalService);

    readonly onModalVisibleChange = output<{ id: string; visible: boolean }>();
    readonly onModalCancel = output<string>();
    readonly onModalSave = output<string>();

    // Computed para obtener modales activos
    activeModals = computed(() => this.modalService.activeModals());

    handleModalVisibleChange(id: string, visible: boolean): void {
        if (!visible) {
            this.modalService.closeModal(id);
        }
        this.onModalVisibleChange.emit({ id, visible });
    }

    handleModalCancel(id: string): void {
        this.modalService.closeModal(id);
        this.onModalCancel.emit(id);
    }

    handleModalSave(id: string): void {
        this.onModalSave.emit(id);
    }
}
