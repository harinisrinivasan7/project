import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import MovieSearch from './components/MovieSearch';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('movieSearch');
  };

  const handleSignupSuccess = () => {
    setCurrentPage('login');
  };

  const handleSignupClick = () => {
    setCurrentPage('signup');
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  return (
    <div>
      {currentPage === 'login' && !isAuthenticated && (
        <Login onSignupClick={handleSignupClick} onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'signup' && !isAuthenticated && (
        <Signup onLoginClick={handleLoginClick} onSignupSuccess={handleSignupSuccess} />
      )}
      {isAuthenticated && currentPage === 'movieSearch' && <MovieSearch />}
    </div>
  );
};

export default App;
