import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

export interface TableColumn {
  field: string;
  header: string;
  type?: 'text' | 'date' | 'number' | 'boolean' | 'actions';
  sortable?: boolean;
  width?: string;
}

export interface TableAction {
  icon: string;
  tooltip: string;
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger';
  action: (item: any) => void;
  visible?: (item: any) => boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  template: `
    <p-table
      [value]="data()"
      [columns]="columns()"
      [loading]="loading()"
      [paginator]="paginator()"
      [rows]="rows()"
      [totalRecords]="totalRecords()"
      [lazy]="lazy()"
      [sortMode]="sortMode()"
      [globalFilterFields]="globalFilterFields()"
      (onLazyLoad)="onLazyLoad($event)"
      (onSort)="onSort($event)"
      [class]="customClass()"
    >
      <ng-template pTemplate="header">
        <tr>
          @for (column of columns(); track column.field) {
            <th 
              [pSortableColumn]="column.sortable ? column.field : undefined"
              [style.width]="column.width"
            >
              {{ column.header }}
              @if (column.sortable) {
                <p-sortIcon [field]="column.field" />
              }
            </th>
          }
        </tr>
      </ng-template>
      
      <ng-template pTemplate="body" let-item>
        <tr>
          @for (column of columns(); track column.field) {
            <td>
              @switch (column.type) {
                @case ('actions') {
                  <div class="flex gap-2">
                    @for (action of actions(); track action.tooltip) {
                      @if (!action.visible || action.visible(item)) {
                        <button
                          type="button"
                          [title]="action.tooltip"
                          (click)="action.action(item)"
                          class="action-btn"
                        >
                          <i [class]="action.icon"></i>
                        </button>
                      }
                    }
                  </div>
                }
                @case ('boolean') {
                  <i 
                    [class]="item[column.field] ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"
                  ></i>
                }
                @case ('date') {
                  {{ item[column.field] | date }}
                }
                @default {
                  {{ item[column.field] }}
                }
              }
            </td>
          }
        </tr>
      </ng-template>
      
      @if (loading()) {
        <ng-template pTemplate="emptymessage">
          <tr>
            <td [attr.colspan]="columns().length">
              <div class="text-center p-4">
                <i class="pi pi-spin pi-spinner text-2xl"></i>
                <p class="mt-2">Loading...</p>
              </div>
            </td>
          </tr>
        </ng-template>
      } @else {
        <ng-template pTemplate="emptymessage">
          <tr>
            <td [attr.colspan]="columns().length">
              <div class="text-center p-4">
                <i class="pi pi-inbox text-4xl text-gray-400"></i>
                <p class="mt-2 text-gray-600">{{ emptyMessage() }}</p>
              </div>
            </td>
          </tr>
        </ng-template>
      }
    </p-table>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    
    .action-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .action-btn:hover {
      background-color: #f1f5f9;
      border-color: #cbd5e1;
    }
    
    .action-btn i {
      font-size: 14px;
      color: #64748b;
    }
  `]
})
export class DataTableComponent {
  // Inputs
  readonly data = input<any[]>([]);
  readonly columns = input<TableColumn[]>([]);
  readonly actions = input<TableAction[]>([]);
  readonly loading = input<boolean>(false);
  readonly paginator = input<boolean>(true);
  readonly rows = input<number>(10);
  readonly totalRecords = input<number>(0);
  readonly lazy = input<boolean>(false);
  readonly sortMode = input<'single' | 'multiple'>('single');
  readonly globalFilterFields = input<string[]>([]);
  readonly emptyMessage = input<string>('No data found');
  readonly customClass = input<string>('');

  // Outputs
  readonly lazyLoad = output<any>();
  readonly sort = output<any>();

  constructor() {
    // Constructor vacío por ahora
  }

  onLazyLoad(event: any): void {
    this.lazyLoad.emit(event);
  }

  onSort(event: any): void {
    this.sort.emit(event);
  }
}
