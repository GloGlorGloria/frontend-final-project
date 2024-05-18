const cards = document.querySelectorAll(".card");
timerNum = document.querySelector(".timer b"),
flipsNum = document.querySelector(".flipsNum b"),
resetBtn = document.querySelector(".resetBtn");

let maxTime = 30;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let cardOne, cardTwo, timer;
let disableTracker = false;
  
function soundEffectPlay(sound){
  var audio = new Audio(`sounds/${sound}.mp3`);
  audio.play();
}

function initTimer() {
  if (timeLeft <= 0) return clearInterval(timer);
  timeLeft--;
  timerNum.innerText = timeLeft;
}

function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCard = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  timerNum.innerText = timeLeft;
  flipsNum.innerText = flips;
  disableTracker = isPlaying = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => Math.random () > .5 ? 1 : -1);
  cards.forEach((card, key) => {
    card.classList.remove("flip");
    let img = card.querySelector(".cardImage");
    img.src = `images/image-0${arr[key]}.png`
    card.addEventListener("click", flipCard);
  })
}

function flipCard({target: clickedCard}) {
  if(!isPlaying) {
      isPlaying = true;
      timer = setInterval(initTimer, 1000);
  }
  if(clickedCard !== cardOne && !disableTracker && timeLeft > 0) {
    soundEffectPlay('flip');
    flips++;
    flipsNum.innerText = flips;
    clickedCard.classList.add("flip");
    if (!cardOne) return cardOne = clickedCard;
    cardTwo = clickedCard;
    disableTracker = true;
    let cardOneImg = cardOne.querySelector(".cardImage").src,
    cardTwoImg = cardTwo.querySelector(".cardImage").src;
    matchCards(cardOneImg, cardTwoImg); 
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    soundEffectPlay("perfect");
    matchedCard++;
    if (matchedCard === 8 && timeLeft > 0) {
      setTimeout(() => {soundEffectPlay("win")}, 800);
      setTimeout(() => {
        return clearInterval(timer);
      }, 1500)
    };
    [cardOne, cardTwo].forEach(card => card.removeEventListener("click", flipCard));
    cardOne = cardTwo = "";
    return disableTracker = false;
  }

  soundEffectPlay("wrong");
  setTimeout(() => {
    [cardOne, cardTwo].forEach(card => card.classList.add("shake"));
  }, 400);

  setTimeout(() => {
    [cardOne, cardTwo].forEach(card => card.classList.remove("shake", "flip"));
    cardOne = cardTwo = "";
    disableTracker = false;
  }, 500);
}

shuffleCard();
resetBtn.addEventListener("click", shuffleCard);
cards.forEach(card => {
  card.addEventListener("click", flipCard);
});