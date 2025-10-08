# Modal Component

Un componente modal reutilizable y configurable para toda la aplicación.

## Características

- ✅ **Reutilizable**: Un solo componente para todos los modales
- ✅ **Configurable**: Personalizable mediante configuración
- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Accesible**: Cumple con estándares de accesibilidad
- ✅ **TypeScript**: Completamente tipado
- ✅ **PrimeNG**: Integrado con la librería de componentes

## Uso Básico

```typescript
import { ModalComponent, ModalConfig } from '@shared/components/atoms/modal/modal.component';

@Component({
  template: `
    <app-modal 
      [visible]="showModal()" 
      [config]="modalConfig()"
      (onVisibleChange)="onModalChange($event)"
      (onCancel)="onCancel()"
      (onSave)="onSave()">
      
      <!-- Contenido del modal -->
      <div class="space-y-4">
        <input pInputText placeholder="Nombre" />
        <textarea pInputTextarea placeholder="Descripción"></textarea>
      </div>
    </app-modal>
  `
})
export class MyComponent {
  showModal = signal(false);
  
  modalConfig = signal<ModalConfig>({
    title: 'Mi Modal',
    subtitle: 'Descripción del modal',
    icon: 'pi pi-plus',
    iconBgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    width: '500px'
  });

  onModalChange(visible: boolean) {
    this.showModal.set(visible);
  }

  onCancel() {
    this.showModal.set(false);
  }

  onSave() {
    // Lógica de guardado
    this.showModal.set(false);
  }
}
```

## Configuración del Modal

```typescript
interface ModalConfig {
  title: string;           // Título del modal
  subtitle?: string;       // Subtítulo opcional
  icon?: string;          // Icono (clase CSS)
  iconBgColor?: string;   // Color de fondo del icono
  iconColor?: string;     // Color del icono
  width?: string;         // Ancho del modal
  maxHeight?: string;     // Altura máxima
  draggable?: boolean;    // Si es arrastrable
  resizable?: boolean;    // Si es redimensionable
  closable?: boolean;     // Si se puede cerrar con X
  modal?: boolean;        // Si es modal (bloquea fondo)
  styleClass?: string;    // Clases CSS adicionales
}
```

## Ejemplos de Configuración

### Modal Simple
```typescript
const simpleConfig: ModalConfig = {
  title: 'Confirmar Acción',
  subtitle: '¿Estás seguro de continuar?',
  icon: 'pi pi-exclamation-triangle',
  iconBgColor: 'bg-yellow-50',
  iconColor: 'text-yellow-600',
  width: '400px'
};
```

### Modal de Formulario
```typescript
const formConfig: ModalConfig = {
  title: 'Nuevo Usuario',
  subtitle: 'Completa la información del usuario',
  icon: 'pi pi-user-plus',
  iconBgColor: 'bg-green-50',
  iconColor: 'text-green-600',
  width: '600px',
  maxHeight: '80vh'
};
```

### Modal de Edición
```typescript
const editConfig: ModalConfig = {
  title: 'Editar Evento',
  subtitle: 'Modifica la información del evento',
  icon: 'pi pi-pencil',
  iconBgColor: 'bg-blue-50',
  iconColor: 'text-blue-600',
  width: '800px',
  maxHeight: '90vh'
};
```

## Uso con ModalService

```typescript
import { ModalService } from '@shared/services/modal.service';

@Component({...})
export class MyComponent {
  private modalService = inject(ModalService);

  openModal() {
    this.modalService.openModal('my-modal', {
      title: 'Mi Modal',
      subtitle: 'Descripción',
      icon: 'pi pi-info',
      iconBgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      width: '500px'
    });
  }

  closeModal() {
    this.modalService.closeModal('my-modal');
  }
}
```

## Ventajas

1. **Consistencia**: Todos los modales tienen el mismo comportamiento
2. **Mantenibilidad**: Un solo lugar para cambios globales
3. **Reutilización**: No duplicar código de modal
4. **Configurabilidad**: Fácil personalización por caso de uso
5. **Testing**: Más fácil de testear un componente centralizado

## Migración de Diálogos Existentes

Para migrar un diálogo existente:

1. Reemplazar `p-dialog` con `app-modal`
2. Mover la configuración a `ModalConfig`
3. Simplificar el template
4. Mantener la misma funcionalidad

### Antes
```html
<p-dialog [visible]="visible" [modal]="true" [style]="{width: '500px'}">
  <ng-template pTemplate="header">
    <h3>Mi Título</h3>
  </ng-template>
  <!-- contenido -->
  <ng-template pTemplate="footer">
    <p-button label="Cancelar" (onClick)="cancel()" />
    <p-button label="Guardar" (onClick)="save()" />
  </ng-template>
</p-dialog>
```

### Después
```html
<app-modal 
  [visible]="visible" 
  [config]="modalConfig"
  (onCancel)="cancel()"
  (onSave)="save()">
  <!-- contenido -->
</app-modal>
```
