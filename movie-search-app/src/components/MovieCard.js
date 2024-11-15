import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
    </div>
  );
};

export default MovieCard;
