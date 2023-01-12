import React, { useEffect, useState } from "react";
import "./App.css";
import { Body } from "./components/Body";
import { Header } from "./components/Header";

function App() {
  //states
  //used to store what the user types
  const [searchValue, setSearchValue] = useState("London");
  //flag used to display F or C
  const [tempDisplay, setTempDisplay] = useState(true);
  //store our daily forecast api request of json() data
  const [weatherCall, setWeatherCall] = useState([]);
  const [weatherTime, setWeatherTime] = useState([]);

  //store current weather
  const [currentWeather, setCurrentWeather] = useState([]);

  //fetches data from weatherAPI
  async function searchData() {
    try {
      let search = searchValue;
      // console.log(searchValue);
      if (search !== "") {
        //use geoCoding api to get longitute and lattitude
        const geoResponse = await fetch(
          "https://api.openweathermap.org/geo/1.0/direct?q=" +
            search +
            "&appid=a0523bb8283ca5c20976bfee7675977e",
          { mode: "cors" }
        );
        //object with all the geoCoding data
        const geoCode = await geoResponse.json();
        let unitTemp = tempDisplay ? "imperial" : "metric";
        //fetching data for a 5 day forecast of city: x
        const weatherResponse = await fetch(
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            geoCode[0].lat +
            "&lon=" +
            geoCode[0].lon +
            "&appid=a0523bb8283ca5c20976bfee7675977e&units=" +
            unitTemp,
          { mode: "cors" }
        );
        //weatherData object containing all forecast data converted to json
        const weatherData = await weatherResponse.json();
        //store json() data in state
        setWeatherCall(weatherData);
        // setSearchValue(null);
      } else {
        //if user doesn't enter a city
        console.log("bruh come on now");
      }
    } catch (error) {
      //if city is not found
      console.log("please enter valid city name");
      // setSearchValue(null);
    }
  }

  async function searchCurrentWeatherData() {
    try {
      let search = searchValue;
      // console.log(searchValue);
      if (search !== "") {
        //use geoCoding api to get longitute and lattitude
        const geoResponse = await fetch(
          "https://api.openweathermap.org/geo/1.0/direct?q=" +
            search +
            "&appid=a0523bb8283ca5c20976bfee7675977e",
          { mode: "cors" }
        );
        //object with all the geoCoding data
        const geoCode = await geoResponse.json();
        let unitTemp = tempDisplay ? "imperial" : "metric";
        //fetching data for a 5 day forecast of city: x
        const weatherResponse = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
            geoCode[0].lat +
            "&lon=" +
            geoCode[0].lon +
            "&appid=a0523bb8283ca5c20976bfee7675977e&units=" +
            unitTemp,
          { mode: "cors" }
        );
        //weatherData object containing all forecast data converted to json
        const weatherData = await weatherResponse.json();
        //store json() data in state
        setCurrentWeather(weatherData);
        // setSearchValue(null);
      } else {
        //if user doesn't enter a city
        console.log("bruh come on now");
      }
    } catch (error) {
      //if city is not found
      console.log("please enter valid city name");
      // setSearchValue(null);
    }
  }

  //need to use foreach loop to convert the times for each day
  async function convertTime(apiArray) {
    //passing in the list of objects from api call
    let formatedArray = [];
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
    //this caused a problem in my calculate, fixed it when Days start at Monday instead of Sunday. Idk how I fixed it but it did...
    const weekDays = ["Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun"];

    for (let i = 0; i < apiArray.length; i++) {
      let str = apiArray[i].dt_txt;
      //splitting the two values on the whitespace: "2022-11-12 21:00:00"
      let [dateValues, timeValues] = str.split(" ");
      let d = new Date(dateValues);
      // console.log(dateValues); // "2022-11-12"
      // console.log(timeValues); // "21:00:00"
      let day = weekDays[d.getDay()];
      let month = months[d.getMonth()];

      //since the api shows forecast in 3hr intervals only the "hour" is needed
      let [hours, minutes, seconds] = timeValues.split(":");

      hours = parseInt(hours); //convert string to int
      const AmOrPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; //if hours % 12 == 0 then it is 12 oclock

      //return object with time info
      let timeObj = {
        day: day,
        dayNum: d.getDate(),
        year: d.getFullYear(),
        month: month,
        hours: hours + ":00",
        AmPm: AmOrPm,
        index: i,
      };
      formatedArray.push(timeObj);
    }
    //return array of en-us locale time objs
    return formatedArray;
  }

  //fetches data from api on first mount
  useEffect(() => {
    console.log("settiong weather data...");
    searchData(); //default val is london
    searchCurrentWeatherData();
    console.log("the default val is: " + searchValue);
    console.log("the original weather data is: " + weatherCall);
  }, []);

  //cleaner way to set state with async function i think
  async function asyncCall() {
    const timeStuff = await convertTime(weatherCall.list);
    setWeatherTime(timeStuff);
  }
  //when new data is fetched do somehting
  useEffect(() => {
    console.log("our current api data");
    console.log(weatherCall);
    console.log("converting time");
    console.log(weatherTime);
    console.log("curretn weather data is ");
    console.log(currentWeather);
    asyncCall();

    //incase our weathercall promise has not been fullfilled we call it as an async()
  }, [weatherCall]);

  //button click function
  const handleSearchBtnClick = (e, word) => {
    e.preventDefault();
    setSearchValue(word);
    console.log("You clicked submit " + searchValue);
  };
  //when the search button is clicked make a call to the api
  useEffect(() => {
    console.log("call api to search new city");
    searchData();
    searchCurrentWeatherData();
  }, [searchValue]);

  //button to change temperature display
  const handleTempBtnClick = (e) => {
    e.preventDefault();
    setTempDisplay(!tempDisplay);
  };
  useEffect(() => {
    console.log("useeffect weater time: ");
    console.log(weatherTime);
  }, [weatherTime]);

  useEffect(() => {
    console.log("call api yes to change temp display");
    searchData();
    searchCurrentWeatherData();
    // searchData();
  }, [tempDisplay]);

  return (
    <div className="App">
      <Header handleSearchBtnClick={handleSearchBtnClick} />
      <Body
        handleTempBtnClick={handleTempBtnClick}
        tempDisplay={tempDisplay}
        weatherCall={weatherCall}
        weatherTime={weatherTime}
        currentWeather={currentWeather}
      />
    </div>
  );
}

export default App;
