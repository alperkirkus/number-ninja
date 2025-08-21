import { NumberNinjaGame } from './game.js';
import { StorageManager } from './storage.js';
import { UIManager } from './ui.js';

//Initialize modules

document.addEventListener("DOMContentLoaded", () => {
    const game = new NumberNinjaGame();
    const storage = new StorageManager();
    const ui = new UIManager(game, storage);
    ui.init();
})
