// Variables
let ul = document.querySelector(".app__box__list");
let input = document.querySelector(".app__bar__input");
let toggle = document.querySelector(".app__header__toggle");
let icon = document.querySelector(".app__header__toggle > i");
let body = document.querySelector("body");
let tasksLeft = document.querySelector(".app__box__description__left > span");
let stateBox = document.querySelector(".app__box__description__states");
let clear = document.querySelector(".app__box__description__clear");
let numberTask = 0;
let localTasks = Object.entries(window.localStorage) || []
console.log(localTasks);

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
    numberTask += 1;
    ul.insertAdjacentHTML(
      "beforeend",
      `
    <li class="app__box__list__item" data-key=${numberTask}>
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

    // Guardar task en local storage
    window.localStorage.setItem(
      `task-${numberTask}`,
      JSON.stringify({ checked: "false", task: `${e.target.value}` })
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

    // Guardar theme en local storage
    window.localStorage.setItem("theme", "light");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");

    // Guardar theme en local storage
    window.localStorage.setItem("theme", "dark");
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
  if (stateBox.children[0].classList.contains("active")) {
    if (e.target.classList.contains("app__box__list__item__wrap__icon")) {
      e.target.classList.toggle("checked");
      e.target.parentElement.nextElementSibling.classList.toggle("checked");
      e.target.parentElement.parentElement.classList.toggle("checked");

      // Reload in Localstorage
      window.localStorage.setItem(
        `task-${e.target.parentElement.parentElement.dataset.key}`,
        JSON.stringify({
          checked: `${e.target.parentElement.parentElement.classList.contains(
            "checked"
          )}`,
          task: `${e.target.parentElement.parentElement.innerText}`,
        })
      );

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

      // Reload in Localstorage
      window.localStorage.setItem(
        `task-${e.target.parentElement.parentElement.parentElement.dataset.key}`,
        JSON.stringify({
          checked: `${e.target.parentElement.parentElement.parentElement.classList.contains(
            "checked"
          )}`,
          task: `${e.target.parentElement.parentElement.parentElement.innerText}`,
        })
      );

      howTaksLeft();
    } else if (
      e.target.classList.contains("app__box__list__item__delete__cross")
    ) {
      ul.removeChild(e.target.parentElement.parentElement);

      // Reload in Localstorage
      window.localStorage.removeItem(
        `task-${e.target.parentElement.parentElement.dataset.key}`
      );

      howTaksLeft();
      emtptyOrNot();
    }
  }
});

// States events
stateBox.addEventListener("click", (e) => {
  if (ul.innerText == "Empty List") return;
  if (e.target.classList.contains("app__box__description__states__all")) {
    [...ul.children].map((el) => {
      el.style.display = "flex";
      if (el.classList.contains("app__box__list__item__msg")) {
        ul.removeChild(el);
      }

      el.lastElementChild.classList.remove("selected");
    });
    [...stateBox.children].map((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  } else if (
    e.target.classList.contains("app__box__description__states__active")
  ) {
    [...ul.children].map((el) => {
      if (el.classList.contains("app__box__list__item__msg")) {
        ul.removeChild(el);
      }

      if (el.classList.contains("checked")) {
        el.style.display = "none";
      } else if (!el.classList.contains("checked")) {
        el.style.display = "flex";
      }

      el.lastElementChild.classList.add("selected");
    });

    [...stateBox.children].map((el) => {
      el.classList.remove("active");
    });

    e.target.classList.add("active");

    if ([...ul.children].every((el) => el.style.display == "none")) {
      let node = `
      <li class="app__box__list__item__msg">
        <p class="app__box__list__item__msg-active">You do not have any task pending</p>
      </li>
      `;
      ul.insertAdjacentHTML("beforeend", node);
    }
  } else if (
    e.target.classList.contains("app__box__description__states__completed")
  ) {
    [...ul.children].map((el) => {
      if (el.classList.contains("app__box__list__item__msg")) {
        ul.removeChild(el);
      }

      if (!el.classList.contains("checked")) {
        el.style.display = "none";
      } else if (el.classList.contains("checked")) {
        el.style.display = "flex";
      }

      el.lastElementChild.classList.add("selected");
    });

    [...stateBox.children].map((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");

    if ([...ul.children].every((el) => el.style.display == "none")) {
      let node = `
      <li class="app__box__list__item__msg">
        <p class="app__box__list__item__msg-completed">You do not have any task completed</p>
      </li>
      `;
      ul.insertAdjacentHTML("beforeend", node);
    }
  }
});

//Clear all the tasks completed
clear.addEventListener("click", () => {
  [...stateBox.children].map((el) => el.classList.remove("active"));
  stateBox.children[0].classList.add("active");

  [...ul.children].map((el) => {
    if (el.classList.contains("app__box__list__item__msg")) {
      ul.removeChild(el);
    }

    if (el.classList.contains("checked")) {
      ul.removeChild(el);
    }

    if (!el.classList.contains("checked")) {
      el.style.display = "flex";
    }
  });

  if (ul.innerText == "") {
    emtptyOrNot();
  }

  // Check if exist any taks completed to errase
  if (
    Object.values(JSON.parse(JSON.stringify(window.localStorage)))
      .map((el) => {
        return JSON.parse(el);
      })
      .some((e) => e.checked == "true")
  ) {
    // Delete the tasks completed
    for (let i = 0; i <= window.localStorage.length; i++) {
      if (
        JSON.parse(window.localStorage.getItem(`task-${i + 1}`)).checked ==
        "true"
      ) {
        window.localStorage.removeItem(`task-${i + 1}`);
      }
    }
  }
});

//window.localStorage.clear();
