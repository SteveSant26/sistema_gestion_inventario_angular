import { Injectable, inject, signal, computed } from '@angular/core';
import { StorageKeys } from '@shared/config';
import { Data } from './data';

@Injectable({
    providedIn: 'root'
})
export class BaseStorageService<T> {
    private readonly dataSignal = signal<T[]>(this.loadFromStorage());
    private readonly dataService = inject(Data);

    private readonly isEditing = signal(false);
    private readonly itemToEdit = signal<T | null>(null);

    readonly count = computed(() => this.dataSignal().length);

    constructor(protected storageKey: StorageKeys) {
        this.setAll(this.loadFromStorage())
    }



    private loadFromStorage(): T[] {
        const raw = localStorage.getItem(this.storageKey);
        return raw ? JSON.parse(raw) : [];
    }

    protected saveToStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.dataSignal()));
    }

    getDataSignal() {
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
        const oldData = this.dataSignal();
        const index = oldData.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            const newData = [...oldData];
            newData.splice(index, 1);
            this.dataSignal.set(newData);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    findById(id: string): T | undefined {
        return this.dataSignal().find((item: any) => item.id === id);
    }

    findIndex(id: string): number {
        return this.dataSignal().findIndex((item: any) => item.id === id);
    }

    updateById(id: string, updated: T): boolean {
        const index = this.findIndex(id);
        if (index !== -1) {
            const newData = [...this.dataSignal()];
            newData[index] = { ...updated };
            this.dataSignal.set(newData);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    existsById(id: number): boolean {
        return this.dataSignal().some((item: any) => item.id === id);
    }

    getCount(): number {
        return this.count();
    }

    clear(): void {
        this.dataSignal.set([]);
        this.saveToStorage();
    }

    startEdit(item: T) {
        this.itemToEdit.set(item);
        this.isEditing.set(true);
    }

    cancelEdit() {
        this.itemToEdit.set(null);
        this.isEditing.set(false);
    }

    isEditingNow(): boolean {
        return this.isEditing();
    }

    getItemToEdit(): T | null {
        return this.itemToEdit();
    }

    loadJson(path: string): void {
        this.dataService.getLocalJson(path).subscribe((json) => {
            this.setAll(json as T[]);
            this.saveToStorage()
        });
    }
}
