import { Component } from '@angular/core';
import { CategoriesGridComponent } from "../categories-grid/categories-grid.component";

@Component({
  selector: 'app-category-card',
  imports: [CategoriesGridComponent],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  categories = [
    { icon: '🎤', label: 'Música' },
    { icon: '💃', label: 'Vida nocturna' },
    { icon: '🎭', label: 'Artes escénicas y visuales' },
    { icon: '🌞', label: 'Vacaciones' },
    { icon: '💬', label: 'Citas' },
    { icon: '🎮', label: 'Aficiones' },
    { icon: '📊', label: 'Negocios' },
    { icon: '🍕', label: 'Gastronomía' },
  ];
}
