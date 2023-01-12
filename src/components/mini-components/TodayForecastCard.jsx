import React from "react";

export const TodayForecastCard = (props) => {
  const { currentWeather, weatherTime, weatherCall, minMaxOnChange } = props;
  const weekDays = ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"];
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  function findMax() {
    let max = 0;
    for (let i = 0; i < weatherTime.length; i++) {
      if (weatherTime[i].day === weekDays[new Date().getDay()]) {
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
      if (weatherTime[i].day === weekDays[new Date().getDay()]) {
        if (weatherCall.list[i].main.temp < min) {
          min = weatherCall.list[i].main.temp;
        }
      }
    }

    return min;
  }

  return (
    <div className="main-left">
      <div className="main-left-wrap">
        <div className="main-left-time">
          <div>
            {weatherTime.length === 0
              ? "loading"
              : weekDays[new Date().getDay()] +
                ", " +
                months[new Date().getMonth()] +
                " " +
                new Date().getDate() +
                ", " +
                new Date().getFullYear() +
                " " +
                new Date().toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </div>
        </div>

        <img
          src={
            currentWeather.length === 0
              ? "loading"
              : "http://openweathermap.org/img/wn/" +
                currentWeather.weather[0].icon +
                "@2x.png"
          }
          alt={
            currentWeather.length === 0
              ? "loading"
              : currentWeather.weather[0].main
          }
        />
        <div className="main-left-temp">
          <div className="left-temp">
            {currentWeather.length === 0
              ? "loading"
              : "Current: " + Math.round(currentWeather.main.temp) + "°"}
          </div>
          {/*onchange works but using callback wont work */}
          <div onChange={minMaxOnChange(findMin(), findMax())}>
            {/*to get high and low I must loop through forecast list and keep track on min/max because this api version doesn't give me the actual values of min/max temp*/}
            {/* {currentWeather.length === 0
              ? "loading"
              : "H: " +
                Math.round(findMax()) +
                "° " +
                "L: " +
                Math.round(findMin()) +
                "°"} */}
          </div>
        </div>
      </div>
    </div>
  );
};
