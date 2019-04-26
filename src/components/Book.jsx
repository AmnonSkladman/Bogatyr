import React from 'react';
import Grid from '@material-ui/core/Grid';

const Book = ({
  book: {
    id,
    volumeInfo: { authors, publishedDate, title }
  },
  classes
}) => {
  const cover =
    'http://books.google.com/books/content?id=' +
    id +
    '&printsec=frontcover&img=1&zoom=1&source=gbs_api';

  const author = authors
    ? authors.length > 1
      ? `${authors[0]} and more`
      : authors[0]
    : 'None';

  return (
    <Grid item xs={12} md={6} lg={3} xl={2}>
      <div>
        <h2 className="bookTitle">{title}</h2>
        <img alt={`${title} written by ${author}`} src={cover} />
        <p>{publishedDate}</p>
      </div>
    </Grid>
  );
};

export default Book;
