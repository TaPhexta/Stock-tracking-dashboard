function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="search-container">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="Enter Symbol (e.g. TSLA)"
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
