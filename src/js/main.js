import { StorageManager } from './storage';

//Test
const storage = new StorageManager();
console.log('Available: ', storage.isAvailable);
console.log('Raw data: ', localStorage.getItem('numberNinja'));
