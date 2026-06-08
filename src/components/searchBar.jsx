import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/searchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query); // send search query back to parent
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search medicines…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // search on Enter
        className="search-bar"
      />
      <div className="search-icon-2" onClick={handleSearch}>
        <FaSearch />
      </div>
    </div>
  );
}

export default SearchBar;
