import Game from './models/Game.js';
import * as cardsView from './views/cardsView'
import * as messagesView from './views/messagesView'
import '../style.less';

const controlGame = () => {

    // Set-up first round
    const game = new Game;
    game.firstRound();
    cardsView.renderCards(game.stacks, game.challenger);
    let messages = game.challenger === 0
        ? ['<span class="arrow">◀</span> Player 1<br />Choose first fact']
        : ['Player 2 <span class="arrow">▶</span><br />Choose first fact'];
    messagesView.setMessages(messages);
    document.body.addEventListener('click', e => {
        if (e.target.closest('.fact')) {

            // Turn opposing card
            game.playCard();
            cardsView.clearCards();
            cardsView.renderCards(game.stacks, game.challenger, game.opposer, game.cardPlayed);
            messagesView.clearMessages();

            // Play round
            const fact = e.target.closest('.fact');
            game.compareCards(fact);
            switch (game.result.winner) {
                case 0:
                messages = ['<span class="arrow">◀</span> Player 1 wins!'];
                break;
                case 1:
                    messages = ['Player 2 wins! <span class="arrow">▶</span>'];
                    break;
                default:
                    messages = ['Draw'];
            }
            messagesView.setMessages(messages);
            cardsView.disableClicks();
            window.setTimeout(() => {
                cardsView.enableClicks();
                messagesView.clearMessages();
                if (game.stacks[0].length === 8 || game.stacks[1].length === 8) {

                    // Game over
                    game.over();
                    cardsView.clearCards();
                    cardsView.renderCards(game.stacks, game.challenger, game.opposer, game.cardPlayed, game.over);
                    const gameWinner = game.result.winner === 0 ? 'Player 1 wins!' : 'Player 2 wins!';
                    messagesView.setMessages([`Game over<br />${gameWinner}`]);
                } else {

                    // Next round
                    game.nextRound();
                    cardsView.clearCards();
                    cardsView.renderCards(game.stacks, game.challenger, game.opposer, game.cardPlayed);
                    messages = game.challenger === 0
                        ? ['<span class="arrow">◀</span> Player 1<br />Choose next fact']
                        : [' Player 2 <span class="arrow">▶</span><br />Choose next fact'];
                    messagesView.setMessages(messages);
                }
            }, 3000);
        }
    });
}
controlGame();
