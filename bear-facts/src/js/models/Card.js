export default class Card {
    constructor (binomialName, commonName, height, image, lifespan, speed, weight) {
        this.binomialName = binomialName;
        this.commonName = commonName;
        this.height = height; // metres
        this.image = image;
        this.lifespan = lifespan; // years
        this.speed = speed; // kph
        this.weight = weight; // kilogramms
    }
}
