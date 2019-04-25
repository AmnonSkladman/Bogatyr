import React from 'react';

const Book = ({ book: { id, volumeInfo: { imageLinks, publishedDate, title } } }) => {
  const cover = 'http://books.google.com/books/content?id=' + id + '&printsec=frontcover&img=1&zoom=1&source=gbs_api';

  return (
    <div className="book">
      <h2>{title}</h2>
      <div>
        <img width="200" alt={`The book titled: ${title}`} src={cover} />
      </div>
      <p>({publishedDate})</p>
    </div>
  );
};

export default Book;
