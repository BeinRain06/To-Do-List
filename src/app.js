import "@fortawesome/fontawesome-free/js/all.js";
/* import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands"; */
import DateSettings from "./components/DateSettings";
import TaskProfiler from "./components/TaskProfiler";
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
    console.log(wholeWeek);

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
    e.target.parentElement.classList.add("active_day");

    this._graphList(e.target.parentElement);
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

  _graphList(activeDay) {
    const pendingDayTask = [];
    const completedDaytask = [];
    
      this._profiler._pendingTasks.map((task) => pendingDayTask.push(task));

      this._profiler._completedTasks.map((task) => completedDaytask.push(task));

    const pendingList =
      pendingDayTask !== []
        ? pendingDayTask.filter((task) => task.dateDay === activeDay.dateDay)
        : [];

    console.log(pendingList);

    const completedList =
      completedDaytask !== []
        ? completedDaytask.filter((task) => task.dateDay === activeDay.dateDay)
        : [];

    this._pendingDayUI(pendingList);

    this._completedDayUI(completedList);
  }

  _pendingDayUI(pendingList) {
    const dayPendingBox = document.getElementById("tasks_day_pending");

    if (pendingList.length !== 0) {
      pendingList.map((element, index) => {
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

        dayPendingBox.appendChild(taskCard);
      });
    } else {
      dayPendingBox.innerHTML = `<p class="no_tasks flex_row_center"><span>0</span> Pending Tasks</p>`;
    }
  }

  _completedDayUI(completedList) {
    const dayCompletedBox = document.getElementById("tasks_day_completed");

    if (completedList.length !== 0) {
      completedList.map((element, index) => {
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
}

const app = new App();
