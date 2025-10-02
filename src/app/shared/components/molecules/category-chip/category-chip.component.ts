import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  Category,
  OvalIconComponent,
} from '@shared/components/atoms/oval-icon/oval-icon.component';
import { TextLabelComponent } from '@shared/components/atoms/text-label/text-label.component';

@Component({
  selector: 'app-category-chip',
  imports: [OvalIconComponent, TextLabelComponent],
  templateUrl: './category-chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryChipComponent {
  category = input.required<Category>();
  select = output<Category>();

  onClick() {
    this.select.emit(this.category());
  }
}
