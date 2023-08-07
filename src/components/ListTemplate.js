import TaskProfiler from "./TaskProfiler";
import PriorityChart from "./PriorityChart";
import Storage from "../Storage";
import moment from "moment";

class ListTemplate {
  constructor() {
    this._profiler = new TaskProfiler();
    this._chart = new PriorityChart();
    this._pendingList = document.getElementById("tasks_day_pending");
    this._completedList = document.getElementById("tasks_day_completed");
  }

  _clear() {
    this._pendingList.innerHTML = "";
    this._completedList.innerHTML = "";
  }

  _renderList(profiler, chart, dateValue) {
    const profilerList = profiler._listTasks;

    this._clear();

    profilerList.map((item, index) => {
      const itemDate = moment(item.date).format("MMM D");

      if (itemDate === dateValue) {
        const taskIn = document.createElement("li");
        taskIn.id = item.id;
        taskIn.setAttribute("data-priority", item.priority);
        taskIn.className = `task_match_content ${
          taskIn.checked ? "done" : ""
        } `;

        //adding checkbox
        const check = document.createElement("input");
        check.className = "circle_match";
        check.type = "checkbox";
        check.id = item.id;
        check.checked = item.checked;
        taskIn.appendChild(check);

        check.addEventListener("change", () => {
          item.checked = !item.checked;

          console.log("profilerList", profilerList);

          Storage.tasksAchieveIn(profilerList);

          profiler._render();
          chart._renderChart();
          this._renderList(profiler, chart, moment(item.date).format("MMM D"));
          this._noTasks();
        });

        // adding label
        const label = document.createElement("label");
        label.className = "title_item";
        label.htmlFor = item.id;
        label.innerText = item.title;

        taskIn.appendChild(label);

        // adding delete button
        const button = document.createElement("button");

        button.className = "remove_task";
        button.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        button.style.zIndex = "3";
        taskIn.appendChild(button);

        button.addEventListener("click", (e) => {
          e.preventDefault();
          const typeAction = "remove";
          console.log("total", item.id);

          this._chart._updateTotalItems(item.priority, typeAction);

          this._profiler._removeTasks(item.id);
          this._profiler._listTasks = Storage.getTasks();
          this._profiler._render();

          chart._renderChart();
          this._renderList(
            this._profiler,
            this._chart,
            moment(item.date).format("MMM D")
          );

          /* this._renderList(profiler, chart, moment(item.date).format("MMM D"));
          this._noTasks(); */
        });

        if (!item.checked) {
          this._pendingList.appendChild(taskIn);
        } else {
          this._completedList.appendChild(taskIn);
        }
      }
    });
    this._noTasks();
  }

  _noTasks() {
    if (this._pendingList.innerHTML === "")
      this._pendingList.innerHTML = `<li class="empty_list">0 Pending Tasks</li>`;

    if (this._completedList.innerHTML === "")
      this._completedList.innerHTML = `<li class="empty_list">0 Completed Tasks</li>`;
  }
}

export default ListTemplate;
