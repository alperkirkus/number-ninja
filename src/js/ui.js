export class UIManager {
  constructor(game, storage) {
    this.game = game;
    this.storage = storage;
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
      radio.addEventListener('change', e => this.handleDifficultyChange(e));
    });

    document.getElementById('submit-guess').addEventListener('click', () => {
      const input = document.getElementById('guess-input');
      const result = this.game.makeGuess(input.value);
      this.handleGuessResult(result);
      input.value = ''; // Clear input
    });
  }

  handleDifficultyChange(e) {
    console.log('Difficulty changed to:', e.target.value);
    // Call game methods, update UI
    this.game.changeDifficulty(e.target.value);
  }

  handleGuessResult(result) {
    if (!result.success) {
      // Show error message
      this.displayError(result.error);
    } else {
      // Handle game result (won/lost/continue)
      this.updateGameDisplay(result);
    }
  }

  displayError() {}

  updateGameDisplay() {}
}
