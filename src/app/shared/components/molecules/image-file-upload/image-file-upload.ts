import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'image-file-upload',
  standalone: true,
  imports: [FileUpload, ToastModule, CommonModule],
  providers: [MessageService],
  template: `
    <div class=" mx-auto w-500 max-w-150">
      <p-fileUpload
        name="demo[]"
        url="https://www.primefaces.org/cdn/api/upload.php"
        (onUpload)="onUpload($event)"
        [multiple]="true"
        accept="image/*"
        [maxFileSize]="1000000"
        mode="advanced"
        chooseLabel="Seleccionar archivos"
        uploadLabel="Subir"
        cancelLabel="Cancelar"
      >
        <ng-template #empty>
          <div class="text-center">Arrastra y suelta tus imágenes aquí</div>
        </ng-template>
      </p-fileUpload>
    </div>
  `,
})
export class ImageFileUpload {
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) { }

  onUpload(event: FileUploadEvent) {
    // <- NO uses UploadEvent / Event / HttpSentEvent
    for (const file of event.files ?? []) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
