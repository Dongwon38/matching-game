// setting the game
const cards = document.querySelectorAll(".card");
const allCards = [];

function addCard(number, value) {
  allCards.push({
    cardNumber: Number(number),
    cardValue: value,
    count: 0,
    isOpen: false,
  });
}

// give an id and img for each cards
cards.forEach((card, index) => {
  const cardfront = card.querySelector(".front");
  card.id = index + 1;
  const imgPath = Math.round(card.id / 2);
  const img = new Image();
  img.src = `images/0${imgPath}.jpg`;
  cardfront.appendChild(img);
  addCard(card.id, imgPath);
});

console.log(allCards);

// random shuffle
cards.forEach((card) => {
  card.style.order = Math.floor(Math.random() * 100);
});

// creating player
// player 1

class Player {
  constructor(name) {
    this.name = name;
    this.point = 0;
  }

  getPoint() {
    this.point += 1;
  }
}

let player = "";
let computer = "";

function startGame() {
  player = new Player("test Player");
  computer = new Player("computer bot 1.0");
}

startGame();

// create boxes for selection&comparison
let firstCard = "";
let secondCard = "";
let disableCard = false;

// reset
function resetSelection() {
  firstCard = "";
  secondCard = "";
  disableCard = false;
}

function flipCard(card) {
  const cardback = card.querySelector(".back");
  const cardfront = card.querySelector(".front");
  cardback.style.transform = "rotateY(180deg)";
  cardfront.style.transform = "rotateY(0deg)";
}

function unflipCard(card) {
  const cardback = card.querySelector(".back");
  const cardfront = card.querySelector(".front");
  cardback.style.transform = "rotateY(0deg)";
  cardfront.style.transform = "rotateY(180deg)";
}

//computer turn
function computerTurn() {
  setTimeout(() => {
    // set card deck for picking
    const cardDeck = [];
    allCards.forEach((card) => {
      if (!card.isOpen) {
        cardDeck.push(card);
      }
    });

    let botFirstPick = "";
    let botSecondPick = "";
    let botFirstPickDiv = "";
    let botSecondPickDiv = "";

    // first pick
    setTimeout(() => {
      botFirstPick = cardDeck[Math.floor(Math.random() * cardDeck.length)];
      botFirstPickDiv = document.getElementById(`${botFirstPick.cardNumber}`);
      flipCard(botFirstPickDiv);

      // second pick
      setTimeout(() => {
        // prevent for picking the same card
        do {
          botSecondPick = cardDeck[Math.floor(Math.random() * cardDeck.length)];
          botSecondPickDiv = document.getElementById(
            `${botSecondPick.cardNumber}`
          );
          flipCard(botSecondPickDiv);
        } while (!botFirstPick.cardValue == botSecondPick.cardValue);

        console.log(botFirstPick);
        console.log(botSecondPick);
        console.log(cardDeck);
        // comparison
        if (botFirstPick.cardValue == botSecondPick.cardValue) {
          console.log("computer got one point");
          computer.getPoint();
        } else {
          console.log("computer got no point");
          botFirstPick.count += 1;
          botSecondPick.count += 1;
          setTimeout(() => {
            unflipCard(document.getElementById(`${botFirstPick.cardNumber}`));
            unflipCard(document.getElementById(`${botSecondPick.cardNumber}`));
            resetSelection();
          }, 1000);
        }
        // step 4
        setTimeout(() => {
          console.log("now computer three");
          setTimeout(() => {
            console.log("now your turn");
          }, Math.random() * 1000);
        }, Math.random() * 1000);
      }, Math.random() * 1000);
    }, Math.random() * 1000);
  }, Math.random() * 1000);
}

//selecting function
cards.forEach((card) => {
  card.addEventListener("click", () => {
    // pause for reset
    if (disableCard) return;
    // prevent to select the opened card
    if (allCards[card.id - 1].isOpen) {
      console.log("error");
      resetSelection();
      return;
    }
    disableCard = true;

    // first selection
    if (!firstCard) {
      flipCard(card);
      firstCard = allCards[card.id - 1];
      disableCard = false;
    } else {
      flipCard(card);
      secondCard = allCards[card.id - 1];

      // if it is a pair
      if (firstCard.cardValue === secondCard.cardValue) {
        console.log("You got one point");
        firstCard.isOpen = true;
        secondCard.isOpen = true;
        player.getPoint();
        resetSelection();
        disableCard = true;
        setTimeout(() => {
          computerTurn();
        }, 1000);
      }
      // if it is not
      else {
        console.log("You were wrong");
        // count
        firstCard.count += 1;
        secondCard.count += 1;
        disableCard = true;
        setTimeout(() => {
          // reset
          unflipCard(document.getElementById(`${firstCard.cardNumber}`));
          unflipCard(document.getElementById(`${secondCard.cardNumber}`));
          resetSelection();
          disableCard = true;
          computerTurn();
        }, 1000);
      }
    }
  });
});

// if (pickedCards.length == 18) {
//   console.log("game over");
// }

// 빠르게 클릭했을 때 점수 얻는 문제
