

import { Injectable, inject, signal } from '@angular/core';
import { StorageKeys } from '@shared/config';
import { Data } from './data';

@Injectable({
    providedIn: 'root'
})
export class BaseStorageService<T> {
    protected data: T[] = [];
    private dataService = inject(Data);

    private isEditing = signal(false);
    private itemToEdit = signal<T | null>(null);

    constructor(protected storageKey: StorageKeys) {
        this.data = this.loadFromStorage();
    }

    protected loadFromStorage(): T[] {
        const raw = localStorage.getItem(this.storageKey);
        return raw ? JSON.parse(raw) : [];
    }

    protected saveToStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    getAll(): T[] {
        return [...this.data];
    }

    setAll(items: T[]): void {
        this.data = [...items];
        this.saveToStorage();
    }

    add(item: T): void {

        this.data.unshift(item);
        this.saveToStorage();
    }

    deleteById(id: string): boolean {
        const index = this.data.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    findById(id: string): T | undefined {
        return this.data.find((item: any) => item.id === id);
    }

    findIndex(id: string): number {
        return this.data.findIndex((item: any) => item.id === id);
    }

    updateById(id: string, updated: T): boolean {
        const index = this.findIndex(id);
        if (index !== -1) {
            this.data[index] = { ...updated };
            this.saveToStorage();
            return true;
        }
        return false;
    }

    existsById(id: number): boolean {
        return this.data.some((item: any) => item.id === id);
    }

    existsByName(name: string): boolean {
        return this.data.some((item: any) => item.name === name);
    }

    getCount(): number {
        return this.data.length;
    }

    clear(): void {
        this.data = [];
        this.saveToStorage();
    }
    startEdit(item: T) {
        this.itemToEdit.set(item);
        this.isEditing.set(true);
        console.log('edit started');
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
        });
    }
}
