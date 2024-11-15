// src/context/AppContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Login function (simulated)
  const login = (userData) => setUser(userData);

  // Signup function (simulated)
  const signup = (userData) => setUser(userData);

  // Fetch movies by title
  const searchMovies = async (title) => {
    const options = {
      method: 'GET',
      url: `https://moviedatabase8.p.rapidapi.com/Search/${title}`,
      headers: {
        'x-rapidapi-key': '008f0cd1e9mshb32ee9de714b117p1c2741jsn14851436975c',
        'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setMovies(response.data.Search); // Set movies array to state
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Set selected movie for details
  const selectMovie = (movie) => setSelectedMovie(movie);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        movies,
        searchMovies,
        selectedMovie,
        selectMovie
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
