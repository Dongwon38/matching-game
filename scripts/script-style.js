"use strict";

const btns = document.querySelectorAll(".btn-blue");
const btnStart = document.getElementById("btn-start");
const pgStart = document.getElementById("page-start");
const pgRegister = document.getElementById("page-register");
const pgInGame = document.getElementById("page-in-game");
const btnLists = document.querySelectorAll("header li");
const logBox = document.getElementById("log-box");

// btn hover
btns.forEach((btn) => {
  btn.addEventListener("mouseenter", (e) => {
    e.target.classList.add("hover");
    btn.addEventListener("mouseleave", (e) => {
      e.target.classList.remove("hover");
    });
  });
});

// btn hover2
btnLists.forEach((list) => {
  list.addEventListener("mouseenter", (e) => {
    e.target.classList.add("hover2");
    list.addEventListener("mouseleave", (e) => {
      e.target.classList.remove("hover2");
    });
  });
});

// Page Start to Register
btnStart.addEventListener("click", () => {
  pgStart.classList.remove("fade-in");
  pgStart.classList.add("fade-out");
  pgRegister.classList.remove("offscreen");

  setTimeout(() => {
    pgStart.classList.add("offscreen");
    pgRegister.classList.add("fade-in");
    pgRegister.classList.remove("fade-out");
  }, 800);
});

// registration
const inputName = document.getElementById("student-name");
const playerName = document.getElementById("player-name");
const teachers = document.getElementById("teachers");
const computerName = document.getElementById("computer-name");
const profiles = document.querySelectorAll(".profile");
const difficultyBox = document.getElementById("difficulty-box");
const difficultyLines = document.querySelectorAll(".difficulty-line");
const btnSubmit = document.getElementById("btn-submit");
const computerPhoto = document.getElementById("computer-photo");
const level = document.getElementById("level");

// radio event
profiles.forEach((profile) => {
  profile.addEventListener("click", () => {
    const btnRadio = profile.querySelector("input");
    btnRadio.checked = "true";
  });
});

difficultyLines.forEach((line) => {
  line.addEventListener("click", () => {
    const btnRadio = line.querySelector("input");
    btnRadio.checked = "true";
  });
});

// submit - info
let difficulty;
let difficultyNumber;

btnSubmit.addEventListener("click", () => {
  playerName.innerHTML = inputName.value;
  computerName.innerHTML = teachers.querySelector(
    'input[name="instructor"]:checked'
  ).value;
  if (computerName.innerHTML == "Randy Gulak") {
    computerPhoto.querySelector("img").src = "images/ui/randy-0.jpg";
  }
  //select difficulty
  if (
    difficultyBox.querySelector('input[name="difficulty"]:checked').value ==
    "certificate"
  ) {
    difficulty = "certificate";
    level.innerHTML = "Certificate";
    difficultyNumber = "4";
  } else {
    difficulty = "master";
    level.innerHTML = "Master";
    difficultyNumber = "3";
  }

  cards.forEach((card, index) => {
    const cardfront = card.querySelector(".front");
    card.id = index + 1;
    const imgPath = Math.round(card.id / 2);
    const img = new Image();
    if (difficulty == "certificate") {
      img.src = `images/img-1/0${imgPath}.png`;
    } else {
      img.src = `images/img-2/0${imgPath}.png`;
    }
    cardfront.appendChild(img);
    addCard(card.id, imgPath);
  });

  // change page
  pgRegister.classList.remove("fade-in");
  pgRegister.classList.add("fade-out");
  pgInGame.classList.remove("offscreen");

  setTimeout(() => {
    pgRegister.classList.add("offscreen");
    pgInGame.classList.add("fade-in");
    pgInGame.classList.remove("fade-out");
  }, 800);
});

// txt pop up

const txtContainer = document.getElementById("txtcontainer");
const txtContent = document.getElementById("txtcontent");

const txtMichael = [
  "I'm not joking.",
  "Time is money.",
  "If you lose, You will get ZERO!!!",
  "shift! shift! shift! shift!",
  "If you beat me, I'll give you an extension.",
  "It is what it is.",
  "What the hack!!!",
  "Don't ask me why.",
  "Learn XD, then you will get a job."
];

const txtRandy = [
  "Bang on!!!",
  "Sweeeeeeet.",
  "Buckle up! Next one will be a little bit spicy.",
  "Any thoughts or questions on this?",
  "Anybody?",
  "Does that make sense?",
];

// text pop up
function txtPopUp(computer) {
  txtContainer.classList.add("txtpopup");
  let text = computer[Math.floor(Math.random() * computer.length)];
  setTimeout(() => {
    typing(text);
  }, 1000);
  setTimeout(() => {
    txtContainer.classList.remove("txtpopup");
    txtContent.textContent = "";
  }, 6000);
}

// typo effect
const typing = function (text, counter = 0) {
  setInterval(() => {
    if (text.length === counter) {
      return;
    }
    txtContent.textContent += text[counter];
    counter++;
  }, 70);
};

// end btn
const btnEndgame = document.getElementById("btn-endgame");

btnEndgame.addEventListener("click", () => {
  document.getElementById("confirmDialog").style.display = "block";
});

// confirm
document.getElementById("confirmYes").addEventListener("click", () => {
  document.getElementById("confirmDialog").style.display = "none";
  window.location.reload("true");
});

document.getElementById("confirmNo").addEventListener("click", () => {
  document.getElementById("confirmDialog").style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === document.getElementById("confirmDialog")) {
    document.getElementById("confirmDialog").style.display = "none";
  }
});

const btngoHome = document.getElementById("btn-gohome");

btngoHome.addEventListener("click", () => {
  window.location.reload("true");
});

const turnbar = document.getElementById("turnbar");
const turnbarImgPlayer = document.getElementById("turnbar-img-player");
const turnbarImgCom = document.getElementById("turnbar-img-com");
turnbarImgCom.style.visibility = "hidden";

// to show current turn
function currentTurnShowing(currentTurn) {
  turnbarImgPlayer.style.visibility = "hidden";
  turnbarImgCom.style.visibility = "hidden";

  if (currentTurn == "player") {
    setTimeout(() => {
      turnbarImgPlayer.style.visibility = "visible";
    }, 500);
  } else {
    setTimeout(() => {
      turnbarImgCom.style.visibility = "visible";
    }, 500);
  }
}