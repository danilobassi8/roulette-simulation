import { INITIAL_NOTEBOOK_SECUENCE } from './player';
import { changeVolume, GLOBAL_VOLUME } from './animations';
import { gsap } from 'gsap';

/** Will return a integer between 0 and 37 */
export const getRandomNumber = () => Math.floor(Math.random() * 37);

/** Will return a string based on an array */
export const getArrayString = (array) => {
  const length = array.length;

  switch (length) {
    case 0:
      return '[]';
    case 1:
      return `[${array[0]}]`;
    case 2:
      return `[${array[0]}, ${array[1]}]`;
    case 3:
      return `[${array[0]}, ${array[1]}, ${array[2]}]`;
    case 4:
      return `[${array[0]}, ${array[1]}, ${array[2]}, ${array[3]}]`;
    default:
      return `[${array[0]}, ${array[1]} ... ${array[length - 2]}, ${array[length - 1]}]`;
  }
};

export function initializeDOM() {
  // initialize notebooks
  const notebooks = document.getElementsByClassName('notebook');
  Array.from(notebooks).forEach((n) => (n.innerHTML = getArrayString(INITIAL_NOTEBOOK_SECUENCE)));

  // animations for images
  gsap.from('.final-section', { opacity: 0 });
  gsap.from('img', { opacity: 0, ease: gsap.Power0 });

  // add volume effects.
  const volInput = document.querySelector('#volume-input');
  const volIcon = document.querySelector('#volume-icon');

  volInput.addEventListener('input', (ev) => {
    const newVolume = parseFloat(ev.target.value);
    changeVolume(newVolume);
  });

  volIcon.addEventListener('click', (ev) => {
    GLOBAL_VOLUME ? changeVolume(0) : changeVolume(1);
  });
}
