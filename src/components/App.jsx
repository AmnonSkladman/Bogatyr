import React, { useReducer, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Book from './Book';
import { BOOK_API_URL } from '../utils/api';
import Header from './Header';
import Search from './Search';
import { styles } from '../utils/styles';

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

const App = ({ classes }) => {
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

  const search = q => {
    dispatch({
      type: 'SEARCH_BOOKS_REQUEST'
    });

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}`)
      .then(response =>
        response
          .json()
          .then(data => ({
            body: data,
            error: response.error,
            status: response.status
          }))
      )
      .then(jsonResponse => {
        if (jsonResponse.status === 200) {
          dispatch({
            type: 'SEARCH_BOOKS_SUCCESS',
            payload: jsonResponse.body
          });
        } else {
          dispatch({
            type: 'SEARCH_BOOKS_FAILURE',
            error: jsonResponse.error
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
      <Grid
        alignItems="flex-start"
        className={classes.root}
        container
        direction="row"
        justify="center"
        spacing={16}
      >
        {loading && !errorMessage ? (
          <span>Loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          books.items.map((book, index) => (
            <Book key={`${index}-${book.volumeInfo.title}`} book={book} />
          ))
        )}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
