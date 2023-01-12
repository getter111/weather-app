import React from "react";

export const ForecastCard = (props) => {
  const { item, date } = props;
  const weekDays = ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"];

  return (
    <div className="forecast-card">
      {console.log(weekDays[new Date().getDay()])}
      <div className="forecast-day">
        {weekDays[new Date().getDay()] === date.day
          ? null
          : date.day + " " + date.hours + " " + date.AmPm}
      </div>

      <img
        className="icon"
        src={
          weekDays[new Date().getDay()] === date.day || item.length === 0
            ? require("./giphy.gif")
            : "http://openweathermap.org/img/wn/" +
              item.weather[0].icon +
              "@2x.png"
        }
        alt=""
      />
      <div className="forecast-temp">
        <div className="left-temp">
          {weekDays[new Date().getDay()] === date.day
            ? null
            : Math.round(item.main.temp) + "°"}
        </div>
        <div>
          {weekDays[new Date().getDay()] === date.day
            ? null
            : "Feels like: " + Math.round(item.main.feels_like) + "°"}
        </div>
      </div>
    </div>
  );
};
