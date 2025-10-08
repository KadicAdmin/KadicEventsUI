import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent, ModalConfig } from './modal.component';

@Component({
    selector: 'app-modal-example',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ModalComponent,
    ],
    template: `
    <app-modal 
      [visible]="visible()" 
      [config]="modalConfig()"
      [showFooter]="true"
      [cancelLabel]="'Cancelar'"
      [saveLabel]="'Guardar'"
      (onVisibleChange)="onVisibleChange.emit($event)"
      (onCancel)="onCancel.emit()"
      (onSave)="onSave.emit()">
      
      <!-- Contenido del modal -->
      @if (form()) {
      <form [formGroup]="form()!" class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Nombre</label>
          <input pInputText formControlName="name" class="w-full" placeholder="Ingresa el nombre" />
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Descripción</label>
          <textarea pInputTextarea formControlName="description" class="w-full" rows="3" 
            placeholder="Ingresa la descripción"></textarea>
        </div>
      </form>
      }
    </app-modal>
  `,
})
export class ModalExampleComponent {
    readonly visible = input.required<boolean>();
    readonly form = input<FormGroup>();
    readonly isEditing = input<boolean>(false);

    readonly onVisibleChange = output<boolean>();
    readonly onCancel = output<void>();
    readonly onSave = output<void>();

    modalConfig = signal<ModalConfig>({
        title: 'Nuevo Item',
        subtitle: 'Completa la información',
        icon: 'pi pi-plus',
        iconBgColor: 'bg-green-50',
        iconColor: 'text-green-600',
        width: '500px',
        draggable: false,
        resizable: false,
        closable: true,
        modal: true,
        styleClass: 'rounded-2xl'
    });

    // Actualizar configuración cuando cambie el modo de edición
    updateConfig() {
        const isEditing = this.isEditing();
        this.modalConfig.set({
            ...this.modalConfig(),
            title: isEditing ? 'Editar Item' : 'Nuevo Item',
            subtitle: isEditing ? 'Modifica la información' : 'Completa la información',
            icon: isEditing ? 'pi pi-pencil' : 'pi pi-plus',
            iconBgColor: isEditing ? 'bg-blue-50' : 'bg-green-50',
            iconColor: isEditing ? 'text-blue-600' : 'text-green-600',
        });
    }
}
