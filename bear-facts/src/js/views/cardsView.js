import { elements } from './base';

export const renderCards = (stacks, challenger, opposer, cardPlayed, over) => {
    stacks.forEach((stack, player) => {
        stack.forEach((card, depth) => {
            let cardFace, pointerEvents;
            if (over) {
                cardFace = 'face-up';
                pointerEvents = 'none';
            } else if (challenger === player && depth === 0) {
                cardFace = 'face-up';
                pointerEvents = 'auto';
            } else if (opposer === player && depth === 0 && cardPlayed) {
                cardFace = 'face-up';
                pointerEvents = 'auto';
            } else {
                cardFace = 'face-down';
                pointerEvents = 'none';
            }
            const className = card.commonName.toLowerCase().split(' ').join('-');
            const markup = `
                <div class='wrapper'>
                    <div class="card ${cardFace}" style="pointer-events: ${pointerEvents};">
                        <div class="picture ${className}">
                            <div class="player">Player ${player + 1}</div>
                            <div class="name">
                                <div class="common-name">${card.commonName}</div>
                                <div class="binomial-name">${card.binomialName}</div>
                            </div>
                        </div>
                        <ul class="facts">
                            <li class="fact" data-label="height" data-value="${card.height}">
                                <div class="label">Height</div>
                                <div class="value">${card.height} cm</div>
                            </li>
                            <li class="fact" data-label="weight" data-value="${card.weight}">
                                <div class="label">Weight</div>
                                <div class="value">${card.weight} kg</div>
                            </li>
                            <li class="fact" data-label="speed" data-value="${card.speed}">
                                <div class="label">Speed</div>
                                <div class="value">${card.speed} km/h</div>
                            </li>
                            <li class="fact" data-label="lifespan" data-value="${card.lifespan}">
                                <div class="label">Lifespan</div>
                                <div class="value">${card.lifespan} years</div>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
            if (!player) {
                elements.stack0.insertAdjacentHTML('beforeend', markup);
            } else {
                elements.stack1.insertAdjacentHTML('beforeend', markup);
            }
        });
    })
}

export const clearCards = () => {
    elements.stack0.innerHTML = '';
    elements.stack1.innerHTML = '';
};

export const disableClicks = () => {
    document.querySelectorAll('.face-up').forEach(card => card.style.pointerEvents = 'none');
};

export const enableClicks = () => {
    document.querySelectorAll('.face-up').forEach(card => card.style.pointerEvents = 'auto');
};
