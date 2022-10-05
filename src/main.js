// Variables
let ul = document.querySelector(".app__box__list");
let input = document.querySelector(".app__bar__input");

// Fill the list
function emtptyOrNot() {
  if (ul.innerText == "") {
    ul.innerText = "Empty List";
    ul.style.alignItems = "center";
  } else if (ul.innerText == "Empty List") {
    ul.innerText = "";
    ul.style.alignItems = "start";
  }
}

emtptyOrNot();

input.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && e.target.value != "") {
    emtptyOrNot();
    ul.insertAdjacentHTML(
      "beforeend",
      `
    <li class="app__box__list__item">
      <div class="app__box__list__item__wrap">
        <span class="app__box__list__item__wrap__icon"></span>
      </div> 
      <p class="app__box__list__item__task">${e.target.value}</p>
    </li>
  `
    );
    e.target.value = "";
  }
});
