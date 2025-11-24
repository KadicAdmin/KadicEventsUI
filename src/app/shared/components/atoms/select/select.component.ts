import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [SelectModule, FloatLabelModule, FormsModule],
  template: `
    <p-floatlabel>
      <p-select
        [id]="id()"
        [options]="options()"
        optionLabel="label"
        optionValue="value"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [showClear]="showClear()"
        [filter]="filter()"
        [filterBy]="filterBy()"
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
export class SelectComponent {
  // Inputs
  readonly id = input<string>('');
  readonly label = input<string>('');
  readonly placeholder = input<string>('Select an option');
  readonly value = input<any>(null);
  readonly options = input<SelectOption[]>([]);
  readonly disabled = input<boolean>(false);
  readonly showClear = input<boolean>(true);
  readonly filter = input<boolean>(false);
  readonly filterBy = input<string>('label');
  readonly customClass = input<string>('w-full');

  // Outputs
  readonly valueChange = output<any>();

  onValueChange(value: any): void {
    this.valueChange.emit(value);
  }
}
