
// Пробуем сделать карточки в массиве
const timeValue = document.querySelector('.game__timer-value');
const restartBtn = document.querySelector('.btn');
const gameSection = document.querySelector('.game-section__container');
const result = document.querySelector('.game__resault');

let cards = null;
let interval = null;
let firstCard = false;
let secondCard = false;

const items = [
    { name: "1", Image: "1.jpg"},
    { name: "2", Image: "2.jpg"},
    { name: "3", Image: "3.jpg"},
    { name: "4", Image: "4.jpg"},
    { name: "5", Image: "5.jpg"},
    { name: "6", Image: "6.jpg"},
    { name: "7", Image: "7.jpg"},
    { name: "8", Image: "8.jpg"},

];

//Initial timer
let seconds = 59;
let movesCount = 0;
let winCount = 0;

const timeGenerator = () => {
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    timeValue.innerHTML = `0:${secondsValue}`;
    seconds -=1;
    
    if(seconds < 0) {
        result.classList.add('resaul__screen');
        result.innerHTML = `<h2 class="resault__title">Попробуйте ещё ...</h2>`;
        clearInterval(interval);
    } else {
        
    }


}

const movesCounter = () => {
    movesCount +=1;
    movesCount.innerHTML = `<span>Moves:</span>${movesCount}`;
}

const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    for(let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
}

const matrixGenerator = (cardValues, size = 4) => {
    gameSection.innerHTML = '';
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for(let i = 0; i < size * size; i++){
        gameSection.innerHTML  +=`
        <div data-card-value="${cardValues[i].name}"class="game__card">
            <div class="card-before"><img src="./img/card-avers.jpg" alt="Карточка"></div>
            <div class="card-after"><img src="./img/${cardValues[i].Image}" alt="Карточка"></div>
        </div>`
    }
    gameSection.getElementsByClassName.gridTemplateColumns = `repeat(${matrixGenerator.size}, auto)`;

    //cards
    const cards = document.querySelectorAll('.game__card');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if(!card.classList.contains('matched')) {
                card.classList.add('flipped');
                if(!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute('data-card-value');
                }
                else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute('data-card-value');
                    if(firstCardValue == secondCardValue) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
                        firstCard = false;
                        
                        winCount += 1;
                        if(winCount == Math.floor(cardValues.length / 2)) {
                            result.classList.add('resaul__screen');
                            result.innerHTML = `<h2 class="resault__title"> Вы выиграли!</h2>`;
                            clearInterval(interval);

                        } else {

                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove('flipped');
                            tempSecond.classList.remove('flipped');
                        }, 900);
                    } 
                }
            } 
        });
    });
}


//Start game
const initializer = () => {
    result.classList.remove('resaul__screen');
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
    interval = setInterval(timeGenerator, 1000);
    winCount = 0;
}

initializer();



//Restart game
restartBtn.addEventListener('click', () => {
    clearInterval(interval);
    seconds = 59;
    initializer();

});



