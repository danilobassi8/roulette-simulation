import './styles/global.css';
import './styles/buttons.css';

import { Player, INITIAL_NOTEBOOK_SECUENCE } from './src/player';
import { winningConditions } from './src/winningConditions';
import { getRandomNumber, getArrayString } from './src/utils';

const PLAYERS = [
  new Player('A', winningConditions.onRed),
  new Player('B', winningConditions.onBlack),
  new Player('C', winningConditions.onHight),
  new Player('D', winningConditions.onLow),
  new Player('E', winningConditions.onOdd),
  new Player('F', winningConditions.onEven),
];

// Self invoked function. Initialize all notebooks
(function () {
  const notebooks = document.getElementsByClassName('notebook');
  Array.from(notebooks).forEach((n) => (n.innerHTML = getArrayString(INITIAL_NOTEBOOK_SECUENCE)));
})();

let CASINO_MONEY = 0;

export const addToCasinoMoney = (amount) => (CASINO_MONEY += amount);

const playARound = () => {
  const randomNumber = getRandomNumber();

  PLAYERS.forEach((player) => player.playRound(randomNumber));

  document.getElementById('casino-money').innerText = CASINO_MONEY;
  document.getElementById('number').innerText = randomNumber;
};

const btnPlay = document.getElementById('btn-play');
const btnSimulate = document.getElementById('btn-simulate');

btnPlay.addEventListener('click', playARound);
btnSimulate.addEventListener('click', () => {
  for (let i = 0; i < 4000; i++) {
    playARound();
  }
});
