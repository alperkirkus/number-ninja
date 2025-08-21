export class UIManager {
  constructor(game, storage) {
    this.game = game;
    this.storage = storage;
  }

  init() {
    this.bindEvents();
    this.renderStats(this.storage.loadStats());
  }

  bindEvents() {
    const submitButton = document.querySelector('.submit-guess-button');
    const guessInput = document.querySelector('.guess-input');
    const resetButton = document.querySelector(".button--reset");
    const newGameButton = document.querySelector(".button--new-game");


    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
      radio.addEventListener('change', e => this.handleDifficultyChange(e));
    });

    submitButton.addEventListener('click', () => {
      const result = this.game.makeGuess(guessInput.value);
      this.handleGuessResult(result);
      guessInput.value = ''; // Clear input
    });

    resetButton.addEventListener("click", () => {
        const resetStats = this.storage.resetData();
        this.renderStats(resetStats);
    })



    newGameButton.addEventListener('click', () => {
    this.handleDifficultyChange('easy'); // otomatik easy
    });

  }

  handleDifficultyChange(difficultyOrEvent) {

    const difficulty = difficultyOrEvent.target ? difficultyOrEvent.target.value : difficultyOrEvent;

    console.log('Difficulty changed to:', difficulty);

    //Resetting the UI
    this.resetUI(difficulty);

    // Call game methods, update UI
    this.game.changeDifficulty(difficulty);


  }

  handleGuessResult(result) {
    if (!result.success) {
      // Show error message
      this.displayError(result.error);
    } else {
      // Handle game result (won/lost/continue)
      this.updateGameBoard(result);
    }
  }

  // Error displaying for wrong input
  displayError(errorMessage) {
    let errorElement = document.querySelector('.error-message');

    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';

      const inputGroup = document.querySelector('.input-group');
      inputGroup.insertAdjacentElement('afterend', errorElement);
    }

    errorElement.textContent = errorMessage;
    errorElement.classList.add('error-message--visible');

    setTimeout(() => {
      errorElement.classList.remove('error-message--visible');
    }, 3000);
  }

  updateGameBoard(result) {
    const attemptsCount = document.querySelector('.attempts-count');
    const hintInfo = document.querySelector('.hint-info');
    const gameFeedback = document.querySelector(".game-feedback");

    attemptsCount.textContent = result.remainingAttempts;
    hintInfo.textContent = result.hint;

    let isWin = false;

    if(result.result === 'won'){
        gameFeedback.innerHTML = `Congratulations! You guessed the number! <br>
        Score: ${result.remainingAttempts}`;

        gameFeedback.style.backgroundColor = "#228B22";
        isWin = true;

        const updatedStats = this.storage.updateStatsOnGameEnd(result.remainingAttempts, isWin);
        this.renderStats(updatedStats);


    }
    if(result.result === 'lost'){
        gameFeedback.innerHTML = `Sorry you lost the game. Try again <br>
        The number was: ${this.game.targetNumber} <br>
        Score: ${result.remainingAttempts}`;

        gameFeedback.style.backgroundColor = "#c41d33";

        const updatedStats = this.storage.updateStatsOnGameEnd(result.remainingAttempts, isWin);
        this.renderStats(updatedStats);
    }

    
  }

  renderStats(stats) {
        if (!stats) return;
        document.querySelector('.stats__item:nth-child(1) .stats__value').textContent = stats.lastScore;
        document.querySelector('.stats__item:nth-child(2) .stats__value').textContent = stats.highScore;
        document.querySelector('.stats__item:nth-child(3) .stats__value').textContent = stats.gamesPlayed;
        document.querySelector(".history__attempts").textContent = `Won ${stats.wins} times`;

    }

  //Resetting UI
  resetUI(difficulty) {
     const gameFeedback = document.querySelector(".game-feedback");
 /*  const attemptsCount = document.querySelector(".attempts-count");
  const hintInfo = document.querySelector(".hint-info");
  const difficultyLabel = document.querySelector(".difficulty-label");
  const numberRange = document.querySelector(".number-range"); */

  gameFeedback.innerHTML = `
    <div class="welcome-message">Welcome to Number Ninja</div>
    <div class="difficulty-info">
      Difficulty: <span class="difficulty-label">${difficulty}</span><br />
      Select number between <span class="number-range">(${this.game.numberGenerator.min}-${this.game.numberGenerator.max})</span>
    </div>
    <div class="hint-box"> 
      Hint: <span class="hint-info"></span>
    </div>
    <div class="attempts-info">
      Remaining attempts: <span class="attempts-count">10</span>
    </div>
  `;

  // inline style'ları temizle (arka plan rengi vs.)
  gameFeedback.style.backgroundColor = "";
  }

}
