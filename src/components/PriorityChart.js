import TaskProfiler from "./TaskProfiler";
class PriorityChart {
  constructor() {
    this._profiler = new TaskProfiler();
    this._totalHighItems = 0;
    this._totalMediumItems = 0;
    this._totalNormalItems = 0;
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
    } else {
      switch (lastPriority) {
        case "high":
          this._totalHighItems -= 1;
          break;
        case "medium":
          this._totalMediumItems -= 1;
          break;
        case "normal":
          this._totalNormalItems -= 1;
          break;
        default:
          return;
      }
      this._renderChart();
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
    let height = this._totalHighItems * 6;
    if (height >= 60) height = 60;
    highPriority.style.height = `${height}px`;
  }

  _updateMediumChart() {
    const mediumPriority = document.getElementById("medium_diagram");
    let height = this._totalMediumItems * 6;
    if (height >= 60) height = 60;
    mediumPriority.style.height = `${height}px`;
  }

  _updateNormalChart() {
    const normalPriority = document.getElementById("normal_diagram");
    let height = this._totalNormalItems * 6;
    if (height >= 60) height = 60;
    normalPriority.style.height = `${height}px`;
  }

  _renderChart() {
    this._updateHighChart();
    this._updateMediumChart();
    this._updateNormalChart();
  }
}

export default PriorityChart;
