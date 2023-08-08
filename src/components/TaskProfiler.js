import Storage from "../Storage";
import moment from "moment";
class TaskProfiler {
  constructor() {
    this._listTasks = Storage.getTasks();
    this._completedTasks = Storage.saveCompleted();
    this._pendingTasks = Storage.savePending();
    this._pendingSquare = document.getElementById("square_pend");
    this._completedSquare = document.getElementById("square_complete");

    /*select eleement for flow chart*/
    this._totalHighItems = this._suitHighDiagram();
    this._totalMediumItems = this._suitMediumDiagram();
    this._totalNormalItems = this._suitNormalDiagram();

    /* rendering */
    this._render();
    this._renderChart();
  }

  _addTasks(title, date, priority) {
    const typeAction = "add";

    const task = {
      id: Math.random().toString(16).slice(2),
      title: title,
      date: date,
      dateDay: moment(date, "YYYY-MM-DD").add(1, "days").format("MMM D"),
      classElt: "task_match_content",
      checked: false,
      priority: priority,
    };

    this._listTasks.push(task);

    Storage.saveTask(task);

    this._updateChart();

    this._pendingTasks = Storage.savePending();

    this._completedTasks = Storage.saveCompleted();

    this._render();
  }

  _removeTasks(item) {
    const typeAction = "remove";
    const itemId = item.id;
    const updateTotalTasks = this._listTasks.filter(
      (task) => task.id !== itemId
    );
    this._listTasks = updateTotalTasks;

    Storage.removeTaskIn(itemId);

    this._updateChart();

    this._pendingTasks = Storage.savePending();
    this._completedTasks = Storage.saveCompleted();

    this._render();
  }

  _updatePendingTasks() {
    const progressPending = document.getElementById("tasks_pending");
    const squarePending = document.getElementById("square_pend");

    this._pendingTasks = Storage.savePending();

    /*total tasks pending */
    const pendingAccount = this._pendingTasks.length;

    const totalTasks = this._listTasks.length;

    let width, leftSquare;

    if (pendingAccount !== 0) {
      width = Math.floor((pendingAccount / totalTasks) * 100);
      leftSquare = width - 10;
    } else {
      width = 0;
      leftSquare = 0;
    }

    progressPending.setAttribute("value", `${width}`);

    progressPending.setAttribute("data-count", `${pendingAccount}`);

    document
      .querySelector(":root")
      .style.setProperty("--progress-bar-pending", leftSquare + "%");
  }

  _updateCompletedTasks() {
    const progressCompleted = document.getElementById("tasks_completed");

    this._completedTasks = Storage.saveCompleted();

    /*total tasks completed */
    const completedAccount = this._completedTasks.length;

    const totalTasks = this._listTasks.length;

    let width, leftSquare;

    if (completedAccount !== 0) {
      width = Math.floor((completedAccount / totalTasks) * 100);
      leftSquare = width - 10;
    } else {
      width = 0;
      leftSquare = 0;
    }

    progressCompleted.setAttribute("value", `${width}`);

    progressCompleted.setAttribute("data-count", `${completedAccount}`);

    document
      .querySelector(":root")
      .style.setProperty("--progress-bar-completed", leftSquare + "%");
  }
  /* deal with updation items Flow Chart */
  _suitHighDiagram() {
    const listTasks = Storage.getTasks();

    const listNum = listTasks.filter((item) => item.priority === "high").length;

    return listNum;
  }

  _suitMediumDiagram() {
    const listTasks = Storage.getTasks();

    const listNum = listTasks.filter(
      (item) => item.priority === "medium"
    ).length;

    return listNum;
  }

  _suitNormalDiagram() {
    const listTasks = Storage.getTasks();

    const listNum = listTasks.filter(
      (item) => item.priority === "normal"
    ).length;
    return listNum;
  }

  _updateHighChart() {
    const highPriority = document.getElementById("high_diagram");
    const highNum = document.querySelector(".high_chart .account_priority");
    let height = this._totalHighItems * 6;
    if (height >= 60) height = 60;
    if (height === 0) {
      highNum.innerText = 0;
      height = 2;
    }
    highPriority.style.height = `${height}px`;

    highNum.innerText = this._totalHighItems;
  }

  _updateMediumChart() {
    const mediumPriority = document.getElementById("medium_diagram");
    const mediumNum = document.querySelector(".medium_chart .account_priority");
    let height = this._totalMediumItems * 6;
    if (height >= 60) height = 60;
    if (height === 0) {
      mediumNum.innerText = 0;
      height = 2;
    }
    mediumPriority.style.height = `${height}px`;
    mediumNum.innerText = this._totalMediumItems;
  }

  _updateNormalChart() {
    const normalPriority = document.getElementById("normal_diagram");
    const normalNum = document.querySelector(".normal_chart .account_priority");
    let height = this._totalNormalItems * 6;
    if (height >= 60) height = 60;
    if (height === 0) {
      normalNum.innerText = 0;
      height = 2;
    }
    normalPriority.style.height = `${height}px`;
    normalNum.innerText = this._totalNormalItems;
  }

  _updateChart() {
    this._totalHighItems = this._suitHighDiagram();
    this._totalMediumItems = this._suitMediumDiagram();
    this._totalNormalItems = this._suitNormalDiagram();
    this._renderChart();
  }

  /*subfunction for rendering */
  _displayTotalTasks() {
    const totalTask = document.getElementById("total_tasks");
    const count_tasks = this._listTasks.length;
    totalTask.innerHTML = `${count_tasks}`;
  }

  _displayPendingTasks() {
    const pendingContent = document.querySelector(
      ".square_arrow .pending_count"
    );

    this._pendingTasks = Storage.savePending();

    const pendingAccount = this._pendingTasks.length;

    pendingContent.innerHTML = `${pendingAccount}`;
  }

  _displayCompletedTasks() {
    const completedContent = document.querySelector(
      ".square_arrow .completed_count"
    );

    this._completedTasks = Storage.saveCompleted();

    const completedAccount = this._completedTasks.length;

    completedContent.innerHTML = `${completedAccount}`;
  }

  /*main rendering*/
  _renderChart() {
    this._updateHighChart();
    this._updateMediumChart();
    this._updateNormalChart();
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
