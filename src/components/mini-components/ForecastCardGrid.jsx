import { ForecastCard } from "./ForecastCard";

export const ForecastCardGrid = (props) => {
  const { weatherCall, weatherTime } = props;

  // weatherTime[i].day === weekDays[new Date().getDay()]) ||
  const weekDays = ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"];
  function displayThreeHourlyForecast() {
    const array = [];
    for (let i = 0; i < weatherTime.length; i++) {
      //only push days that are not the (-1 day) before the (present day)

      //got rid of the -1 because we cant access current day's forecast
      if (weatherTime[i].day !== weekDays[new Date().getDay()]) {
        array.push(i); //pushing back the index where same days occur
      }
    }
    // console.log("array");
    // console.log(array);
    return array;
  }

  return (
    <div className="card-wrapper">
      {weatherTime.length === 0 && weatherCall.length === 0
        ? "loading"
        : displayThreeHourlyForecast().map((content) => {
            //mapping our index array with (content) being whatever is inside the array (our indexes)
            return (
              <ForecastCard
                date={weatherTime[content]}
                item={weatherCall.list[content]}
              ></ForecastCard>
            );
          })}
    </div>
  );
};
