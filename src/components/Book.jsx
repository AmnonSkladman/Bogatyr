import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const Book = ({ book: { volumeInfo: { imageLinks, publishedDate, title } } }) => {
  const poster = !imageLinks ? DEFAULT_PLACEHOLDER_IMAGE : imageLinks.smallThumbnail;

  return (
    <div className="book">
      <h2>{title}</h2>
      <div>
        <img width="200" alt={`The book titled: ${title}`} src={poster} />
      </div>
      <p>({publishedDate})</p>
    </div>
  );
};

export default Book;
