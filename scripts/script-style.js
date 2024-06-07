const btns = document.querySelectorAll(".btn-blue");
const btnStart = document.getElementById("btn-start");
const pgStart = document.getElementById("page-start");
const pgRegister = document.getElementById("page-register");

// btn hover
btns.forEach((btn) => {
  btn.addEventListener("mouseenter", (e) => {
    e.target.classList.add("hover");
    btn.addEventListener("mouseleave", (e) => {
      e.target.classList.remove("hover");
    });
  });
});

// Page Start to Register
btnStart.addEventListener("click", () => {
  pgStart.classList.add("fade-out");
  pgRegister.classList.remove("offscreen");

  setTimeout(() => {
    pgStart.classList.add("offscreen");
    pgRegister.classList.add("fade-in");
    pgRegister.classList.remove("fade-out");
  }, 800);
});
