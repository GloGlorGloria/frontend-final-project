const cards = document.querySelectorAll(".card");

letcardOne, cardTwo;

function flipCard(e) {
    let clickedCard = e.target;
    clickedCard.classList.add("flip");
    if(!cardOne) {
        return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    console.log(cardOne, cardTwo)
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});