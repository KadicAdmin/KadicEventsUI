import { Injectable, signal, computed } from '@angular/core';
import { ModalConfig } from '../components/atoms/modal/modal.component';

export interface ModalState {
    id: string;
    visible: boolean;
    config: ModalConfig;
    data?: any;
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modals = signal<Map<string, ModalState>>(new Map());

    // Computed para obtener todos los modales activos
    readonly activeModals = computed(() => {
        const modals = this.modals();
        return Array.from(modals.values()).filter(modal => modal.visible);
    });

    // Abrir modal
    openModal(id: string, config: ModalConfig, data?: any): void {
        this.modals.update(current => {
            const newMap = new Map(current);
            newMap.set(id, {
                id,
                visible: true,
                config,
                data
            });
            return newMap;
        });
    }

    // Cerrar modal
    closeModal(id: string): void {
        this.modals.update(current => {
            const newMap = new Map(current);
            const modal = newMap.get(id);
            if (modal) {
                newMap.set(id, { ...modal, visible: false });
            }
            return newMap;
        });
    }

    // Cerrar todos los modales
    closeAllModals(): void {
        this.modals.update(current => {
            const newMap = new Map();
            current.forEach((modal, id) => {
                newMap.set(id, { ...modal, visible: false });
            });
            return newMap;
        });
    }

    // Obtener estado de un modal
    getModalState(id: string): ModalState | undefined {
        return this.modals().get(id);
    }

    // Verificar si un modal está abierto
    isModalOpen(id: string): boolean {
        return this.getModalState(id)?.visible ?? false;
    }

    // Actualizar configuración de un modal
    updateModalConfig(id: string, config: Partial<ModalConfig>): void {
        this.modals.update(current => {
            const newMap = new Map(current);
            const modal = newMap.get(id);
            if (modal) {
                newMap.set(id, {
                    ...modal,
                    config: { ...modal.config, ...config }
                });
            }
            return newMap;
        });
    }

    // Limpiar modales cerrados
    cleanupClosedModals(): void {
        this.modals.update(current => {
            const newMap = new Map();
            current.forEach((modal, id) => {
                if (modal.visible) {
                    newMap.set(id, modal);
                }
            });
            return newMap;
        });
    }
}
