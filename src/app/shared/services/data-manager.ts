import { Injectable, Signal, signal, computed, inject } from '@angular/core';
import { StorageKeys } from '@shared/config';
import { Data } from './data';

@Injectable({
    providedIn: 'root'
})
export class BaseStorageService<T> {
    private readonly dataSignal = signal<T[]>([]);
    private readonly isEditing = signal(false);
    private readonly itemToEdit = signal<T | null>(null);

    readonly count = computed(() => this.dataSignal().length);

    protected dataService = inject(Data);

    constructor(
        protected storageKey: StorageKeys,
    ) {
        const storedData = this.loadFromStorage();
        this.dataSignal.set(storedData);
    }

    // Storage
    loadFromStorage(): T[] {
        const raw = localStorage.getItem(this.storageKey);
        return raw ? JSON.parse(raw) : [];
    }

    saveToStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.dataSignal()));
    }

    // CRUD básico
    getDataSignal(): Signal<T[]> {
        return this.dataSignal.asReadonly();
    }

    getAll(): T[] {
        return this.getDataSignal()();
    }

    setAll(items: T[]): void {
        this.dataSignal.set([...items]);
        this.saveToStorage();
    }

    add(item: T): void {
        this.dataSignal.update(data => [item, ...data]);
        this.saveToStorage();
    }

    deleteById(id: string): boolean {
        const index = this.dataSignal().findIndex((item: any) => item.id === id);
        if (index !== -1) {
            const newData = [...this.dataSignal()];
            newData.splice(index, 1);
            this.dataSignal.set(newData);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    updateById(id: string, updated: T): boolean {
        const index = this.dataSignal().findIndex((item: any) => item.id === id);
        if (index !== -1) {
            const newData = [...this.dataSignal()];
            newData[index] = { ...updated };
            this.dataSignal.set(newData);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    findById(id: string): T | undefined {
        return this.dataSignal().find((item: any) => item.id === id);
    }

    existsById(id: string): boolean {
        return this.dataSignal().some((item: any) => item.id === id);
    }

    clear(): void {
        this.dataSignal.set([]);
        this.saveToStorage();
    }

    // Edición
    startEdit(item: T): void {
        this.itemToEdit.set(item);
        this.isEditing.set(true);
    }

    cancelEdit(): void {
        this.itemToEdit.set(null);
        this.isEditing.set(false);
    }

    isEditingNow(): boolean {
        return this.isEditing();
    }

    getItemToEdit(): T | null {
        return this.itemToEdit();
    }

    // Carga desde archivo
    loadJson(path: string): void {
        this.dataService.getLocalJson(path).subscribe((json) => {
            this.setAll(json as T[]);
        });
    }
}
