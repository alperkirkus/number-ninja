export class StorageManager {
  #storageKey = 'numberNinja';
  #defaultData = {
    stats: { gamesPlayed: 0, wins: 0, lastScore: 0, highScore:0 },
    history: [],
    settings: { difficulty: 'medium', theme: 'dark' },
  };
  isAvailable = false;

  constructor() {
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
    } /* else {
      console.log('Existing data found in storage');
    } */
  }

  // Loading the stats of the player
  loadStats() {
    if (!this.isAvailable) return null;

    try {
      const data = JSON.parse(localStorage.getItem(this.#storageKey));

      return data?.stats || null;
    } catch (error) {
      console.log('Load error: ', error);
      return null;
    }
  }

  // Saving the new stats to local storage
  saveStats(newStats) {
    if (!this.isAvailable) return null;

    try {
      const data = JSON.parse(localStorage.getItem(this.#storageKey)); // JSON object

      if (!data) return null;

      data['stats'] = newStats;

      localStorage.setItem(this.#storageKey, JSON.stringify(data));

      return true;
    } catch (error) {
      return null;
    }
  } 


  updateStatsOnGameEnd(resultScore, isWin){
    
    if (!this.isAvailable) return null;

    try {

      const data = JSON.parse(localStorage.getItem(this.#storageKey));
            if (!data || !data.stats) return null;

            const stats = data.stats;

            // Stats update
            stats.gamesPlayed += 1;
            stats.lastScore = resultScore;
            if (resultScore > stats.highScore) stats.highScore = resultScore;
            if (isWin) stats.wins += 1;

            data.stats = stats;
            localStorage.setItem(this.#storageKey, JSON.stringify(data));

            return stats; // Güncellenmiş stats
      
    } catch (error) {
      console.log('Error updating stats: ', error);
            return null;
    }

  }

  resetData() {
    if (!this.isAvailable) return null;
    try {
        localStorage.setItem(this.#storageKey, JSON.stringify(this.#defaultData));
        return this.#defaultData.stats; // Sıfırlanmış stats 
    } catch (error) {
        console.log('Error resetting storage: ', error);
        return null;
    }
}


}
