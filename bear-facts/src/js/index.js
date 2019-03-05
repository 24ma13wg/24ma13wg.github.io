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
        ? ['Player 1 choose first fact']
        : ['Player 2 choose first fact'];
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
                messages = ['Player 1 wins!'];
                break;
                case 1:
                    messages = ['Player 2 wins!'];
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
                    messagesView.setMessages([`Game over. ${gameWinner}`]);
                } else {

                    // Next round
                    game.nextRound();
                    cardsView.clearCards();
                    cardsView.renderCards(game.stacks, game.challenger, game.opposer, game.cardPlayed);
                    messages = game.challenger === 0
                        ? ['Player 1 choose next fact']
                        : [' Player 2 choose next fact'];
                    messagesView.setMessages(messages);
                }
            }, 3000);
        }
    });
}
controlGame();
