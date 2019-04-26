import React from 'react';

const Header = ({ text }) => {
  return (
    <header className="App-header">
      <h2>{text}</h2>
      <p className="App-intro">A digital knight-errant for books</p>
    </header>
  );
};
export default Header;
