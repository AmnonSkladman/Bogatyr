import React, { useState } from 'react';

const Search = ({ search }) => {
  // [state, setState] React Hook
  const [query, setQuery] = useState('');

  // populates the query
  const handleChangeQuery = e => {
    setQuery(e.target.value);
  };

  // resets the input
  const resetInputField = () => {
    setQuery('');
  };

  // searches using the value and resets the field
  const searchBooks = e => {
    e.preventDefault();
    search(query);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        value={query}
        onChange={handleChangeQuery}
        type="text"
      />
      <input onClick={searchBooks} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
