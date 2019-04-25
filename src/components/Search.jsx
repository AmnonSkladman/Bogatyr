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
      <input value={query} onChange={handleChangeQuery} type="text" />
      <input onClick={searchBooks} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
