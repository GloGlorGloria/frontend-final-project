const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;

function flipCard(e) {
    let clickedCard = e.target;
    if(clickedCard !== cardOne) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        console.log(cardOne, cardTwo)
    }
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});