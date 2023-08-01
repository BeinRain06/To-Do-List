import moment from "moment";

class DateSettings {
  constructor() {
    this._currentDate = moment().format("Do MMMM, dddd");
    this._setCurrentdate();
    this._setWeekRange();
    this._renderDateCards();
    /* this_setDate(); */
  }

  /* public method*/

  _setCurrentdate() {
    document.getElementById("current_day").innerHTML = this._currentDate;
  }

  _setWeekRange() {
    const start = moment().format("Do MMMM, YYYY");

    const end = moment().add(6, "days").format("Do MMMM, YYYY");

    document.getElementById("week_range").innerHTML = `${start} - ${end}`;
  }

  _setDateInput(dateInput) {
    dateInput.setAttribute("min", moment().format("YYYY-MM-DD"));

    dateInput.setAttribute(
      "max",
      moment().add("6", "days").format("YYYY-MM-DD")
    );
  }

  _renderDateCards() {
    const dayIndex = [0, 1, 2, 3, 4, 5, 6];
    const currentWeek = document.getElementById("list_days_week");

    dayIndex.map((item, i) => {
      let day = document.createElement("li");

      let current = moment().add(i, "days");

      day.className = i === 0 ? "day active_day" : "day";

      day.setAttribute("id", i);
      /*   day.setAttribute("data-value", `${current.format("dddd, MMMM Do YYYY")}`); */
      day.setAttribute("data-value", `${current.format("DD")}`);

      day.innerHTML = `<p class="day_name">${current
        .format("ddd")
        .toUpperCase()}</p>
            <p class="day_count">${current.format("DD")}</p>`;

      currentWeek.appendChild(day);
    });
  }

  /* _setDate() {
    this._setCurrentdate();
    this._setWeekRange();
    this._renderDateCards();
  } */
}

export default DateSettings;
