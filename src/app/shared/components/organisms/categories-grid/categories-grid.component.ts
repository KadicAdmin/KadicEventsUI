import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Category } from '@shared/components/atoms/oval-icon/oval-icon.component';
import { CategoryChipComponent } from "@shared/components/molecules/category-chip/category-chip.component";

@Component({
  selector: 'app-categories-grid',
  imports: [CategoryChipComponent],
  templateUrl: './categories-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesGridComponent {
  categories = input.required<Category[]>();
  select = output<Category>();
}
