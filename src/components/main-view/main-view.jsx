import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Row, Container } from "react-bootstrap";

import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view"; // Ensure ProfileView is imported
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return; // Don't fetch if there is no token
    fetch("https://aqueous-mountain-08725-cb2ff83949fb.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          genre: {
            name: movie.Genre.Name,
            description: movie.Genre.Description,
          },
          image: movie.ImagePath,
          featured: true,
          director: {
            name: movie.Director.Name,
            bio: movie.Director.Bio,
            birthYear: movie.Director.Birth,
            deathYear: movie.Director.Death,
          },
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => alert("Error fetching movies: " + error));
  }, [token]); // Only fetch when token changes

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleUpdateFavorites = (updatedFavorites) => {
    setUser({ ...user, FavoriteMovies: updatedFavorites });
    localStorage.setItem("user", JSON.stringify({ ...user, FavoriteMovies: updatedFavorites }));
  };

  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={handleLogout} />

      <Routes>
        <Route
          path="/login"
          element={
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          }
        />
        <Route path="/signup" element={<SignupView />} />
        <Route
          path="/"
          element={
            user ? (
              <Container>
                <Row className="w-100 gx-4 gy-4">
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                      <MovieCard
                        movie={movie}
                        user={user}
                        token={token}
                        onUpdateFavorites={handleUpdateFavorites}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView
                user={user}
                token={token}
                onLoggedOut={handleLogout}
                movies={movies}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/movies/:id" element={<MovieView movies={movies} />} />
      </Routes>
    </Router>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MainView;
