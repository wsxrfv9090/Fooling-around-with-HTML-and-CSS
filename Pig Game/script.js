'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let dice = document.querySelector('.dice');
let player0Total = document.getElementById('score--0');
let player1Total = document.getElementById('score--1');
let player0Current = document.getElementById('current--0');
let player1Current = document.getElementById('current--1');

let activePlayer, currentScore, scores, gamestate;

const newGame = function() {
    activePlayer = 0;
    currentScore = 0;
    gamestate = true;
    scores = [0,0];
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    player0Current.textContent = 0;
    player1Current.textContent = 0;
    player0Total.textContent = 0;
    player1Total.textContent = 0;
    dice.classList.add('hidden');
}

const addCurrent = function() {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    currentScore = 0;
}

const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
}

newGame();

btnRoll.addEventListener('click',function() {
    if (gamestate) {
        const diceRand = Math.trunc(Math.random()*6+1);
        dice.classList.remove('hidden');
        dice.src = `dice-${diceRand}.png`;
        if (diceRand !== 1) {
            currentScore += diceRand;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click',function() {
    if (gamestate) {
        addCurrent();
        if (scores[activePlayer] >= 100) {
            gamestate = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        dice.classList.add('hidden');
        }
        switchPlayer();
        
    }
})

btnNew.addEventListener('click',newGame);