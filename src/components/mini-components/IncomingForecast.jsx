import React from "react";

export const IncomingForecast = (props) => {
  const { currentWeather, title } = props;
  return (
    <li className="forecast-list-item">
      <small>{title}</small>
      <h5>
        {currentWeather.length === 0 ? "loading" : currentWeather.sys.sunset}
      </h5>
    </li>
  );
};
