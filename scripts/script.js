// setting the game
const cards = document.querySelectorAll(".card");

// give an id and img for each cards
cards.forEach((card, index) => {
  const cardback = card.querySelector(".back");
  const cardfront = card.querySelector(".front");
  cardback.id = index + 1;
  const imgPath = Math.round(cardback.id / 2);
  const img = new Image();
  img.src = `images/0${imgPath}.jpg`;
  cardfront.appendChild(img);
});

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
  player = new Player(
    "test Player"
    // prompt("Enter player's name:")
  );
  computer = new Player("computer bot 1.0");
  console.log(player, computer);
}

startGame();

// create boxes for selection&comparison
let firstSelectedCard = "";
let secondSelectedCard = "";
let firstCardElement = null;
let secondCardElement = null;
let disableCard = false;
let openedCards = [];
console.log(openedCards);

// reset
function resetSelection() {
  firstSelectedCard = "";
  secondSelectedCard = "";
  firstCardElement = null;
  secondCardElement = null;
  disableCard = false;
}

//selecting function
cards.forEach((card) => {
  card.addEventListener("click", () => {
    // pause for reset
    if (disableCard) return;
    // prevent to select the same card
    if (card === firstCardElement) return;

    const cardback = card.querySelector(".back");
    const cardfront = card.querySelector(".front");
    const cardImg = cardfront.querySelector("img");

    cardback.style.transform = "rotateY(180deg)";
    cardfront.style.transform = "rotateY(0deg)";

    // first selection
    if (!firstSelectedCard) {
      firstSelectedCard = cardImg.src;
      firstCardElement = card;
      console.log("First card selected:", firstSelectedCard);
    }
    // second selection
    else if (!secondSelectedCard) {
      secondSelectedCard = cardImg.src;
      secondCardElement = card;
      console.log("Second card selected:", secondSelectedCard);

      // then, comparison
      if (firstSelectedCard === secondSelectedCard) {
        openedCards.push(firstSelectedCard);
        openedCards.push(secondSelectedCard);
        player.getPoint();
        console.log(player, "You got one point");
        resetSelection();
      } else {
        console.log("You were wrong");
        disableCard = true;
        setTimeout(() => {
          // reset if it is not a pair
          firstCardElement.querySelector(".back").style.transform =
            "rotateY(0deg)";
          firstCardElement.querySelector(".front").style.transform =
            "rotateY(180deg)";
          secondCardElement.querySelector(".back").style.transform =
            "rotateY(0deg)";
          secondCardElement.querySelector(".front").style.transform =
            "rotateY(180deg)";
          resetSelection();
        }, 1000);
      }
      if (openedCards.length == 18) {
        console.log("game over");
      }
    }
  });
});

// 컴퓨터 만드는 법
// 내 턴이 끝났음을 확인
// 몇 초 후 첫번째 카드 오픈
// 몇 초 후 두번째 카드 오픈
// 두카드 비교해서 맞으면 컴퓨터 점수 상승
// 틀리면 리셋 후 플레이어 턴
