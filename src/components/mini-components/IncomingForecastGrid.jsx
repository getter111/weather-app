export const IncomingForecastGrid = (props) => {
  const { currentWeather, maximum, minimum } = props;

  return (
    <div className="incoming-forecast">
      <div className="high-low">
        {currentWeather.length === 0
          ? "loading"
          : "Today: " +
            currentWeather.weather[0].description +
            ". Currently feels like: " +
            Math.round(currentWeather.main.feels_like) +
            "°"}
      </div>

      {/*top row */}
      <div className="coming-wrapper">
        <div className="container">
          <div className="forecast-list">
            <li className="forecast-list-item">
              <small>SUNRISE</small>
              <h5>
                {currentWeather.length === 0
                  ? "loading"
                  : new Date(
                      currentWeather.sys.sunrise * 1000
                    ).toLocaleTimeString("en-us")}
              </h5>
            </li>
            <li className="forecast-list-item">
              <small>Feels Like</small>
              <h5>
                {currentWeather.length === 0
                  ? "loading"
                  : Math.round(currentWeather.main.feels_like) + "°"}
              </h5>
            </li>
            <li className="forecast-list-item">
              <small>Pressure</small>
              <h5>
                {currentWeather.length === 0
                  ? "loading"
                  : currentWeather.main.pressure + " hPa"}
              </h5>
            </li>
          </div>

          {/*bottom row */}
          <div className="forecast-list">
            <li className="forecast-list-item">
              <small>SUNSET</small>
              <h5>
                {currentWeather.length === 0
                  ? "loading"
                  : new Date(
                      currentWeather.sys.sunset * 1000
                    ).toLocaleTimeString("en-us")}
              </h5>
            </li>
            <li className="forecast-list-item">
              <small>Humidity</small>
              <h5>
                {currentWeather.length === 0
                  ? "loading"
                  : currentWeather.main.humidity + "%"}
              </h5>
            </li>

            <li className="forecast-list-item">
              <small>Wind</small>
              <h5>
                {currentWeather.length === 0
                  ? "loading"
                  : Math.round(currentWeather.wind.speed) + " mph"}
              </h5>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};
