import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Book from './Book';
import Search from './Search';

const BOOK_API_URL = "https://www.googleapis.com/books/v1/volumes?q=''";

const initialState = {
  loading: true,
  books: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_BOOKS_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case 'SEARCH_BOOKS_SUCCESS':
      return {
        ...state,
        loading: false,
        books: action.payload
      };
    case 'SEARCH_BOOKS_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  // * Takes the initial state, then creates a new one based on the
  // * action type and payload in the reduer's logic.
  const [state, dispatch] = useReducer(reducer, initialState);

  // * useEffect gets called after the first render (componentDidMount) and
  // * after every update (componentDidUpdate). It takes in a function to
  // * execute, and a value to check for updates. We have nothing to update,
  // * so we pass an empty array. This effect will therefore run only once.
  // * This will return a JSON of the books we get from the API.
  useEffect(() => {
    fetch(BOOK_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: 'SEARCH_BOOKS_SUCCESS',
          payload: jsonResponse
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_BOOKS_REQUEST'
    });

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&apikey=4a3b711b`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_BOOKS_SUCCESS',
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: 'SEARCH_BOOKS_FAILURE',
            error: jsonResponse.Error
          });
        }
      });
  };

  const { books, errorMessage, loading } = state;

  console.log(state);

  return (
    <div className="App">
      <Header text="Bogatyr" />
      <Search search={search} />
      <p className="App-intro">A digital knight-errant for books</p>
      <div className="books">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          books.items.map((book, index) => (
            <Book key={`${index}-${book.volumeInfo.title}`} book={book} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
