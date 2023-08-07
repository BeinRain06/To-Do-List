import moment from "moment";

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
    let updateWeekTasks;
    const tasks = Storage.getTasks();
    tasks.push(task);

    updateWeekTasks = tasks.filter(
      (task) =>
        parseInt(moment(task.date).format("DD")) >=
        parseInt(moment().format("DD"))
    );

    localStorage.setItem("tasks-list", JSON.stringify(updateWeekTasks));

    /* localStorage.clear(); */
  }

  static removeTaskIn(id) {
    const tasks = Storage.getTasks();

    const newTasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks-list", JSON.stringify(newTasks));
  }

  static savePending() {
    const tasks = Storage.getTasks();

    const pending = tasks.filter((item) => item.checked === false);

    return pending;
  }

  static saveCompleted() {
    const tasks = Storage.getTasks();

    const completed = tasks.filter((item) => item.checked === true);
    return completed;
  }

  static tasksAchieveIn(tasks) {
    localStorage.setItem("tasks-list", JSON.stringify(tasks));

    Storage.savePending();
    Storage.saveCompleted();
  }

  static clearAll() {
    localStorage.clear();
  }
}

export default Storage;
