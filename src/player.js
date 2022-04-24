import { addToCasinoMoney } from '../main';
import { getArrayString } from './utils';

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
    return this.notebook[0] + this.notebook[this.notebook.length - 1];
  }

  getBetAmount() {
    let betNumber = 0;

    if (this.notebook.length >= 2) {
      const first = this.notebook[0];
      const last = this.notebook[this.notebook.length - 1];
      betNumber = first + last;
    } else {
      if (this.notebook.length == 1) {
        betNumber = this.notebook[0];
      } else {
        betNumber = this.restartNotebook();
      }
    }

    if (betNumber >= 5 && betNumber <= 4000) {
      return betNumber;
    } else {
      return this.restartNotebook();
    }
  }

  playRound(number) {
    const bet = this.getBetAmount();
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
      console.log(this.notebook);
    }

    const balance = document.querySelectorAll(`.player-${this.name} .balance`)[0];
    balance.innerHTML = this.balance;

    const notebook = document.querySelectorAll(`.player-${this.name} .notebook`)[0];
    notebook.innerHTML = getArrayString(this.notebook);
  }
}
