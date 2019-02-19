import { elements } from './base';

export const clearMessages = () => {
    elements.messages.innerHTML = '';
};

export const setMessages = (messages) => {
    messages.forEach(message => elements.messages
        .insertAdjacentHTML('beforeend', `<div>${message}</div>`));
};
