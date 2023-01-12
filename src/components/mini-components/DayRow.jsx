import React from "react";

export const DayRow = (props) => {
  const { obj, day, weatherCall, weatherTime, colectionOfDays } = props;
  const weekDays = ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"];

  //finds max temp according to each coresponding day
  function findMax() {
    let max = 0;
    for (let i = 0; i < weatherTime.length; i++) {
      if (weatherTime[i].day === day) {
        if (max <= weatherCall.list[i].main.temp) {
          max = weatherCall.list[i].main.temp;
        }
      }
    }
    return max;
  }
  function findMin() {
    let min = 9000;
    for (let i = 0; i < weatherTime.length; i++) {
      if (weatherTime[i].day === day) {
        if (weatherCall.list[i].main.temp < min) {
          min = weatherCall.list[i].main.temp;
        }
      }
    }
    return min;
  }

  function findAvgHumidity() {
    let array = [];
    for (let i = colectionOfDays.key; i < weatherTime.length; i++) {
      if (weatherTime[i].day === colectionOfDays.day) {
        array.push(weatherCall.list[i].main.humidity);
      } else {
        break;
      }
    }
    let humidity = 0;

    for (let i = 0; i < array.length; i++) {
      humidity = humidity + array[i];
    }
    return humidity / array.length;
  }

  //some info may be wrong because this the free version of the api can't really do forecasts
  //the current weather and high and low temperatures should be 99% right
  return (
    <div className="DRwrapper">
      <div className="DRcol">{day}.</div>
      <div className="DRcol">
        <img
          src={
            weatherCall.length === 0
              ? "loading"
              : "http://openweathermap.org/img/wn/" +
                colectionOfDays.icon +
                "@2x.png"
          }
          alt=""
        />
      </div>
      <div className="DRcol">{Math.round(findAvgHumidity())}%</div>
      <div className="DRcol">
        {"H: " + Math.round(findMax()) + "° L: " + Math.round(findMin()) + "°"}
      </div>
    </div>
  );
};
