const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let disableTracker = false;
  
function soundEffectPlay(sound){
  var audio = new Audio(`sounds/${sound}.mp3`);
  audio.play();
}

function flipCard(e) {
  soundEffectPlay('flip');
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableTracker) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
        return cardOne = clickedCard;
    }
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
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return disableTracker = false;
  }

  soundEffectPlay("wrong");
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableTracker = false;
  }, 1200);
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});