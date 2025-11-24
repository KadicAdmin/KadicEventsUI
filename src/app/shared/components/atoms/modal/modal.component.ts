import { Component, input, output, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

export interface ModalConfig {
    title: string;
    subtitle?: string;
    icon?: string;
    iconBgColor?: string;
    iconColor?: string;
    width?: string;
    maxHeight?: string;
    draggable?: boolean;
    resizable?: boolean;
    closable?: boolean;
    modal?: boolean;
    styleClass?: string;
}

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
    ],
    template: `
    <p-dialog 
      [visible]="visible()" 
      (visibleChange)="onVisibleChange.emit($event)"
      [modal]="config().modal ?? true"
      [draggable]="config().draggable ?? false"
      [resizable]="config().resizable ?? false"
      [closable]="config().closable ?? true"
      [style]="getDialogStyle()"
      [styleClass]="config().styleClass ?? 'rounded-2xl'">
      
      <!-- Header Template -->
      <ng-template pTemplate="header">
        <div class="flex items-center gap-3">
          @if (config().icon) {
          <div class="w-10 h-10 rounded-xl flex items-center justify-center"
               [class]="getIconBgClass()">
            <i [class]="getIconClass()"></i>
          </div>
          }
          <div>
            <h3 class="text-xl font-semibold text-gray-900">
              {{ config().title }}
            </h3>
            @if (config().subtitle) {
            <p class="text-sm text-gray-500">{{ config().subtitle }}</p>
            }
          </div>
        </div>
      </ng-template>

      <!-- Content Template -->
      <ng-content></ng-content>

      <!-- Footer Template -->
      @if (showFooter()) {
      <ng-template pTemplate="footer">
        <div class="flex justify-end gap-2">
          @if (showCancelButton()) {
          <p-button 
            [label]="cancelLabel()" 
            (onClick)="onCancel.emit()" 
            [outlined]="true" 
            severity="secondary" />
          }
          @if (showSaveButton()) {
          <p-button 
            [label]="saveLabel()" 
            (onClick)="onSave.emit()" 
            [loading]="saveLoading()"
            [disabled]="saveDisabled()" />
          }
        </div>
      </ng-template>
      }
    </p-dialog>
  `,
})
export class ModalComponent {
    // Inputs
    readonly visible = input.required<boolean>();
    readonly config = input.required<ModalConfig>();
    readonly showFooter = input<boolean>(true);
    readonly showCancelButton = input<boolean>(true);
    readonly showSaveButton = input<boolean>(true);
    readonly cancelLabel = input<string>('Cancelar');
    readonly saveLabel = input<string>('Guardar');
    readonly saveLoading = input<boolean>(false);
    readonly saveDisabled = input<boolean>(false);

    // Outputs
    readonly onVisibleChange = output<boolean>();
    readonly onCancel = output<void>();
    readonly onSave = output<void>();

    getDialogStyle(): any {
        const config = this.config();
        return {
            width: config.width || '500px',
            maxHeight: config.maxHeight || '90vh'
        };
    }

    getIconBgClass(): string {
        const config = this.config();
        return config.iconBgColor || 'bg-blue-50';
    }

    getIconClass(): string {
        const config = this.config();
        const baseIcon = config.icon || 'pi pi-info-circle';
        const iconColor = config.iconColor || 'text-blue-600';
        return `${baseIcon} text-xl ${iconColor}`;
    }
}
