import React from "react";

const Category = ({ options, handleCategory }) => {
  return (
    <div className="flex w-full sm:w-3/5 md:w-1/3 border-b mb-2 mx-auto py-1 justify-around items-center">
      <button
        type="button"
        className="px-1 sm:px-2 text-center cursor-pointer text-xs sm:text-sm text-yellow-800 rounded-md bg-yellow-400 hover:bg-yellow-500 active:bg-orange-500"
        onClick={() => handleCategory("All")}
      >
        All
      </button>
      {options.map((item, index) => (
        <button
          type="button"
          key={index}
          className="px-1 md:px-2 text-center cursor-pointer text-xs sm:text-sm text-yellow-800 rounded-md bg-yellow-400 hover:bg-yellow-500 active:bg-orange-500"
          onClick={() => handleCategory(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Category;
