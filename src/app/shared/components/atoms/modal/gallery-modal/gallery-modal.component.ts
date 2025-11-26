import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { GalleryTemplate } from '@shared/components/template/gallery-template/gallery-template';

@Component({
  selector: 'gallery-modal',
  imports: [ButtonModule, Dialog, GalleryTemplate],
  template: `
    <div class="card flex justify-center">
      <p-button
        (click)="showDialog()"
        label="Seleccionar imagen desde galeria"
      />
      <p-dialog
        header="Header"
        [modal]="true"
        [(visible)]="visible"
        [style]="{ width: '50rem' }"
        [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <app-gallery-template />
      </p-dialog>
    </div>
  `,
})
export class GalleryModal {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
