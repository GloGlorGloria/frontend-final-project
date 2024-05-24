const cards = document.querySelectorAll(".card");
const timerNum = document.querySelector(".timer b");
const flipsNum = document.querySelector(".flips-num b");
const resetBtn = document.querySelector(".reset-btn");
const levelDisplay = document.querySelector(".level span b");
const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popup-message");
const continueBtn = document.querySelector(".popup-btn.continue");
const endGameBtn = document.querySelector(".popup-btn.end-game");
const scoreDisplay = document.querySelector(".score span");
const animalsImg = document.querySelector(".animals-img");

let maxTime =80, timeLeft = maxTime, flips = 0, matchedCard = 0, level = 1, score = 0;
let cardOne, cardTwo, timer;
let playerWon = false, disableTracker = false, isPlaying = false;

function soundEffectPlay(sound) {
  try {
    var audio = new Audio(`sounds/${sound}.mp3`);
    audio.play();
  } catch (error) {
    console.error(`Error playing sound ${sound}: `, error);
  }
}

function initTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    soundEffectPlay("fail");
    popupMessage.textContent = "Time's up! You lost!";
    popup.classList.remove("hidden");
    playerWon = false;
    return;
  }
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
  disableTracker = false;
  isPlaying = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);
  cards.forEach((card, key) => {
    card.classList.remove("flip");
    let img = card.querySelector(".card-img");
    img.src = `images/image-0${arr[key]}.png`;
    card.addEventListener("click", flipCard);
  });
}

function messageRandomImg(excludeImg) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * 8) + 1;
  } while (`images/image-0${randomIndex}.png` === excludeImg);
  previousPopupImage = `images/image-0${randomIndex}.png`;
  return previousPopupImage;
}

function alertMessage() {
  if (level < 5) {
    animalsImg.src = messageRandomImg(animalsImg.src);
    popupMessage.textContent = `You won! Proceed to Level ${level + 1}?`;
    popup.classList.remove("hidden");
    playerWon = true;
  } else {
    animalsImg.src = messageRandomImg(animalsImg.src);
    popupMessage.textContent = "You are a super player!!";
    soundEffectPlay("super");
    popup.classList.remove("hidden");
    continueBtn.style.display = "none";
  }
}

function nextLevel() {
  if (playerWon) {
    level++;
    maxTime -= 10;
  }
  levelDisplay.textContent = level;
  shuffleCard();
}

function resetGame() {
  maxTime = 60;
  timeLeft = maxTime;
  flips = 0;
  matchedCard = 0;
  cardOne = cardTwo = "";
  score = 0;
  level = 1;
  playerWon = false;
  clearInterval(timer);
  timerNum.innerText = timeLeft;
  flipsNum.innerText = flips;
  levelDisplay.innerText = level;
  scoreDisplay.innerText = score;
  popup.classList.add("hidden");
  shuffleCard();
}

function flipCard({target: clickedCard}) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !disableTracker && timeLeft > 0) {
    soundEffectPlay('flip');
    flips++;
    flipsNum.innerText = flips;
    clickedCard.classList.add("flip");
    if (!cardOne) return cardOne = clickedCard;
    cardTwo = clickedCard;
    disableTracker = true;
    let cardOneImg = cardOne.querySelector(".card-img").src,
        cardTwoImg = cardTwo.querySelector(".card-img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    soundEffectPlay("perfect");
    matchedCard++;
    score += 100;
    scoreDisplay.innerText = score;
    if (matchedCard === 8 && timeLeft > 0) {
      setTimeout(() => { soundEffectPlay("win"); }, 800);
      setTimeout(() => {
        clearInterval(timer);
        alertMessage();
        return;
      }, 800);
    }
    [cardOne, cardTwo].forEach(card => card.removeEventListener("click", flipCard));
    cardOne = cardTwo = "";
    disableTracker = false;
    return;
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
cards.forEach(card => card.addEventListener("click", flipCard));

endGameBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  resetGame();
});

continueBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  (level <= 5) ? nextLevel() : resetGame();
});

