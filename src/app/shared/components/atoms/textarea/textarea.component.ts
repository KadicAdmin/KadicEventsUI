import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [TextareaModule, FloatLabelModule, FormsModule],
  template: `
    <p-floatlabel>
      <textarea 
        pTextarea 
        [id]="id()" 
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [rows]="rows()"
        [cols]="cols()"
        [autoResize]="autoResize()"
        [ngModel]="value()"
        (ngModelChange)="onValueChange($event)"
        [class]="customClass()"
      ></textarea>
      @if (label()) {
        <label [for]="id()">{{ label() }}</label>
      }
    </p-floatlabel>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class TextareaComponent {
  // Inputs
  readonly id = input<string>('');
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly value = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly rows = input<number>(3);
  readonly cols = input<number>(30);
  readonly autoResize = input<boolean>(true);
  readonly customClass = input<string>('w-full');

  // Outputs
  readonly valueChange = output<string>();

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
