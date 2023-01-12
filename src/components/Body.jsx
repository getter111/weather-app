import React from "react";
import { BodyTitle } from "./mini-components/BodyTitle";
import { MainDisplay } from "./mini-components/MainDisplay";

export const Body = (props) => {
  const {
    handleTempBtnClick,
    tempDisplay,
    weatherCall,
    weatherTime,
    currentWeather,
  } = props; //destructing whatever was passed into props

  return (
    <div>
      <BodyTitle
        handleTempBtnClick={handleTempBtnClick}
        tempDisplay={tempDisplay}
        weatherCall={weatherCall}
      />
      <MainDisplay
        weatherCall={weatherCall}
        weatherTime={weatherTime}
        currentWeather={currentWeather}
      />
    </div>
  );
};
