import { Component, input } from '@angular/core';
import { CategoriesGridComponent } from "../categories-grid/categories-grid.component";
import { Category } from '@shared/components/atoms/oval-icon/oval-icon.component';

@Component({
  selector: 'app-category-card',
  imports: [CategoriesGridComponent],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  categories = input<Category[]>([
    { icon: 'pi pi-music', label: 'Música' },
    { icon: 'pi pi-moon', label: 'Vida nocturna' },
    { icon: 'pi pi-palette', label: 'Artes escénicas y visuales' },
    { icon: 'pi pi-sun', label: 'Vacaciones' },
    { icon: 'pi pi-comments', label: 'Citas' },
    { icon: 'pi pi-desktop', label: 'Aficiones' },
    { icon: 'pi pi-chart-bar', label: 'Negocios' },
    { icon: 'pi pi-apple', label: 'Gastronomía' },
  ]);
}
