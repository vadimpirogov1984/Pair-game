(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const timeValue = document.querySelector('.game__timer-value');
        const restartBtn = document.querySelector('.btn');
        const gameSection = document.querySelector('.game-section__container');
        const result = document.querySelector('.game__resault');
        const items = [
            { name: "1", image: "card1.jpg"},
            { name: "2", image: "card2.jpg"},
            { name: "3", image: "card3.jpg"},
            { name: "4", image: "card4.jpg"},
            { name: "5", image: "card5.jpg"},
            { name: "6", image: "card6.jpg"},
            { name: "7", image: "card7.jpg"},
            { name: "8", image: "card8.jpg"}
            
        ];
        
        //let cards = null;
        let cardsCount = 16;
        let cardValues = [];
        let tempArray= [...items];
        let interval = null;
        let firstCard = false;
        let secondCard = false;
        let seconds = 59;
        
    
        // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
        function createNumbersArray(arr) {
            arr = cardValues;
            for(let i = 1; i <= cardsCount / 2; i++) {
                arr.push(i);
                arr.push(i);
            }
            return arr;
                 
        }
                
        // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
        function shuffle(arr) {
            arr = cardValues.sort(() => Math.random() - 0.5);
            return arr;
        }
              
        // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
        
        function startGame(size = 4) {
            gameSection.innerHTML = '';
            createNumbersArray();
            let arr = [];
            let winCount = 0;
            interval = setInterval(timeGenerator, 1000);
            shuffle(arr);

            tempArray = [...tempArray, ...tempArray];
            for(const el of cardValues) {
              arr.push(tempArray[el - 1])
              
            }

            for(let i = 0; i < size * size; i++){
                gameSection.innerHTML  +=`
                <div data-card-value="${arr[i].name}"class="game__card">
                    <div class="card-before"><img src="./img/card-avers.jpg" alt="Карточка"></div>
                    <div class="card-after"><img src="./img/${arr[i].image}" alt="Карточка"></div>
                </div>`
            }

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
        
        //Функция создания таймера
        function timeGenerator() {
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
        
        // Запуск игры
        startGame();

        //Сброс игры
        restartBtn.addEventListener('click', () => {
            clearInterval(interval);
            seconds = 59;
             startGame();
        
        });
    });
    
})();
