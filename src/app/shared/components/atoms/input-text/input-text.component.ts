import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, FormsModule],
  template: `
    <p-floatlabel>
      <input 
        pInputText 
        [id]="id()" 
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [ngModel]="value()"
        (ngModelChange)="onValueChange($event)"
        [class]="customClass()"
      />
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
export class InputTextComponent {
  // Inputs
  readonly id = input<string>('');
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly type = input<string>('text');
  readonly value = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly customClass = input<string>('w-full');

  // Outputs
  readonly valueChange = output<string>();

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
