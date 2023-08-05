import TaskProfiler from "./TaskProfiler";

class ListTemplate {
  constructor() {
    this._profiler = new TaskProfiler();
    this._pendingList = document.getElementById("tasks_day_pending");
    this._completedList = document.getElementById("tasks_day_completed");
    this._pendingDayTasks = [];
    this._completedDayTasks = [];
    this._render();
  }

  _clear() {
    this._pendingList.innerHTML = "";
    this._completedList.innerHTML = "";
  }

  _pendingDayUI(pendingDayTask) {
    console.log("pending Day Task", pendingDayTask);
    const pendinglist = document.getElementById("tasks_day_pending");

    if (pendingDayTask.length !== 0) {
      /* if (this._pendingList.querySelector(".no_tasks") !== null) {
        this._pendingList.querySelector(".no_tasks").remove();
      } */

      pendingDayTask.map((element, index) => {
        let taskCard = document.createElement("div");

        let title = element.title + Math.floor(Math.random() * 4);

        taskCard.setAttribute("id", element.id);
        taskCard.setAttribute("data-priority", element.priority);
        taskCard.className = element.classElt;

        taskCard.innerHTML = `<div id="high_match" class="task_match">
                <div class="task_description">
                  <input type="radio" id=${title} class="circle_match">
                  <label for=${title}>${element.title}</label>
                </div>
                <button id="remove_task" class="remove_task">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>`;

        console.log("tascard", taskCard);

        this._pendingList.appendChild(taskCard);
        /* pendinglist.append(taskCard); */
      });
      console.log("pendingList", pendinglist);
    } else {
      this._pendingList.innerHTML = `            <p class="no_tasks flex_row_center">
              <span>0</span> Pending Tasks
            </p>`;
    }
  }

  _completedDayUI(completedDaytask) {
    if (completedDaytask.length !== 0) {
      /* if (this._completedList.querySelector(".no_tasks") !== null) {
        this._completedList.querySelector(".no_tasks").remove();
      } */

      completedDaytask.map((element, index) => {
        let taskCard = document.createElement("div");

        let title = element.title + Math.floor(Math.random() * 4);

        taskCard.setAttribute("id", element.id);
        taskCard.setAttribute("data-priority", element.priority);
        taskCard.className = element.classElt;

        taskCard.innerHTML += `<div id="high_match" class="task_match">
                <div class="task_description">
                  <input type="radio" id=${title} class="circle_match" checked>
                  <label for=${title}>${element.title}</label>
                </div>
                <button id="remove_task" class="remove_task">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>`;

        this._completedList.appendChild(taskCard);
      });
    } else {
      this._completedList.innerHTML = `<p class="no_tasks flex_row_center">
              <span>0</span> Completed Tasks
            </p>`;
    }
  }

  _renderPendingListAfterRemove(pendingDayTask) {
    /* this._clear(); */
    this._pendingDayUI(pendingDayTask);
    this._pendingDayTasks = pendingDayTask;
  }

  _renderCompletedListAfterRemove(completedDayTask) {
    /*  this._clear(); */
    this._completedDayUI(completedDayTask);
    this._completedDayTasks = completedDayTask;
  }

  _render() {
    this._renderPendingListAfterRemove(this._pendingDayTasks);
    this._renderCompletedListAfterRemove(this._completedDayTasks);
  }
}

export default ListTemplate;
