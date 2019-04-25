import React, { useState } from 'react';

const Search = ({ search }) => {
  // [state, setState] React Hook
  const [searchValue, setSearchValue] = useState('');

  // populates the search value
  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  // resets the input
  const resetInputField = () => {
    setSearchValue('');
  };

  // searches using the value and resets the field
  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
