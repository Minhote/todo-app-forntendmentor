// Variables
let ul = document.querySelector(".app__box__list");
let input = document.querySelector(".app__bar__input");
let toggle = document.querySelector(".app__header__toggle");
let icon = document.querySelector(".app__header__toggle > i");
let body = document.querySelector("body");
let tasksLeft = document.querySelector(".app__box__description__left > span");
let stateBox = document.querySelector(".app__box__description__states");
let clear = document.querySelector(".app__box__description__clear");

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
        <img class="app__box__list__item__delete__cross" src="./images/icon-cross.svg">
      </div>
    </li>
  `
    );
    e.target.value = "";
    tasksLeft.innerText = parseInt(tasksLeft.innerText) + 1;
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

// Check how taks left

function howTaksLeft() {
  let number = 0;
  for (let li of [...ul.children]) {
    li.classList.contains("checked") ? (number += 1) : (number += 0);
  }
  tasksLeft.innerText = parseInt(ul.children.length - number);
}

// Check or Uncheck
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("app__box__list__item__wrap__icon")) {
    e.target.classList.toggle("checked");
    e.target.parentElement.nextElementSibling.classList.toggle("checked");
    e.target.parentElement.parentElement.classList.toggle("checked");
    howTaksLeft();
  } else if (
    e.target.classList.contains("app__box__list__item__wrap__icon__check")
  ) {
    e.target.parentElement.classList.toggle("checked");
    e.target.parentElement.parentElement.nextElementSibling.classList.toggle(
      "checked"
    );
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      "checked"
    );
    howTaksLeft();
  } else if (
    e.target.classList.contains("app__box__list__item__delete__cross")
  ) {
    ul.removeChild(e.target.parentElement.parentElement);
    howTaksLeft();
    emtptyOrNot();
  }
});

// States events
stateBox.addEventListener("click", (e) => {
  if (ul.innerText == "Empty List") return;
  if (e.target.classList.contains("app__box__description__states__all")) {
    [...ul.children].map((el) => {
      el.style.display = "flex";
    });
    [...stateBox.children].map((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  } else if (
    e.target.classList.contains("app__box__description__states__active")
  ) {
    [...ul.children].map((el) => {
      if (el.classList.contains("checked")) {
        el.style.display = "none";
      } else if (!el.classList.contains("checked")) {
        el.style.display = "flex";
      }
    });
    [...stateBox.children].map((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  } else if (
    e.target.classList.contains("app__box__description__states__completed")
  ) {
    [...ul.children].map((el) => {
      if (!el.classList.contains("checked")) {
        el.style.display = "none";
      } else if (el.classList.contains("checked")) {
        el.style.display = "flex";
      }
    });
    [...stateBox.children].map((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  }
});

//Clear all the tasks completed
clear.addEventListener("click", () => {
  [...ul.children].map((el) => {
    if (el.classList.contains("checked")) {
      ul.removeChild(el);
    }
  });
});
