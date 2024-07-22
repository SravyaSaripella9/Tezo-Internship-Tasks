export class StorageService {
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error("Error setting item in local storage: ", error);
        }
    }
    static getItem(key) {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return null;
    }
}
