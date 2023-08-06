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

  _renderList(profilerList, chart, dateValue) {
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
        check.type = "radio";
        check.id = item.id;
        check.checked = item.checked;
        taskIn.appendChild(check);

        check.addEventListener("change", () => {
          item.checked = !item.checked;

          let totalTasks = this._constructNewTotalTasks(item);

          Storage.tasksAchieveIn(totalTasks);

          profilerList._listTasks = Storage.getTasks();

          profilerList._render();
          chart._renderChart();
          this._renderList(
            profilerList,
            chart,
            moment(item.date).format("MMM D")
          );
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

        button.addEventListener("click", () => {
          const typeAction = "remove";
          console.log("total", item.id);
          this._profiler._removeTasks(item.id);

          chart._updateTotalItems(item.priority, typeAction);
          this._renderList(
            this._profiler._listTasks,
            this._chart,
            moment(item.date).format("MMM D")
          );
        });

        if (!item.checked) {
          this._pendingList.appendChild(taskIn);
        } else {
          this._completedList.appendChild(taskIn);
        }
      }

      this._noTasks();
    });
  }

  _noTasks() {
    if (this._pendingList.innerHTML === "")
      this._pendingList.innerHTML = `<li class="empty_list">0 Pending Tasks</li>`;

    if (this._completedList.innerHTML === "")
      this._completedList.innerHTML = `<li class="empty_list">0 Completed Tasks</li>`;
  }

  _constructNewTotalTasks(item) {
    let newPendingTasks;
    let newCompletedTasks;

    if (!item.checked) {
      newPendingTasks = this._profiler._pendingTasks.push(item);

      newCompletedTasks = this._profiler._completedTasks.filter(
        (task) => task.id !== item.id
      );
    } else {
      newPendingTasks = this._profiler._pendingTasks.filter(
        (task) => task.id !== item.id
      );
      newCompletedTasks = this._profiler._completedTasks.push(item);
    }

    let totalTasks = newPendingTasks.concat(newCompletedTasks);

    return totalTasks;
  }
}

export default ListTemplate;
