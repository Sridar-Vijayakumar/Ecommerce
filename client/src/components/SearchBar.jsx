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
      className="flex w-full max-w-xl items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm"
    >
      <div className="flex w-full items-center px-3">
        <Search
          size={20}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search for products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 text-slate-900 placeholder:text-slate-400"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-ink-900 px-6 py-2.5 font-bold text-white transition hover:bg-brand-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
