import Storage from "../Storage";
import moment from "moment";
class TaskProfiler {
  constructor() {
    this._listTasks = Storage.getTasks();
    this._completedTasks = Storage.saveCompleted();
    this._pendingTasks = Storage.savePending();

    this._render();
  }

  _addTasks(title, date, priority) {
    const task = {
      id: Math.random().toString(16).slice(2),
      title: title,
      date: date,
      dateDay: moment(date, "YYYY-MM-DD").add(1, "days").format("MMM D"),
      classElt: "task_match_content",
      check: "pending",
      priority: priority,
    };

    this._listTasks.push(task);

    Storage.saveTask(task);

    this._pendingTasks = Storage.savePending();

    /* this._completedTasks = Storage.saveCompleted(); */

    console.log(task.id);

    this._render();
  }

  _removeTasks(id) {
    const updateTotalTasks = this._listTasks.filter((task) => task.id !== id);
    this._listTasks = updateTotalTasks;
    Storage.removeTaskIn(id);

    this._pendingTasks = Storage.savePending();
    this._completedTasks = Storage.saveCompleted();

    this._render();
  }

  _updatePendingTasks() {
    const progressPending = document.getElementById("tasks_pending");

    const pendingAccount = this._pendingTasks.length;

    const totalTasks = this._listTasks.length;

    let width;

    if (pendingAccount !== 0) {
      width = Math.floor((pendingAccount / totalTasks) * 100);
    } else {
      width = 0;
    }

    progressPending.setAttribute("value", `${width}`);

    console.log("progressPending", progressPending);
    progressPending.setAttribute("data-count", `${pendingAccount}`);
  }

  _updateCompletedTasks() {
    const progressCompleted = document.getElementById("tasks_completed");

    const completedAccount = this._completedTasks.length;

    const totalTasks = this._listTasks.length;

    let width;

    if (completedAccount !== 0) {
      width = Math.floor((completedAccount / totalTasks) * 100);
    } else {
      width = 0;
    }

    progressCompleted.setAttribute("value", `${width}`);

    progressCompleted.setAttribute("data-count", `${completedAccount}`);
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

    const pendingAccount = this._pendingTasks.length;

    pendingContent.innerHTML = `${pendingAccount}`;
  }

  _displayCompletedTasks() {
    const completedContent = document.querySelector(
      ".square_arrow .completed_count"
    );

    const completedAccount = this._completedTasks.length;

    completedContent.innerHTML = `${completedAccount}`;
  }

  _render() {
    this._displayTotalTasks();
    this._displayPendingTasks();
    this._displayCompletedTasks();
    this._updatePendingTasks();
    this._updateCompletedTasks();
  }
}
export default TaskProfiler;
