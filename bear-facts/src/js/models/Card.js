export default class Card {
    constructor (binomialName, commonName, height, lifespan, speed, weight) {
        this.binomialName = binomialName;
        this.commonName = commonName;
        this.height = height; // cm
        this.lifespan = lifespan; // years
        this.speed = speed; // kph
        this.weight = weight; // kilogramms
    }
}
