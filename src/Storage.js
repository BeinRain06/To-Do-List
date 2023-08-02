class Storage {
  static getTasks() {
    let tasks;
    if (localStorage.getItem("tasks-list") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks-list"));
    }
    return tasks;
  }

  static saveTask(task) {
    const tasks = Storage.getTasks();
    tasks.push(task);
    localStorage.setItem("tasks-list", JSON.stringify(tasks));
  }

  static savePending() {
    const tasks = Storage.getTasks();

    const pending = tasks.filter((item) => item.check === "pending");

    return pending;
  }

  static saveCompleted() {
    const tasks = Storage.getTasks();

    const completed = tasks.filter((item) => item.check === "completed");

    return completed;
  }
}

export default Storage;
