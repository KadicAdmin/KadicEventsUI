import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tag-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (tag of tags(); track tag) {
        <span 
          [class]="clickable() ? 'cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-colors' : ''"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
          (click)="onTagClick(tag)">
          {{ tag }}
        </span>
      }
      
      @if (tags().length === 0) {
        <span class="text-sm text-gray-500">
          Sin etiquetas disponibles
        </span>
      }
    </div>
  `
})
export class TagListComponent {
  readonly tags = input<string[]>([]);
  readonly clickable = input<boolean>(false);

  readonly tagClicked = output<string>();

  onTagClick(tag: string): void {
    this.tagClicked.emit(tag);
  }
}