"use strict";

// setting the game
const cards = document.querySelectorAll(".card");
const allCards = [];
const turnBoard = document.getElementById("turn-board");
let turn = 1;

function addCard(number, value) {
  allCards.push({
    cardNumber: Number(number),
    cardValue: value,
    count: 0,
    isOpen: false,
  });
}

// give an id and img for each cards
// cards.forEach((card, index) => {
//   const cardfront = card.querySelector(".front");
//   card.id = index + 1;
//   const imgPath = Math.round(card.id / 2);
//   const img = new Image();
//   if ((difficulty = "master")) {
//     console.log("yes");
//     img.src = `images/img-1/0${imgPath}.png`;
//   } else {
//     console.log("no");
//     img.src = `images/img-2/0${imgPath}.png`;
//   }
//   cardfront.appendChild(img);
//   addCard(card.id, imgPath);
// });

// random shuffle
cards.forEach((card) => {
  card.style.order = Math.floor(Math.random() * 100);
});

// creating player
// player 1

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  getPoint() {
    this.score += 1;
    if (this.score > 1) {
      console.log(this.name + "win!");
    }
  }
}

let player = "";
let computer = "";

function startGame() {
  player = new Player("player");
  computer = new Player("computer");
  document.getElementById("player-name").innerHTML = player.name;
  document.getElementById("computer-name").innerHTML = computer.name;
  document.getElementById("player-score").innerHTML = player.score;
  document.getElementById("computer-score").innerHTML = computer.score;
}

startGame();

// create boxes for selection&comparison
let firstCard = "";
let secondCard = "";
let lockCards = false;

// reset
function resetSelection() {
  firstCard = "";
  secondCard = "";
  lockCards = false;
}

// end game
function endGame() {
  console.log("game over");
}

// flip card
function flipCard(card) {
  const cardback = card.querySelector(".back");
  const cardfront = card.querySelector(".front");
  cardback.classList.add("toback");
  cardfront.classList.add("tofront");
}

function unflipCard(card) {
  const cardback = card.querySelector(".back");
  const cardfront = card.querySelector(".front");
  cardback.classList.remove("toback");
  cardfront.classList.remove("tofront");
}

//computer turn
function computerTurn() {
  // step1 set card deck for picking
  setTimeout(() => {
    let cardDeck = [];
    allCards.forEach((card) => {
      if (!card.isOpen) {
        cardDeck.push(card);
      }
    });

    let botFirstPick = "";
    let botSecondPick = "";
    let botFirstPickDiv = "";
    let botSecondPickDiv = "";

    // step2 first pick
    setTimeout(() => {
      botFirstPick = cardDeck[Math.floor(Math.random() * cardDeck.length)];
      botFirstPickDiv = document.getElementById(`${botFirstPick.cardNumber}`);
      flipCard(botFirstPickDiv);
      console.log("1st pick:", botFirstPick);

      //remove first picked card from array
      cardDeck = cardDeck.filter(
        (card) => card.cardNumber !== botFirstPick.cardNumber
      );

      // find a pair card
      let paircard = [];
      function isSame(card) {
        if (card.cardValue === botFirstPick.cardValue) return true;
      }
      paircard = cardDeck.find(isSame);

      // step3 2nd picking after a sec
      setTimeout(() => {
        if (botFirstPick.count + paircard.count >= 0) {
          // if it has been seen more than 3, direct pick
          botSecondPick = paircard;
          botSecondPickDiv = document.getElementById(
            `${botSecondPick.cardNumber}`
          );
          flipCard(botSecondPickDiv);
          console.log("2nd pick: direct picking", botSecondPick);
        } else {
          // normal random pick
          botSecondPick = cardDeck[Math.floor(Math.random() * cardDeck.length)];
          botSecondPickDiv = document.getElementById(
            `${botSecondPick.cardNumber}`
          );
          flipCard(botSecondPickDiv);
          console.log("2nd pick: normal picking", botSecondPick);
        }

        // step4 comparison after a sec
        setTimeout(() => {
          if (botFirstPick.cardValue == botSecondPick.cardValue) {
            console.log("computer got one point");
            botFirstPick.isOpen = true;
            botSecondPick.isOpen = true;
            computer.getPoint();
            if (computerName.innerHTML == "Michael Chow") {
              txtPopUp(txtMichael);
            } else {
              txtPopUp(txtRandy);
            }
            document.getElementById("computer-score").innerHTML =
              computer.score;
          } else {
            console.log("computer got no point");
            botFirstPick.count += 1;
            botSecondPick.count += 1;
            unflipCard(document.getElementById(`${botFirstPick.cardNumber}`));
            unflipCard(document.getElementById(`${botSecondPick.cardNumber}`));
          }
          // step5 turn over after a sec
          setTimeout(() => {
            if (player.score + computer.score == 9) {
              endGame();
            } else {
              turn += 1;
              turnBoard.innerText = turn;
              console.log("now your turn");
              resetSelection();
              lockCards = false;
            }
          }, 100); // step 5
        }, 100); // step 4
      }, 100); // step 3
    }, 100); // step 2
  }, 100); // step 1
}

//selecting function
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.children[0].classList.contains("toback")) return;
    if (lockCards) return;
    lockCards = true;

    // first selection
    if (!firstCard) {
      flipCard(card);
      firstCard = allCards[card.id - 1];
      lockCards = false;
    } else {
      flipCard(card);
      lockCards = true;
      secondCard = allCards[card.id - 1];

      // comparison
      setTimeout(() => {
        if (firstCard.cardValue === secondCard.cardValue) {
          console.log("You got one point");
          firstCard.isOpen = true;
          secondCard.isOpen = true;
          player.getPoint();
          document.getElementById("player-score").innerHTML = player.score;
          resetSelection();
          lockCards = true;
        } else {
          console.log("You were wrong");
          // count
          firstCard.count += 1;
          secondCard.count += 1;
          // reset
          setTimeout(() => {
            unflipCard(document.getElementById(`${firstCard.cardNumber}`));
            unflipCard(document.getElementById(`${secondCard.cardNumber}`));
            resetSelection();
            lockCards = true;
          }, 1000);
        }
        setTimeout(() => {
          if (player.score + computer.score == 9) {
            endGame();
          } else {
            turn += 1;
            console.log("now computer turn");
            computerTurn();
          }
        }, 1000);
      }, 100);
    }
  });
});

// for restart
// window.location.reload("true");
