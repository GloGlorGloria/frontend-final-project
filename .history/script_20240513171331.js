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
        
        let cardOneImg = cardOne.querySelector("img"),
        cardTwoImg = cardTwo.querySelector("img");
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    console.log(img1, img2);
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});