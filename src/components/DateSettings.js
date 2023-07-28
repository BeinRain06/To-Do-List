import moment from "moment";

class DateSettings {
  constructor() {
    this._currentDate = moment().format("Do MMMM, dddd");
  }

  /* public method*/

  setCurrentdate() {
    document.getElementById("current_day").innerHTML = this._currentDate;
  }

  setWeekRange() {
    const start = moment().format("Do MMMM, YYYY");

    const end = moment().add(6, "days").format("Do MMMM, YYYY");

    document.getElementById("week_range").innerHTML = `${start} - ${end}`;
  }

  setDateInput() {
    document
      .getElementById("date_input")
      .setAttribute("min", moment().format("YYYY-MM-D"));

    document
      .getElementById("date_input")
      .setAttribute("max", moment().add("6", "days").format("YYYY-MM-D"));
  }

  renderDateCards() {
    const dayIndex = [0, 1, 2, 3, 4, 5, 6];
    const currentWeek = document.getElementById("list_days_week");

    dayIndex.map((item, i) => {
      const day = document.createElement("li");

      let current = moment().add(i, "days");

      index === 0
        ? day.classList.add("day active_day")
        : day.classList.add("day");

      day.setAttribute("id", i);
      day.setAttribute("data-value", `${current.format("dddd, MMMM Do YYYY")}`);

      day.innerHTML = `<p class="day_name">${current
        .format("ddd")
        .toUpperCase()}</p>
            <p class="day_count">${current.format("DD")}</p>`;

      currentWeek.appendChild(day);
    });
  }
}

export default DateSettings;
