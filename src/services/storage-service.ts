export class StorageService {
    static setItem(key: string, value: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error("Error setting item in local storage: ", error);
        }
    }
    static getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return null;
    }
}