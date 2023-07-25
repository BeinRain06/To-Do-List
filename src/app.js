import "@fortawesome/fontawesome-free/js/all.js";
/* import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands"; */

import "./css/bootstrap.css";
import "./css/style.css";

const btnLightMode = document.getElementById("light");

const btnDarkMode = document.getElementById("dark");

const theme = document.getElementById("light_dark");

btnLightMode.addEventListener("click", (e) => {
  e.preventDefault();
  btnDarkMode.classList.remove("current_mode");
  e.target.classList.add("current_mode");
  theme.setAttribute("data-color", "0");
});

btnDarkMode.addEventListener("click", (e) => {
  e.preventDefault();
  btnLightMode.classList.remove("current_mode");
  e.target.classList.add("current_mode");
  theme.setAttribute("data-color", "1");
});
