import React from "react";

export const BodyTitle = (props) => {
  const { handleTempBtnClick, tempDisplay, weatherCall } = props;
  return (
    <div className="bodyTitle">
      <div className="tempToggleBtn">
        <button onClick={handleTempBtnClick}>
          Change to {tempDisplay ? "Celcius" : "Fahrenheit"}
        </button>
        <div>
          Display in: <b className="FC">{tempDisplay ? "°F" : "°C"} </b>
        </div>
      </div>
      <div className="flex-wrapper">
        <h2 className="forecast-title">
          5 Day <small>&nbsp;(3-hr step interval)</small> &nbsp;Forecast
          {/* Before the data is being fetched from the server in React trys to render what is currently in the state: so we make a check to see if our prop is an empty object */}
          <b>
            {Object.keys(weatherCall).length === 0
              ? ": loading"
              : ": " + weatherCall.city.name}
          </b>
        </h2>
      </div>
    </div>
  );
};
