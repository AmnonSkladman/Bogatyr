import React, { useState } from 'react';

const Search = ({ search }) => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = e => {
    setQuery(e.target.value);
  };

  const resetInputField = () => {
    setQuery('');
  };

  const searchBooks = e => {
    e.preventDefault();
    search(query);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        aria-labelledby='Search for books here'
        className="search-field"
        onChange={handleChangeQuery}
        placeholder="Search for books..."
        required
        type="search"
        value={query}
      />
      <button aria-label='Search' className="button-search" onClick={searchBooks} type="submit">
        <span aria-label="Magnifying glass emoji" role="img">
          🔍
        </span>
      </button>
    </form>
  );
};

export default Search;
