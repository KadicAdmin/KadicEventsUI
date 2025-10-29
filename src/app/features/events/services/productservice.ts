import { Injectable } from '@angular/core';
import { Product } from '@shared/components/organisms/event-view-update/event-view-update';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // demo: simula una API. Puedes cambiar a HttpClient luego.
  async getProducts(): Promise<Product[]> {
    return [
      { id: 1, name: 'Bamboo Watch', category: 'Accessories', price: 65, rating: 5, imageUrl: '/assets/demo/bamboo-watch.jpg', inventoryStatus: 'INSTOCK' },
      { id: 2, name: 'Black Watch',  category: 'Accessories', price: 72, rating: 4, imageUrl: '/assets/demo/black-watch.jpg',  inventoryStatus: 'INSTOCK' },
      { id: 3, name: 'Blue Band',    category: 'Fitness',     price: 79, rating: 3, imageUrl: '/assets/demo/blue-band.jpg',    inventoryStatus: 'LOWSTOCK' },
      { id: 4, name: 'Blue T-Shirt', category: 'Clothing',    price: 29, rating: 5, imageUrl: '/assets/demo/blue-tshirt.jpg', inventoryStatus: 'INSTOCK' },
    ];
  }
}
