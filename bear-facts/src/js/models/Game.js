import Pack from '../models/Pack.js';

export default class Game {
    constructor (stacks, challenger, opposer, cardPlayed, result, gameOver) {
        this.stacks = stacks;
        this.challenger = challenger;
        this.opposer = opposer;
        this.cardPlayed = cardPlayed;
        this.result = result;
        this.gameOver = gameOver;
    }

    firstRound() {
        this.stacks = new Pack().open().shuffle().deal();
        this.challenger = Math.round(Math.random());
        this.opposer = this.challenger === 0 ? 1 : 0;
        this.cardPlayed = false;
        this.gameOver = false;
    }

    playCard() {
        this.cardPlayed = true;
    }

    compareCards(fact) {
        const challenger = parseFloat(fact.dataset.value);
        const opposer = this.stacks[this.opposer][0][fact.dataset.label];
        if (challenger > opposer) {
            this.result = {'winner': this.challenger, 'loser': this.opposer};
        } else if (opposer > challenger) {
            this.result = {'winner': this.opposer, 'loser': this.challenger};
        } else {
            this.result = 'draw';
        }
        if (this.result !== 'draw') {
            document.body.querySelector(`.stack-${this.result.winner} .fact[data-label="${fact.dataset.label}"]`)
                .classList.add('winner');
            document.body.querySelector(`.stack-${this.result.loser} .fact[data-label="${fact.dataset.label}"]`)
                .classList.add('loser');
        } else {
            document.querySelectorAll(`.fact[data-label="${fact.dataset.label}"]`)
                .forEach(card => { card.classList.add('draw') });
        }
        if (this.result !== 'draw') {
            const winningCard = this.stacks[this.result.winner].shift();
            const losingCard = this.stacks[this.result.loser].shift();
            this.stacks[this.result.winner].push(winningCard, losingCard);
        } else {
            this.stacks.forEach(stack => stack.push(stack.shift()));
        }
    }

    nextRound() {
        this.challenger = this.challenger === 0 ? 1 : 0;
        this.opposer = this.opposer === 0 ? 1 : 0;
        this.cardPlayed = false
    }

    over() {
        this.gameOver = true;
    }
}
