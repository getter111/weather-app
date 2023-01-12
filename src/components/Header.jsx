import React, { useState } from "react";

export const Header = (props) => {
  const { handleSearchBtnClick } = props; //destructing whatever was passed into props
  const [word, setWord] = useState("Search City..."); //used to store what the user types to uplift state to our Parent

  return (
    <header className="search">
      Weather Finder
      <div className="nav">
        <div className="highlight">
          <input
            type="text"
            id="search-bar"
            placeholder="Search City..."
            value={word !== "Search City..." ? word : ""}
            //when something is typed into the searchbar it stores it into our state "word"
            onChange={(event) => setWord(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchBtnClick(e, word);
                setWord("");
              }
            }}
          />
          <hr />
        </div>
        <button
          className="search-btn"
          //when our button is clicked
          onClick={(e) => {
            handleSearchBtnClick(e, word);
            setWord("");
          }}
        >
          Find weather
        </button>
      </div>
    </header>
  );
};
