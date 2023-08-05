import "@fortawesome/fontawesome-free/js/all.js";
/* import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands"; */
import DateSettings from "./components/DateSettings";
import TaskProfiler from "./components/TaskProfiler";
import ListTemplate from "./components/ListTemplate";
import Storage from "./Storage";
import moment from "moment";
import "./css/bootstrap.css";
import "./css/style.css";

class App {
  constructor() {
    this._dateTemplate = new DateSettings();
    this._profiler = new TaskProfiler();
    this._template = new ListTemplate();
    this._dateInput = document.getElementById("date_input");
    this._currentDateCard = document.querySelector(".active_day");
    this._setDateRange();

    /* this.ClearStorage = Storage.clearAll(); */

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

    document
      .getElementById("tasks_day_pending")
      .addEventListener("click", this._removeItem.bind(this, "pendingList"));

    document
      .getElementById("tasks_day_completed")
      .addEventListener("click", this._removeItem.bind(this, "completedList"));
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
    /*  const wholeWeek = Array.from(document.querySelectorAll(".day"));
    console.log(e.target);

    if (e.target.classList.contains("active_day")) {
      return;
    } else {
      wholeWeek.map((item, index) => {
        item.classList.remove("active_day");
      });
    } */

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

    /* console.log("current see date", this._currentDateCard); */

    /* const pendingDayTask = this._pendingDayTask();

    const completedDayTask = this._completedDayTask(); */

    /* this._graphList(pendingDayTask, completedDayTask); */
  }

  _setDateRange() {
    this._dateTemplate._setDateInput(this._dateInput);
  }

  _addItem(e) {
    e.preventDefault();
    const modalTasks = document.getElementById("modalTasks_container");
    const title = document.getElementById("task_in").value.trim();
    const date = document.getElementById("date_input").valueAsDate;
    const priorityGame = Array.from(document.querySelectorAll(".circ_prior"));
    let priority;

    const thisTask = priorityGame.find((item) =>
      item.classList.contains("active_priority")
    );
    const dateValue = moment(date).format("MMM D");

    priority = thisTask.getAttribute("data-priority");

    this._profiler._addTasks(title, date, priority);

    modalTasks.style.display = "none";

    const pendingDayTask = this._pendingDayTask(dateValue);

    const completedDayTask = this._completedDayTask(dateValue);

    this._template._renderPendingListAfterRemove(pendingDayTask);

    this._template._renderCompletedListAfterRemove(completedDayTask);

    /* this._graphList(pendingDayTask, completedDayTask, type); */
  }

  _removeItem(e, type) {
    console.log("remove", e.target.closest(".task_match_content"));

    if (
      e.target.classList.contains("fa-xmark") ||
      e.target.getAttribute("fill") === "currentColor"
    ) {
      const divElement = e.target.closest(".task_match_content");

      /* const itemTask = this._profiler._listTasks.find(
        (task) => task.id === divElement.getAttribute("id")
      ); */

      const id = divElement.getAttribute("id");

      if (id !== "") {
        console.log("removedId :", id);
        this._profiler._removeTasks(id);
      } else {
        console.log("Id Element target Not Found");
      }

      /*    const dateValue = divElement.getAttribute("data-value"); */

      const pendingDayTask = this._pendingDayTask();
      const completedDayTask = this._completedDayTask();

      if (type === "pendingList") {
        this._template._renderPendingListAfterRemove(pendingDayTask);
      } else {
        this._template._renderCompletedListAfterRemove(completedDayTask);
      }
    }
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

  /* _graphList(pendingDayTask, completedDaytask, type) {
    console.log("total Tasks :", Storage.getTasks());

    console.log("pendingTasks :", pendingDayTask);
    console.log("completedTasks", completedDaytask);

    if (type === "addInUI") {
      this._pendingDayUI(pendingDayTask);

      this._completedDayUI(completedDaytask, type);
    } else {
      const tasksUI = Array.from(
        document.querySelectorAll(".task_match_content")
      );

      const taskUIRemove = tasksUI.findIndex(
        (task) => task.getAttribute("id") === type
      );

      tasksUI.splice(taskUIRemove, 1);
    }
  } */

  /*  _activeDay() {
    const wholeWeek = Array.from(document.querySelectorAll(".day"));

    const activeDay = wholeWeek.find((day) =>
      day.classList.contains("active_day")
    );

    return activeDay;
  } */

  _pendingDayTask(dateValue) {
    /* const activeDay = this._activeDay(); */

    const pendingDayTask = this._profiler._pendingTasks.filter(
      (task) => moment(task.date).format("MMM D") === dateValue
    );
    console.log("cuurent date card", this._currentDateCard);
    return pendingDayTask;
  }

  _completedDayTask(dateValue) {
    /* const activeDay = this._activeDay(); */

    const completedDaytask = this._profiler._completedTasks.filter(
      (task) => moment(task.date).format("MMM D") === dateValue
    );

    return completedDaytask;
  }
}

const app = new App();
