import { addToCasinoMoney } from '../main';

export const INITIAL_NOTEBOOK_SECUENCE = [1, 2, 3, 4];

export class Player {
  constructor(name, winningCodintion) {
    this.name = name;
    this.didWin = winningCodintion;

    this.notebook = [...INITIAL_NOTEBOOK_SECUENCE];
    this.balance = 0;
  }

  /**
   * Restart notebook and return the sum of the first and last number
   */
  restartNotebook() {
    this.notebook = [...INITIAL_NOTEBOOK_SECUENCE];
  }

  /** Returns possible bet amount and a flag telling if needs a reset (for animation) */
  getBetPossibleAmount() {
    const len = this.notebook.length;

    let bet = 0;

    if (len >= 2) {
      bet = this.notebook[0] + this.notebook[len - 1];
    } else {
      bet = this.notebook[0] || 0;
    }

    return { bet, needsANotebookReset: bet < 5 || bet > 4000 };
  }

  getBetNumberFromNotebook() {
    const { bet, needsANotebookReset } = this.getBetPossibleAmount();

    if (needsANotebookReset) {
      this.restartNotebook();
      return this.getBetPossibleAmount().bet;
    }
    return bet;
  }

  playRound(number) {
    const bet = this.getBetNumberFromNotebook();

    if (this.didWin(number)) {
      this.balance += bet;
      addToCasinoMoney(-bet);
      // Write the bet number in the notebook
      this.notebook.push(bet);
    } else {
      this.balance -= bet;
      addToCasinoMoney(bet);
      // Remove first and last element from the notebook. Won't do if notebook is empty.
      this.notebook.shift();
      this.notebook.pop();
    }
  }
}
