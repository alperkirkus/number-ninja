export class StorageManager {
  #storageKey = 'numberNinja';
  #defaultData = {
    stats: { gamesPlayed: 0, wins: 0 },
    history: [],
    settings: { difficulty: 'medium', theme: 'dark' },
  };
  isAvailable = false;

  constructor() {
    const testKey = 'storageTest';
    let checkResult = false;

    this.isAvailable = this.#checkStorageAvailability();
    this.#initializeStorage();
  }

  #checkStorageAvailability() {
    const testKey = 'storageTest';
    const testValue = 'available';

    try {
      localStorage.setItem(testKey, testValue);
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  #initializeStorage() {
    if (!this.isAvailable) return;

    const existingData = localStorage.getItem(this.#storageKey);

    if (!existingData) {
      localStorage.setItem(this.#storageKey, JSON.stringify(this.#defaultData));
      console.log('Storage initialized with default data');
    } else {
      console.log('Existing data found in storage');
    }
  }
}
