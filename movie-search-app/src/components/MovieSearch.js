import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './MovieSearch.css';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); 

  const API_KEY = 'f285d448';

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(savedHistory);
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError(null);
        setShowResults(true);
        const updatedHistory = [query, ...searchHistory.filter(item => item !== query)];
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
      );
      if (response.data.Response === 'True') {
        setSelectedMovie(response.data); 
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="movie-search-container">
      {!showResults ? (
        
        <>
          <h2>Search for Movies</h2>
          <form onSubmit={searchMovies}>
            <input
              type="text"
              placeholder="Enter movie title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {searchHistory.length > 0 && (
            <div className="search-history">
              <h3>Search History</h3>
              <ul>
                {searchHistory.map((historyItem, index) => (
                  <li key={index} onClick={() => setQuery(historyItem)}>
                    {historyItem}
                  </li>
                ))}
              </ul>
              <button onClick={handleClearHistory}>Clear History</button>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
        </>
      ) : selectedMovie ? (
       
        <>
          <button onClick={() => setSelectedMovie(null)} className="back-button">
            Back to Results
          </button>
          <div className="movie-details">
            <h2>{selectedMovie.Title}</h2>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <p><strong>Year:</strong> {selectedMovie.Year}</p>
            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
            <p><strong>Director:</strong> {selectedMovie.Director}</p>
            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
            <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}</p>
          </div>
        </>
      ) : (
        
        <>
          <button onClick={() => setShowResults(false)} className="back-button">
            Back to Search
          </button>
          <div className="movie-results">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={() => fetchMovieDetails(movie.imdbID)} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieSearch;
