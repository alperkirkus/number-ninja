export class NumberNinjaGame {
  constructor(difficulty = 'easy') {
    this.difficulty = difficulty;
    this.numberGenerator = this.createNumberGenerator(difficulty);
    this.targetNumber = this.numberGenerator.generate();

    this.remainingAttempts = 10;
    this.gameStatus = 'playing'; // playing, won, lost
  }

  createNumberGenerator(difficulty) {
    const ranges = {
      easy: { min: 1, max: 25 },
      medium: { min: 1, max: 50 },
      hard: { min: 1, max: 100 },
    };

    const range = ranges[difficulty];

    return {
      min: range.min,
      max: range.max,
      generate: () =>
        Math.floor(Math.random() * (range.max - range.min + 1)) + range.min,
    };
  }
  changeDifficulty(newDifficulty) {

    this.difficulty = newDifficulty;
    this.numberGenerator = this.createNumberGenerator(newDifficulty);
    this.targetNumber = this.numberGenerator.generate();
    this.remainingAttempts = 10;



   /*  difficultyLabel.textContent = this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
    numberRange.textContent = `(${this.numberGenerator.min}-${this.numberGenerator.max})`;
    attemptsCount.textContent = 10;
    hintInfo.textContent = ''; */


    console.log(this.targetNumber);

    // RESET GAME FUNCTIONALITY IS MISSING
  }

  makeGuess(userInput) {
    const guess = Number(userInput.trim());

    if (!Number.isInteger(guess)) {
      return { success: false, error: 'Please enter a valid number' };
    }

    if (guess < this.numberGenerator.min || guess > this.numberGenerator.max) {
      return {
        success: false,
        error: `Number must be between ${this.numberGenerator.min} and ${this.numberGenerator.max}`,
      };
    } 
    guess === this.targetNumber ? this.remainingAttempts : this.remainingAttempts--;
    

    if (guess === this.targetNumber) {
      this.gameStatus = 'won';
      return { success: true, result: 'won', remainingAttempts: this.remainingAttempts };

    }

    if (this.remainingAttempts <= 0) {
      this.gameStatus = 'lost';
      return { success: true, result: 'lost', targetNumber: this.targetNumber,remainingAttempts: this.remainingAttempts };
    }

    if(guess <= (this.targetNumber -5) || guess >= (this.targetNumber +5)){
      return { success: true, result: 'continue', hint: 'Too cold',
      remainingAttempts: this.remainingAttempts };
    }

    if(guess >= (this.targetNumber -5) || guess <= (this.targetNumber +5)){
      return { success: true, result: 'continue', hint: 'Too hot',
      remainingAttempts: this.remainingAttempts };
    }

    return {
      success: true,
      result: 'continue',
      hint,
      remainingAttempts: this.remainingAttempts,
    };
  }
}
