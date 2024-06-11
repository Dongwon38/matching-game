"use strict";

const btns = document.querySelectorAll(".btn-blue");
const btnStart = document.getElementById("btn-start");
const pgStart = document.getElementById("page-start");
const pgRegister = document.getElementById("page-register");
const pgInGame = document.getElementById("page-in-game");
const btnLists = document.querySelectorAll("header li");

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
let difficulty = "";

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
    "master"
  ) {
    difficulty = "master";
  } else {
    difficulty = "doctorate";
  }

  cards.forEach((card, index) => {
    const cardfront = card.querySelector(".front");
    card.id = index + 1;
    const imgPath = Math.round(card.id / 2);
    const img = new Image();
    if (difficulty == "master") {
      console.log("yes");
      img.src = `images/img-1/0${imgPath}.png`;
    } else {
      console.log("no");
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
  "If you lose, You will get ZERO!",
  "shift! shift! shift! shift!",
  "If you beat me, I'll give you an extension.",
  "It is what it is",
  "What the hack!",
  "Don't ask me why",
];

const txtRandy = [
  "Bang on!",
  "Sweeeeet.",
  "Buckle up! Next one is a little bit spicy.",
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
  if (confirm("Are you sure?")) {
    window.location.reload("true");
  } else {
  }
});
