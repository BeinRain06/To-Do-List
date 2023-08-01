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

    document
      .getElementById("list_days_week")
      .addEventListener("click", this._graphList.bind(this));
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

    if (e.target.classList.contains("active_day")) {
      return;
    } else {
      wholeWeek.map((item, index) => {
        item.classList.remove("active_day");
      });
    }
    e.target.classList.add("active_day");
  }

  _setDateRange() {
    this._dateTemplate._setDateInput(this._dateInput);
  }

  _addItem(e) {
    e.preventDefault();
    const title = document.getElementById("task_in").value;
    const date = document.getElementById("date_input").valueAsDate;
    const priorityGame = Array.from(document.querySelectorAll(".circ_prior"));
    let priority;
    const thisTask = priorityGame.find((item) =>
      item.classList.contains("active_priority")
    );
    priority = thisTask.getAttribute("data-priority");

    this._profiler._addTasks(title, date, priority);
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

  _graphList(e) {
    console.log(e.target);
    const dayCompletedBox = document.getElementById("tasks_day_completed");
    const dayPendingBox = document.getElementById("tasks_day_pending");

    const weekDays = Array.from(document.querySelectorAll(".day"));

    const pendingDayTask = [];
    const completedDaytask = [];

    const activeDay = weekDays.find((task) =>
      task.classList.contains("active_day")
    );

    this._profiler._listTasks.map((task, index) => {
      if (task.check === "pending") {
        pendingDayTask.push(task);
      } else {
        completedDaytask.push(task);
      }
    });

    this._profiler._listTasks.map((task, index) => {
      if (task.classList.contains("active_day")) {
        const myPending = pendingDayTask.filter(
          (task) => task.dateDay === activeDay.dateDay
        );

        const myCompleted = completedDaytask.filter(
          (task) => task.dateDay === activeDay.dateDay
        );

        if (myPending !== undefined) {
          myPending.map((element, index) => {
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
        } else if (myPending === undefined) {
          dayPendingBox.innerHTML = `<p class="no_tasks flex_row_center"><span>0</span> Pending Tasks</p>`;
        }

        if (myCompleted !== undefined) {
          myCompleted.map((element, index) => {
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
        } else if (myCompleted === undefined) {
          dayPendingBox.innerHTML = `<p class="no_tasks flex_row_center"><span>0</span> Completed Tasks</p>`;
        }
      }
    });
  }
}

const app = new App();
