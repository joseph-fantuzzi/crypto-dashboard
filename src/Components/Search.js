import React from "react";
import "../Styles/styles.css";

const Search = ({ cryptoData, searchValue, setSearchValue, toggleDark }) => {
  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className="w-full flex justify-center md:justify-end items-center my-8">
      <label className={toggleDark ? "text-white" : ""} htmlFor="search">
        Search
      </label>
      <input
        className={`w-32 h-8 ml-3 px-3 py-1 md:mr-16 drop-shadow-md rounded-3xl border-2 ${toggleDark ? "bg-zinc-800 text-white" : "border-gray-800"}`}
        id="search"
        type="text"
        name="search"
        value={searchValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
