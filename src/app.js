import "@fortawesome/fontawesome-free/js/all.js";
/* import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands"; */
import DateSettings from "./components/DateSettings";
import TaskProfiler from "./components/TaskProfiler";
import Storage from "./Storage";
import moment from "moment";
import "./css/bootstrap.css";
import "./css/style.css";

class App {
  constructor() {
    this._dateTemplate = new DateSettings();
    this._profiler = new TaskProfiler();
    this._dateInput = document.getElementById("date_input");
    this._setDateRange();

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
      .getElementById("tasks_day_pending")
      .addEventListener("click", this._removeItem.bind(this));

    document
      .getElementById("tasks_day_completed")
      .addEventListener("click", this._removeItem.bind(this));

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
    const wholeWeek = Array.from(document.querySelectorAll(".day"));
    console.log(e.target);

    if (
      e.target.classList.contains("active_day") ||
      e.target.parentElement.classList.contains("active_day")
    ) {
      return;
    } else {
      wholeWeek.map((item, index) => {
        item.classList.remove("active_day");
      });
    }

    e.target.classList.add("active_day");

    const pendingDayTask = this._pendingDayTask();

    const completedDayTask = this._completedDayTask();

    this._graphList(pendingDayTask, completedDayTask);
  }

  _setDateRange() {
    this._dateTemplate._setDateInput(this._dateInput);
  }

  _addItem(e) {
    e.preventDefault();
    const modalTasks = document.getElementById("modalTasks_container");
    const title = document.getElementById("task_in").value;
    const date = document.getElementById("date_input").valueAsDate;
    const priorityGame = Array.from(document.querySelectorAll(".circ_prior"));
    let priority;
    const thisTask = priorityGame.find((item) =>
      item.classList.contains("active_priority")
    );
    priority = thisTask.getAttribute("data-priority");

    this._profiler._addTasks(title, date, priority);

    modalTasks.style.display = "none";
  }

  _removeItem(e) {
    console.log("remove", e.target.closest(".task_match_content"));

    const divElement = e.target.closest(".task_match_content");

    const itemTask = this._profiler._listTasks.find(
      (task) => task.id === divElement.getAttribute("id")
    );

    const id = itemTask.id;

    if (id !== undefined) {
      console.log(id);
      this._profiler._removeTasks(id);
    } else {
      console.log("Id Element target Not Found");
    }

    const pendingDayTask = this._pendingDayTask();

    const completedDayTask = this._completedDayTask();

    this._graphList(pendingDayTask, completedDayTask);

    const wholeUITasks = Array.from(
      document.querySelectorAll(".task_match_content")
    );

    wholeUITasks.map((task) => {
      if (task.getAttribute("id") === id) {
        task.remove();
      } else {
        console.log(task);
      }
    });

    /*  this._pendingDayUI(pendingDayTask);

    this._completedDayUI(completedDaytask); */
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

  _graphList(pendingDayTask, completedDaytask) {
    console.log("total Tasks :", Storage.getTasks());

    /* const activeDay = this._activeDay(); */

    /*   const pendingDayTask = this._profiler._pendingTasks.filter(
      (task) => task.dateDay === activeDay.getAttribute("data-value")
    );

    const completedDaytask = this._profiler._completedTasks.filter(
      (task) => task.dateDay === activeDay.getAttribute("data-value")
    ); */

    console.log("pendingTasks :", pendingDayTask);
    console.log("completedTasks", completedDaytask);

    this._pendingDayUI(pendingDayTask);

    this._completedDayUI(completedDaytask);
  }

  _pendingDayUI(pendingDayTask) {
    const dayPendingBox = document.getElementById("tasks_day_pending");

    if (pendingDayTask.length !== 0) {
      pendingDayTask.map((element, index) => {
        const taskCard = document.createElement("div");

        taskCard.setAttribute("id", element.id);
        taskCard.setAttribute("data-priority", element.priority);
        taskCard.className = "task_match_content";

        taskCard.innerHTML = `<div id="high_match" class="task_match">
                <div class="task_description">
                  <div id="circle_match" class="circle_match"></div>
                  <div class="name_task">${element.title}</div>
                </div>
                <div id="remove_task" class="remove_task">
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>`;

        dayPendingBox.innerHTML = "";

        dayPendingBox.appendChild(taskCard);
      });
    } else {
      dayPendingBox.innerHTML = `<p class="no_tasks flex_row_center"><span>0</span> Pending Tasks</p>`;
    }
  }

  _completedDayUI(completedDaytask) {
    const dayCompletedBox = document.getElementById("tasks_day_completed");

    if (completedDaytask.length !== 0) {
      completedDaytask.map((element, index) => {
        const taskCard = document.createElement("div");

        taskCard.setAttribute("id", element.id);
        taskCard.setAttribute("data-priority", element.priority);
        taskCard.className = "task_match_content";

        taskCard.innerHTML = `<div id="high_match" class="task_match">
                <div class="task_description">
                  <div id="circle_match" class="circle_match"></div>
                  <div class="name_task">${element.title}</div>
                </div>
                <div id="remove_task" class="remove_task">
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>`;

        dayCompletedBox.appendChild(taskCard);
      });
    } else {
      dayCompletedBox.innerHTML = `<p class="no_tasks flex_row_center"><span>0</span> Completed Tasks</p>`;
    }
  }

  _activeDay() {
    const wholeWeek = Array.from(document.querySelectorAll(".day"));

    const activeDay = wholeWeek.find((day) =>
      day.classList.contains("active_day")
    );

    return activeDay;
  }

  _pendingDayTask() {
    const activeDay = this._activeDay();

    const pendingDayTask = this._profiler._pendingTasks.filter(
      (task) => task.dateDay === activeDay.getAttribute("data-value")
    );

    return pendingDayTask;
  }

  _completedDayTask() {
    const activeDay = this._activeDay();

    const completedDaytask = this._profiler._completedTasks.filter(
      (task) => task.dateDay === activeDay.getAttribute("data-value")
    );

    return completedDaytask;
  }
}

const app = new App();
