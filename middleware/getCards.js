const db = require('../database/pgCards');

module.exports.getBlackCards = (num) => {
    const choices = db.blackCards;
    seen = {};
    let deck = []
    for (let i = 0; i < num; i++){
        let randomNum;
        while (randomNum === undefined || seen.hasOwnProperty(randomNum)){
            randomNum = Math.floor(Math.random() * choices.length);
        }
        seen[randomNum] = randomNum;
        deck.push(choices[randomNum]);
    }
    return deck;
}

module.exports.getWhiteCards = (num) => {
    const choices = db.whiteCards;
    seen = {};
    let deck = []
    for (let i = 0; i < num; i++){
        let randomNum;
        while (randomNum === undefined || seen.hasOwnProperty(randomNum)){
            randomNum = Math.floor(Math.random() * choices.length);
        }
        seen[randomNum] = randomNum;
        deck.push(choices[randomNum]);
    }
    return deck;
}