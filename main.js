import './styles/global.css';
import './styles/buttons.css';

import { Player } from './src/player';
import { winningConditions } from './src/winningConditions';
import { getRandomNumber, initializeDOM } from './src/utils';
import { animations } from './src/animations';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin.js';

gsap.registerPlugin(TextPlugin);

let CASINO_MONEY = 0;

export const PLAYERS = [
  new Player('A', winningConditions.onRed),
  new Player('B', winningConditions.onBlack),
  new Player('C', winningConditions.onHight),
  new Player('D', winningConditions.onLow),
  new Player('E', winningConditions.onOdd),
  new Player('F', winningConditions.onEven),
];

export const addToCasinoMoney = (amount) => {
  CASINO_MONEY += amount;
};

const playARound = () => {
  const tl = gsap.timeline();

  const randomNumber = 2;
  const playAnim = animations.playAnimation(randomNumber);

  PLAYERS.forEach((player) => {
    player.playRound(randomNumber);
  });

  const postPlayAnim = animations.postPlayAnimation(CASINO_MONEY);
  tl.add(playAnim).add(postPlayAnim);
};

const simulateGame = () => {
  for (let i = 0; i < 4000; i++) {
    const randomNumber = getRandomNumber();
    PLAYERS.forEach((player) => player.playRound(randomNumber));
  }

  animations.playAFullSimulation(CASINO_MONEY);
};

// add events to btns
const btnPlay = document.getElementById('btn-play');
const btnSimulate = document.getElementById('btn-simulate');
btnPlay.addEventListener('click', playARound);
btnSimulate.addEventListener('click', simulateGame);

initializeDOM();
