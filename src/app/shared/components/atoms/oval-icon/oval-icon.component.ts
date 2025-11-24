import { Component, input } from '@angular/core';

export interface Category {
  icon?: string; 
  label?: string; 
}

@Component({
  selector: 'app-oval-icon',
  imports: [],
  templateUrl: './oval-icon.component.html',
})
export class OvalIconComponent {
  icon = input<string>();
}
