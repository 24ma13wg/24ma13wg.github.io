import Card from '../models/Card.js';

export default class Pack {
    constructor (cards) {
        this.cards = cards;
    }

    open() {
        this.cards = [
            new Card('Ursus americanus', 'American Black Bear', 1.8, 'ambb.jpg', 30, 48, 270),
            new Card('Ursus tibetanus', 'Asian Black Bear', 1.9, 'asbb.jpg', 25, 40, 115),
            new Card('Ursus arctos', 'Brown Bear', 2.8, 'bb.jpg', 30, 35, 390),
            new Card('Ailuropoda melanoleuca', 'Giant Panda', 1.8, 'gp.jpg', 35, 32, 250),
            new Card('Ursus maritimus', 'Polar Bear', 2.5, 'pb.jpg', 30, 40, 600),
            new Card('Melursus ursinus', 'Sloth Bear', 2, 'slb.jpg', 40, 25, 140),
            new Card('Tremarctos Ornatus', 'Spectacled Bear', 2, 'spb.jpg', 30, 48, 200),
            new Card('Helarctos malayanus', 'Sun Bear', 1.5, 'sub.jpg', 30, 48, 80)
        ]
        return this;
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this;
    }

    deal() {
        return [
            this.cards.slice(0, 4),
            this.cards.slice(4, 8)
        ];
    }
}
