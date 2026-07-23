import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex items-center w-full max-w-lg mx-auto"
    >
      <div className="flex items-center w-full bg-white border border-gray-300 rounded-l-lg px-3">
        <Search
          size={20}
          className="text-gray-500"
        />

        <input
          type="text"
          placeholder="Search for products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-3 py-3 outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;