import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-label',
  imports: [],
  templateUrl: './text-label.component.html',
})
export class TextLabelComponent {
  text = input<string>('');
}
