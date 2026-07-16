import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        className="border p-2 rounded"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;