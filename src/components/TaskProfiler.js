import Storage from "../Storage";
import moment from "moment";
class TaskProfiler {
  constructor() {
    this._listTasks = Storage.getTasks();
    this._completedTasks = 0;
    this._pendingTasks = 0;
    this._render();
  }

  _addTasks(title, date, priority) {
    const task = {
      id: Math.random().toString(16).slice(2),
      title: title,
      date: date,
      dateDay: moment(date, "YYYY-MM-DD").format("DD"),
      check: "pending",
      priority: priority,
    };
    this._listTasks.push(task);
    Storage.saveTask(task);

    console.log(task.id);

    this._render();
  }

  _updatePendingTasks() {
    const progressPending = document.getElementById("tasks_pending");

    const pendingAccount = this._listTasks.find(
      (item) => item.check === "pending"
    ).length;

    const totalTasks = this._listTasks.length;

    let width = Math.floor((pendingAccount / totalTasks) * 100);

    progressPending.setAttribute("value", `${width}`);

    progressPending.setAttribute("data-count", `${pendingAccount}`);
  }

  _updateCompletedTasks() {
    const progressCompleted = document.getElementById("tasks_completed");

    const completedAccount = this._listTasks.find(
      (item) => item.check === "pending"
    ).length;

    const totalTasks = this._listTasks.length;

    let width = Math.floor((completedAccount / totalTasks) * 100);

    progressCompleted.setAttribute("value", `${width}`);

    progressCompleted.setAttribute("data-count", `${completdeAccount}`);
  }

  _displayTotalTasks() {
    const totalTask = document.getElementById("total_tasks");
    const count_tasks = this._listTasks.length;
    totalTask.innerHTML = `${count_tasks}`;
  }

  _displayPendingTasks() {
    const pendingContent = document.querySelector(
      ".square_arrow .pending_count"
    );

    const pendingAccount = this._listTasks.find(
      (item) => item.check === "pending"
    ).length;

    pendingContent.innerHTML = `${pendingAccount}`;
  }

  _displayCompletedTasks() {
    const completedContent = document.querySelector(
      ".square_arrow .completed_count"
    );

    const completdeAccount = this._listTasks.find(
      (item) => item.check === "completed"
    ).length;

    completedContent.innerHTML = `${completdeAccount}`;
  }

  _render() {
    this._displayTotalTasks();
    this._displayPendingTasks();
    this._displayCompletedTasks();
  }
}
export default TaskProfiler;
