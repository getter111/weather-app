import React, { useState } from "react";
import { FiveDayList } from "./FiveDayList";
import { ForecastCardGrid } from "./ForecastCardGrid";
import { IncomingForecastGrid } from "./IncomingForecastGrid";
import { TodayForecastCard } from "./TodayForecastCard";

export const MainDisplay = (props) => {
  const { weatherCall, weatherTime, currentWeather } = props;

  //state for the incomingForecastGrid
  const [maximum, setMaximum] = useState(0);
  const [minimum, setMinimum] = useState(0);

  const minMaxOnChange = (min, max) => {
    setMaximum(max);
    setMinimum(min);
  };

  //some data may not be accurate because forecast is based on 3hr intervals
  return (
    <div>
      <div className="main-flex">
        <TodayForecastCard
          weatherCall={weatherCall}
          weatherTime={weatherTime}
          currentWeather={currentWeather}
          minMaxOnChange={minMaxOnChange}
        />
        <div className="forecast-wrapper">
          <ForecastCardGrid
            weatherCall={weatherCall}
            weatherTime={weatherTime}
            currentWeather={currentWeather}
          />
        </div>
      </div>

      <div className="income-wrap">
        <IncomingForecastGrid
          currentWeather={currentWeather}
          maximum={maximum}
          minimum={minimum}
        />
        <FiveDayList
          weatherCall={weatherCall}
          weatherTime={weatherTime}
          currentWeather={currentWeather}
          maximum={maximum}
          minimum={minimum}
        />
      </div>
    </div>
  );
};
