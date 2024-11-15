
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MovieDetails = () => {
  const { selectedMovie } = useContext(AppContext);

  return (
    <div>
      {selectedMovie ? (
        <>
          <h2>{selectedMovie.Title}</h2>
          <p>Year: {selectedMovie.Year}</p>
          <p>IMDB ID: {selectedMovie.imdbID}</p>
        </>
      ) : (
        <p>No movie selected</p>
      )}
    </div>
  );
};

export default MovieDetails;
