import "@fortawesome/fontawesome-free/js/all.js";
/* import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands"; */
import DateSettings from "./components/DateSettings";
import "./css/bootstrap.css";
import "./css/style.css";

class App {
  constructor() {
    this._dateTemplate = new DateSettings();
    this._setDateRange();

    document
      .getElementById("light")
      .addEventListener("click", this._changeTheme.bind(this, "light"));

    document
      .getElementById("dark")
      .addEventListener("click", this._changeTheme.bind(this, "dark"));

    document.getElementById("view_app").addEventListener("click", (e) => {
      console.log(e.target);
    });

    document
      .getElementById("calendar_container")
      .addEventListener("click", this._scheduleDay.bind(this));

    document
      .getElementById("add_task")
      .addEventListener("click", this._showModalTask.bind(this, "add"));

    document
      .getElementById("btn_cancel")
      .addEventListener("click", this._showModalTask.bind(this, "remove"));

    /*  document
      .getElementById("date_input")
      .addEventListener("change", this._setDateRange.bind(this, e)); */
  }

  _changeTheme(type) {
    if (type === "light") {
      document.getElementById("view_app").setAttribute("theme", "light");
    } else {
      document.getElementById("view_app").setAttribute("theme", "dark");
    }
  }

  _showModalTask(matter, e) {
    e.preventDefault();
    const modalTasks = document.getElementById("modalTasks_container");

    matter === "add"
      ? (modalTasks.style.display = "block")
      : (modalTasks.style.display = "none");
  }

  _scheduleDay(e) {
    const wholeWeek = document.querySelectorAll("day");
    const day = wholeWeek.find(
      (item) => item.getAttribute("id") === e.target.id
    );

    wholeWeek.map((item, index) => {
      const day = item.getAttribute("id");
      day === e.target.id
        ? day.classList.add("active_day")
        : day.classList.remove("active_day");
    });
  }

  _target() {
    console.log(this);
  }

  _setDateRange() {
    const dateInput = document.getElementById("date_input");
    this._dateTemplate._setDateInput(dateInput);
  }
}

const app = new App();
