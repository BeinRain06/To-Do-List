import TaskProfiler from "./TaskProfiler";
class PriorityChart {
  constructor() {
    this._profiler = new TaskProfiler();
    this._totalHighItems = 0;
    this._totalMediumItems = 0;
    this._totalNormalItems = 0;

    this._highPriority = document.getElementById("high_diagram");
    this._mediumPriority = document.getElementById("medium_diagram");
    this._normalPriority = document.getElementById("normal_diagram");

    this._displayTotalItems();
    this._renderChart();
  }

  _updateTotalItems(lastPriority, typeAction) {
    console.log("priority choosed", lastPriority);
    if (typeAction === "add") {
      switch (lastPriority) {
        case "high":
          this._totalHighItems += 1;
          break;
        case "medium":
          this._totalMediumItems += 1;
          break;
        case "normal":
          this._totalNormalItems += 1;
          break;
        default:
          return;
      }
      this._renderChart();
    } else if (typeAction === "remove") {
      switch (lastPriority) {
        case "high":
          this._totalHighItems = this._totalHighItems - 1;
          this._highNum.innerText = this._totalHighItems;
          break;
        case "medium":
          this._totalMediumItems = this._totalMediumItems - 1;
          this._mediumNum.innerText = this._totalMediumItems;
          break;
        case "normal":
          this._totalNormalItems = this._totalNormalItems - 1;
          this._normalNum.innerText = this._totalNormalItems;
          break;
        default:
          return;
      }

      this._renderChart();
      console.log("item priority else", lastPriority);
      console.log("total high prior", this._totalHighItems);
    }
  }

  _displayTotalItems() {
    this._profiler._listTasks.map((item, index) => {
      switch (item.priority) {
        case "high":
          this._totalHighItems += 1;
          break;
        case "medium":
          this._totalMediumItems += 1;
          break;
        case "normal":
          this._totalNormalItems += 1;
          break;
        default:
          return;
      }
    });
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

  _renderChart() {
    this._updateHighChart();
    this._updateMediumChart();
    this._updateNormalChart();
  }
}

export default PriorityChart;
