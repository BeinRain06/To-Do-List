import "@fortawesome/fontawesome-free/js/all.js";
/* import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands"; */
import DateSettings from "./components/DateSettings";
import TaskProfiler from "./components/TaskProfiler";
import ListTemplate from "./components/ListTemplate";
import PriorityChart from "./components/PriorityChart";
import Storage from "./Storage";
import moment from "moment";
import "./css/bootstrap.css";
import "./css/style.css";

class App {
  constructor() {
    this._dateTemplate = new DateSettings();
    this._profiler = new TaskProfiler();
    this._template = new ListTemplate();
    this._chart = new PriorityChart();
    this._dateInput = document.getElementById("date_input");
    this._currentDateCard = document.querySelector(".active_day");
    this._setDateRange();

    /*  this.ClearStorage = Storage.clearAll(); */

    document
      .getElementById("light")
      .addEventListener("click", this._changeTheme.bind(this, "light"));

    document
      .getElementById("dark")
      .addEventListener("click", this._changeTheme.bind(this, "dark"));

    document.getElementById("view_app").addEventListener("click", (e) => {
      console.log(e.target);
      const dateInput = document.getElementById("date_input");
      console.log(dateInput.getAttribute("min"));
    });

    document
      .getElementById("calendar_container")
      .addEventListener("click", this._scheduleDay.bind(this));

    document
      .getElementById("wrapper_priority")
      .addEventListener("click", this._priorityGame.bind(this));

    document
      .getElementById("add_task")
      .addEventListener("click", this._showModalTask.bind(this, "add"));

    document
      .getElementById("btn_cancel")
      .addEventListener("click", this._showModalTask.bind(this, "remove"));

    document
      .getElementById("btn_submit")
      .addEventListener("click", this._addItem.bind(this));
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
    console.log(e.currentTarget);
    const modalTasks = document.getElementById("modalTasks_container");

    matter === "add"
      ? (modalTasks.style.display = "block")
      : (modalTasks.style.display = "none");
  }

  _scheduleDay(e) {
    const taskDay = e.target;

    console.log("total Tasks", this._profiler._listTasks);

    const selectedDate = taskDay.getAttribute("data-value");

    console.log("selected Date", selectedDate);

    let temporaryDateCard = document.querySelector(
      `.day[data-value="${selectedDate}"]`
    );

    this._currentDateCard.classList.remove("active_day");

    temporaryDateCard.classList.add("active_day");

    this._currentDateCard = temporaryDateCard;

    this._template._clear();

    this._template._renderList(this._profiler, this._chart, selectedDate);
  }

  _setDateRange() {
    this._dateTemplate._setDateInput(this._dateInput);
  }

  _addItem(e) {
    e.preventDefault();

    const modalTasks = document.getElementById("modalTasks_container");

    const taskTitle = document.getElementById("task_in").value.trim();

    const taskDate = document.getElementById("date_input").value;
    const priorityGame = Array.from(document.querySelectorAll(".circ_prior"));
    let priority;

    const thisTask = priorityGame.find((item) =>
      item.classList.contains("active_priority")
    );

    priority = thisTask.getAttribute("data-priority");

    /* highlight selected date */
    const selectedDate = moment(taskDate).format("MMM D");
    console.log("task Date", taskDate);
    console.log("selected Date", selectedDate);

    let temporaryDateCard = document.querySelector(
      `.day[data-value="${selectedDate}"]`
    );

    this._currentDateCard.classList.remove("active_day");

    temporaryDateCard.classList.add("active_day");

    this._currentDateCard = temporaryDateCard;

    /*trigger some update*/
    this._profiler._addTasks(taskTitle, taskDate, priority);

    this._template._renderList(
      this._profiler,
      this._chart,
      moment(taskDate).format("MMM D")
    );

    this._chart._updateTotalItems(priority, "add");

    /* this._chart._updateTotalItems(); */

    modalTasks.style.display = "none";
  }

  _priorityGame(e) {
    const priorityList = Array.from(document.querySelectorAll(".circ_prior"));

    console.log(e.target.parentElement);

    if (
      e.target.parentElement.classList.contains("active_priority") ||
      e.target.classList.contains("active_priority")
    ) {
      return;
    } else {
      priorityList.map((item, index) => {
        item.classList.remove("active_priority");
      });
    }
    e.target.parentElement.classList.add("active_priority");
  }
}

const app = new App();
