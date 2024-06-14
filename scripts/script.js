"use strict";

// setting the game
const cards = document.querySelectorAll(".card");
const allCards = [];
const turnBoard = document.getElementById("turn-board");
let turn = 1;
let currentTurn = "player";

function addCard(number, value) {
  allCards.push({
    cardNumber: Number(number),
    cardValue: value,
    count: 0,
    isOpen: false,
  });
}

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
    if (this.score > 4) {
      logBox.innerHTML += `<p>${this.name} win!</p>`;
    }
  }
}

// set players
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
  document.getElementById("end-popup").style.display = "block";
  if (player.score > 4) {
    document.getElementById("end-comment").innerText = "You Win!";
    // 승리 화면
  } else {
    document.getElementById("end-comment").innerText = "You Lose...";
    // 패배 화면
  }
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
  currentTurnShowing("computer");
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
        if (botFirstPick.count + paircard.count >= difficultyNumber) {
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
            logBox.innerHTML += `<p>computer got one point.</p>`;
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
            logBox.innerHTML += `<p>computer got no point.</p>`;
            botFirstPick.count += 1;
            botSecondPick.count += 1;
            unflipCard(document.getElementById(`${botFirstPick.cardNumber}`));
            unflipCard(document.getElementById(`${botSecondPick.cardNumber}`));
          }
          // step5 turn over after a sec
          setTimeout(() => {
            if (player.score > 4 || computer.score > 4) {
              endGame();
            } else {
              turn += 1;
              turnBoard.innerText = turn;
              logBox.innerHTML += `<p>now your turn.</p>`;
              currentTurnShowing("player");
              resetSelection();
              lockCards = false;
            }
          }, Math.random() * 2000); // step 5
        }, Math.random() * 2000); // step 4
      }, Math.random() * 2000); // step 3
    }, Math.random() * 2000); // step 2
  }, Math.random() * 2000); // step 1
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
          logBox.innerHTML += `<p>You got one point!</p>`;
          firstCard.isOpen = true;
          secondCard.isOpen = true;
          player.getPoint();
          document.getElementById("player-score").innerHTML = player.score;
          resetSelection();
          lockCards = true;
        } else {
          logBox.innerHTML += `<p>You got no point.</p>`;
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
          if (player.score > 4 || computer.score > 4) {
            endGame();
          } else {
            turn += 1;
            logBox.innerHTML += `<p>Now computer is playing.</p>`;
            computerTurn();
          }
        }, 1000);
      }, 100);
    }
  });
});

// for restart
//
