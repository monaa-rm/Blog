import React from "react";

const Search = ({ inputChange, searchValue }) => {
  return (
    <div className="w-full pb-1 bg">
      <form className="w-full  flex justify-center " >
        <input
          value={searchValue}
          type="search"
          placeholder="Search ..."
          onChange={inputChange}
          className="border-2 text-gray-700 rounded-md w-2/3 focus:border-blue-400 outline-none px-2"
        />
      </form>
    </div>
  );
};

export default Search;
