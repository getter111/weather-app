import React from "react";
import { DayRow } from "./DayRow";
import { DayRowTitle } from "./DayRowTitle";

export const FiveDayList = (props) => {
  const { weatherCall, weatherTime, currentWeather, maximum, minimum } = props;
  const weekDays = ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"];

  function displayThreeHourlyForecast() {
    const array = [];
    for (let i = 0; i < weatherTime.length; i++) {
      //only push days that are not the (-1 day) before the (present day)
      if (weatherTime[i].day !== weekDays[new Date().getDay() - 1]) {
        array.push(i); //pushing back the index where same days occur
      }
    }
    // console.log("arr");
    // console.log(array);
    // console.log(weatherCall);
    return array;
  }

  const obj = [];
  const days = [];
  const colectionOfDays = [];
  //pushing into the obj array
  for (
    //start at current day and go until end
    let i = displayThreeHourlyForecast()[0];
    i < weatherTime.length;
    i++
  ) {
    obj.push({
      day: weatherTime[i].day,
      key: i,
      humidity: weatherCall.list[i].main.humidity,
      temp: weatherCall.list[i].main.temp,
      icon: weatherCall.list[i].weather[0].icon,
    });
  }
  // console.log("the obj");
  // console.log(obj);

  //pushing into the days array. only push in new days not current day
  for (let i = 0; i < obj.length; i++) {
    if (
      weekDays[new Date().getDay()] === obj[i].day ||
      days.includes(obj[i].day)
    ) {
      continue;
    }
    days.push(obj[i].day);
    colectionOfDays.push(obj[i]); //day starting at 12AM
  }
  // console.log("collection of days");
  // console.log(colectionOfDays);
  // console.log("days");
  // console.log(days);

  return (
    <div className="day-row-wrapper">
      <div className="day-row-container">
        <DayRowTitle />
      </div>
      <div className="flex-wrap">
        {weatherCall.length === 0 && weatherTime.length === 0
          ? "loading"
          : days.map((day, index) => {
              return (
                <DayRow
                  obj={obj}
                  day={day}
                  weatherCall={weatherCall}
                  weatherTime={weatherTime}
                  colectionOfDays={colectionOfDays[index]}
                />
              );
            })}
      </div>
    </div>
  );
};
