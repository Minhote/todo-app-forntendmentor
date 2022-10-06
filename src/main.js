// Variables
let ul = document.querySelector(".app__box__list");
let input = document.querySelector(".app__bar__input");
let toggle = document.querySelector(".app__header__toggle");
let icon = document.querySelector(".app__header__toggle > i");
let body = document.querySelector("body");

// Fill the list
function emtptyOrNot() {
  if (ul.innerText == "") {
    ul.innerText = "Empty List";
    ul.style.alignItems = "center";
  } else if (ul.innerText == "Empty List") {
    ul.innerText = "";
  }
}

emtptyOrNot();

//Create todos
input.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && e.target.value != "") {
    emtptyOrNot();
    ul.insertAdjacentHTML(
      "beforeend",
      `
    <li class="app__box__list__item">
      <div class="app__box__list__item__wrap">
        <span class="app__box__list__item__wrap__icon"><img class="app__box__list__item__wrap__icon__check" src="./images/icon-check.svg"></span>
      </div> 
      <p class="app__box__list__item__task">${e.target.value}</p>
      <div class="app__box__list__item__delete">
        <img class="app__box__list__item__delete" src="./images/icon-cross.svg">
      </div>
    </li>
  `
    );
    e.target.value = "";
  }
});

// Theme Switcher
toggle.addEventListener("click", () => {
  body.classList.toggle("theme--dark");
  if (icon.classList.contains("fa-moon")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

// Check or Uncheck
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("app__box__list__item__wrap__icon")) {
    e.target.classList.toggle("checked");
  } else if (
    e.target.classList.contains("app__box__list__item__wrap__icon__check")
  ) {
    e.target.parentElement.classList.toggle("checked");
  }
});
