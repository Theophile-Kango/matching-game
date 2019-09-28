const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0, moved = 0;

let seconds = 30;
let minutes = 1;
let zeroM = '0';
let zeroS = '0';

let temp = setInterval(() => {
    //seconds++;
    zeroM = minutes < 10 ? zeroM = '0' : '';
    zeroS = seconds < 10 ? zeroS = '0' : '';
    --seconds;
    if ((minutes === 0) && (seconds === 0)) execute(); 
    if(seconds == -1 ){
        zeroS = '';
        seconds = 59;
        --minutes;
    }
   
    document.querySelector('#time').textContent = `${zeroM}${minutes} : ${zeroS}${seconds}`;
}, 1000);
function flipCard() {

    document.querySelector('#moves').textContent = count;


    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');
    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        count++;
        firstCard = this;
        return;
    } else {

        //second click
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
    }
    if (count > 20) execute();

}

const checkForMatch = () => {
    let isMatch = firstCard.dataset.frame === secondCard.dataset.frame;

    isMatch ? disableCards() : unflipCards();
    if (isMatch) {
        moved++;

        if (moved === 8) {
            let win = document.querySelector('.footer');
            win.style.display = 'block';
            clearInterval(temp);
        }

    }

}


const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
const unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}
const resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
const shuffle = () => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}
shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));



let reset = document.querySelector('#reset');
reset.addEventListener('click', execute);
function execute() {
    setTimeout(function () {
        document.location.reload(true);
    }, 100);

}
