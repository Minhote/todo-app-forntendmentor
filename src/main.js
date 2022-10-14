// Variables
let ul = document.querySelector(".app__box__list");
let input = document.querySelector(".app__bar__input");
let toggle = document.querySelector(".app__header__toggle");
let icon = document.querySelector(".app__header__toggle > i");
let body = document.querySelector("body");
let tasksLeft = document.querySelector(".app__box__description__left > span");
let stateBox = document.querySelector(".app__box__description__states");
let clear = document.querySelector(".app__box__description__clear");
let numberTask = Number(window.localStorage.getItem("idTask")) || 0;
let localTasks = Object.entries(window.localStorage) || [];
let theme = window.localStorage.getItem("theme") || "light";
console.log(localTasks, numberTask, theme);

// Load the theme
if (theme == "light") {
  body.classList.remove("theme--dark");
  icon.classList.remove("fa-sun");
  icon.classList.add("fa-moon");
} else {
  body.classList.add("theme--dark");
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

// Fill the list
function emtptyOrNot() {
  if (ul.innerText == "") {
    ul.innerText = "Empty List";
    ul.style.alignItems = "center";
  } else if (ul.innerText == "Empty List") {
    ul.innerText = "";
  }
}

// Check how taks left
function howTaksLeft() {
  let number = 0;
  for (let li of [...ul.children]) {
    li.classList.contains("checked") ? (number += 1) : (number += 0);
  }
  tasksLeft.innerText = parseInt(ul.children.length - number);
}

let order = [];
if (localTasks.length > 0) {
  // Hacer macth con los tasks
  localTasks.map((el) => {
    if (el[0].match(/(task-\d)/g) != null) {
      let newStr = el[0].replace(/(task-)/g, "");
      order.push([newStr, el]);
    }
  });
  order
    .sort((a, b) => {
      return Number(a[0]) - Number(b[0]);
    })
    .map((el) => {
      if (JSON.parse(el[1][1]).checked == "false") {
        ul.insertAdjacentHTML(
          "beforeend",
          `
           <li class="app__box__list__item" data-key=${el[0]}>
             <div class="app__box__list__item__wrap">
               <span class="app__box__list__item__wrap__icon"><img class="app__box__list__item__wrap__icon__check" src="./images/icon-check.svg"></span>
                </div>
                <p class="app__box__list__item__task">${
                  JSON.parse(el[1][1]).task
                }</p>
                <div class="app__box__list__item__delete">
                  <img class="app__box__list__item__delete__cross" src="./images/icon-cross.svg">
                </div>
              </li>
            `
        );
      } else {
        ul.insertAdjacentHTML(
          "beforeend",
          `
           <li class="app__box__list__item checked" data-key=${el[0]}>
             <div class="app__box__list__item__wrap">
               <span class="app__box__list__item__wrap__icon checked"><img class="app__box__list__item__wrap__icon__check" src="./images/icon-check.svg"></span>
                </div>
                <p class="app__box__list__item__task checked">${
                  JSON.parse(el[1][1]).task
                }</p>
                <div class="app__box__list__item__delete">
                  <img class="app__box__list__item__delete__cross" src="./images/icon-cross.svg">
                </div>
              </li>
            `
        );
      }
    });
  howTaksLeft();
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

    // Guardar el ultimo id task
    window.localStorage.setItem("idTask", String(numberTask));

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

  // Set theme in local Storage
  if (body.classList.contains("theme--dark")) {
    window.localStorage.setItem("theme", "dark");
  } else {
    window.localStorage.setItem("theme", "light");
  }
});

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

      // Reboot the idtaks if is nessesary
      if ([...ul.children].length == 0)
        window.localStorage.removeItem("idTask");
      numberTask = 0;

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

  // Remove items completed of localstorage
  Object.entries(JSON.parse(JSON.stringify(window.localStorage)))
    .filter((el) => el[1].match(/[{}]/) != null)
    .map((el) => {
      if (JSON.parse(el[1]).checked == "true") {
        window.localStorage.removeItem(el[0]);
      }
    });

  // Reboot the idtaks if is nessesary
  if ([...ul.children].length == 0) window.localStorage.removeItem("idTask");
  numberTask = 0;
});
