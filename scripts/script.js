const cards = document.querySelectorAll(".card");
const cardsFront = document.querySelectorAll(".front");
const cardsBack = document.querySelectorAll(".back");

cardsFront.forEach((card, index) => {
  // give an id
  card.id = index + 1;
  // put img for each card
  const imgPath = Math.round(card.id / 2);
  const img = new Image();
  img.src = `images/0${imgPath}.jpg`;
  card.appendChild(img);
});

// random shuffle
cards.forEach((card) => {
  card.style.order = Math.floor(Math.random() * 100);
});

cardsBack.forEach((card) => {
  card.addEventListener("click", (event) => {
    console.log(event.target);
  });
});
