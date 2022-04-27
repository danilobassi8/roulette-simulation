import { gsap, Power1, Expo } from 'gsap';
import { PLAYERS } from '../main';
import { winningConditions } from './winningConditions';
import { getArrayString } from './utils';

export const ENABLE_ANIMATIONS = true;

export const animations = {
  playAnimation: (rouletteNumber) => {
    if (!ENABLE_ANIMATIONS) return;

    const tl = gsap.timeline({
      onComplete: () => {
        animations.afterPlayAnimation(rouletteNumber);
      },
    });

    tl.to('.player', { height: 130 });

    const innerTimelines = [];
    PLAYERS.forEach((player) => {
      const innerTL = gsap.timeline();
      const selector = `.player-${player.name} .bet`;

      const bet = player.getBetAmount();
      innerTL
        .to(selector, { height: 20, opacity: 1 })
        .fromTo(
          selector,
          { text: 'bet: ', color: 'black' },
          { text: `bet: ${bet}`, duration: 1 },
          '<'
        );

      innerTimelines.push(innerTL);
    });

    tl.add(innerTimelines);

    const randomNumberTL = animations.addRandomRouletteEffect('#number', {
      duration: 2,
      finalNumber: rouletteNumber,
    });
    const spinEffectTL = gsap
      .timeline()
      .to('#img-ruleta', { rotation: '+=2600', ease: Power1.easeOut, duration: 2.8 });

    tl.add([randomNumberTL, spinEffectTL]);
    return tl;
  },
  afterPlayAnimation: (rouletteNumber) => {
    if (!ENABLE_ANIMATIONS) return;

    const timeline = gsap.timeline();
    const appTimelines = [];
    PLAYERS.forEach((player) => {
      const innerTl = gsap.timeline();
      // update player winnings
      const betSelector = `.player-${player.name} .bet`;
      const balanceSelector = `.player-${player.name} .balance`;
      const notebookSelector = `.player-${player.name} .notebook`;

      const playerLastBet = document.querySelectorAll(betSelector)[0];
      const text = playerLastBet.innerHTML;
      const animObject = player.didWin(rouletteNumber)
        ? { text: text.replace('bet: ', '+'), color: 'greenyellow' }
        : { text: text.replace('bet: ', '-'), color: 'red' };

      innerTl.to(betSelector, { ...animObject, duration: 0 });
      innerTl
        .to(betSelector, { yPercent: -200, opacity: 0, duration: 1 }, '<')
        .to(betSelector, { yPercent: 0, height: 0 })
        .to('.player', { height: 100, duration: 1 }, '<');

      // update their notebooks
      innerTl
        .to(notebookSelector, { opacity: 0 }, '<')
        .to(notebookSelector, { text: getArrayString(player.notebook) })
        .to(notebookSelector, { opacity: 1 });

      // update their balance
      const fromNumber = document.querySelector(`.player-${player.name} .balance`).textContent;
      animations.addProgressionEffect(balanceSelector, {
        fromNumber,
        toNumber: player.balance,
        duration: 0.5,
      });

      appTimelines.push(innerTl);
    });
    timeline.add(appTimelines);
  },
  postPlayAnimation: (casinoMoney) => {
    // add casino money
    console.log('???', casinoMoney);
    return animations.addProgressionEffect('#casino-money', {
      fromNumber: document.querySelector(`#casino-money`).innerText,
      toNumber: casinoMoney,
      duration: 1,
      stopped: false,
    });
  },
  addProgressionEffect: (selector, { fromNumber, toNumber, duration, stopped = false }) => {
    const tl = gsap.timeline();

    if (stopped) {
      tl.pause();
    }

    let from = parseInt(fromNumber);
    let to = parseInt(toNumber);

    let flag = 0;
    while (from != to || flag < 500) {
      flag++;
      if (from > to) {
        from--;
      } else if (from < to) {
        from++;
      } else {
        break;
      }
      tl.to(selector, { text: from });
    }
    tl.to(selector, { text: to });
    tl.duration(duration);
    return tl;
  },
  addRandomRouletteEffect: (selector, { finalNumber = null, duration = 1, iterations = 100 }) => {
    if (!ENABLE_ANIMATIONS) return;

    const timeline = gsap.timeline();

    for (let i = 0; i < iterations; i++) {
      timeline.to(selector, {
        text: 'random(0,36,1)',
        background: "random(['black','red'])",
        color: 'white',
      });
    }

    if (finalNumber) {
      let bgColor;
      if (finalNumber == 0) {
        bgColor = 'green';
      } else {
        bgColor = winningConditions.onRed(finalNumber) ? 'red' : 'black';
      }

      timeline.to(selector, { text: finalNumber, color: 'white', background: bgColor });
    }
    timeline.duration(duration);

    return timeline;
  },
  updateWithNewNotebook: (playerName, notebook) => {
    if (!ENABLE_ANIMATIONS) return;

    const selector = `.player-${playerName} .notebook`;
    const tl = gsap.timeline();
    tl.to(selector, { textDecoration: 'line-through' })
      .to(selector, { opacity: 0 })
      .to(selector, { text: notebook })
      .to(selector, { opacity: 1 })
      .to(selector, { textDecoration: 'none' }, '<');
  },
};
