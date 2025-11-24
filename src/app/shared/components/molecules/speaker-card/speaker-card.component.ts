import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-speaker-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, AvatarModule],
  template: `
    <div class="group text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
      <div class="relative inline-block mb-3">
        @if (imageUrl()) {
        <img [src]="imageUrl()" [alt]="fullName()" 
          class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" />
        } @else {
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          <i class="pi pi-user text-3xl text-purple-600"></i>
        </div>
        }
        <div class="absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <p-button icon="pi pi-pencil" [rounded]="true" severity="secondary" size="small"
            (onClick)="onEdit.emit()" styleClass="w-7 h-7" />
        </div>
      </div>
      <h3 class="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
        {{ fullName() }}
      </h3>
      <p class="text-xs text-gray-500 line-clamp-1">{{ email() }}</p>
      <div class="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <p-button icon="pi pi-trash" [text]="true" [rounded]="true" severity="danger" size="small"
          (onClick)="onDelete.emit()" />
      </div>
    </div>
  `,
})
export class SpeakerCardComponent {
  readonly firstName = input<string>('');
  readonly lastName = input<string>('');
  readonly email = input<string>('');
  readonly imageUrl = input<string>();
  readonly onEdit = output<void>();
  readonly onDelete = output<void>();

  fullName() {
    const firstName = this.firstName() || '';
    const lastName = this.lastName() || '';
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || 'Sin nombre';
  }
}

