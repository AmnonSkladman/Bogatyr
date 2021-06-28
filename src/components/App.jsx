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
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const { books: { items = []}, errorMessage, loading } = state;

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
          items.map((book, index) => (
            <Book key={`${index}-${book.volumeInfo.title}`} book={book} />
          ))
        )}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
