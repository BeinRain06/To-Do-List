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
}

export default Storage;
