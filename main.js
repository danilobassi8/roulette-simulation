import './styles/global.css';
import './styles/buttons.css';

import { Player, INITIAL_NOTEBOOK_SECUENCE } from './src/player';
import { winningConditions } from './src/winningConditions';
import { getRandomNumber, getArrayString } from './src/utils';
import { animations, changeVolume, GLOBAL_VOLUME } from './src/animations';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin.js';

gsap.registerPlugin(TextPlugin);

function initializeDOM() {
  const notebooks = document.getElementsByClassName('notebook');
  Array.from(notebooks).forEach((n) => (n.innerHTML = getArrayString(INITIAL_NOTEBOOK_SECUENCE)));

  gsap.from('.final-section', { opacity: 0 });
  gsap.from('img', { opacity: 0, ease: gsap.Power0 });

  const volInput = document.querySelector('#volume-input');
  const volIcon = document.querySelector('#volume-icon');

  volInput.addEventListener('input', (ev) => {
    const newVolume = parseFloat(ev.target.value);
    changeVolume(newVolume);
  });

  volIcon.addEventListener('click', (ev) => {
    console.log(ev);
    GLOBAL_VOLUME ? changeVolume(0) : changeVolume(1);
  });
}

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

  console.log(('number', randomNumber));
  PLAYERS.forEach((player) => {
    player.playRound(randomNumber);
  });
  console.log('CASINO:', CASINO_MONEY);

  const postPlayAnim = animations.postPlayAnimation(CASINO_MONEY);
  tl.add(playAnim).add(postPlayAnim);
};

const btnPlay = document.getElementById('btn-play');
const btnSimulate = document.getElementById('btn-simulate');

btnPlay.addEventListener('click', playARound);
btnSimulate.addEventListener('click', () => {
  for (let i = 0; i < 4000; i++) {
    const randomNumber = getRandomNumber();
    PLAYERS.forEach((player) => player.playRound(randomNumber));
  }
  console.log('CASINO:', CASINO_MONEY);
});

initializeDOM();
