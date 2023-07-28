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
    document
      .getElementById("light")
      .addEventListener("click", this._changeTheme.bind(this, "light"));

    document
      .getElementById("dark")
      .addEventListener("click", this._changeTheme.bind(this, "dark"));

    document.getElementById("to_do_header").addEventListener("click", (e) => {
      console.log(e.target);
    });

    document
      .getElementById("calendar_container")
      .addEventListener("click", this._scheduleDay.bind(this, e));

    document
      .getElementById("add_task")
      .addEventListener("click", this._showModalTask.bind(this, "add"));

    document
      .getElementById("btn_cancel")
      .addEventListener("click", this._showModalTask.bind(this, "remove"));
  }

  _changeTheme(type) {
    if (type === "light") {
      document.getElementById("view_app").setAttribute("theme", "light");
    } else {
      document.getElementById("view_app").setAttribute("theme", "dark");
    }
  }

  _showModalTask(type) {
    const modalTasks = document.getElementById("modalTasks_container");

    type === "add"
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
}

const app = new App();
