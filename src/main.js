// Variables
let ul = document.querySelector(".app__box__list");
let input = document.querySelector(".app__bar__input");

// Fill the list
if (ul.innerText == "") ul.innerText = "Empty List";

input.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && e.target.value != "") {
    console.log("Crea");
  }
});
