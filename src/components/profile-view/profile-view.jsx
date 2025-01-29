import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card"; // Import the MovieCard component

export const ProfileView = ({ user, token, onLoggedOut, movies }) => {
  const [error, setError] = useState(null);

  // Filter favorite movies
  const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  const handleDeleteAccount = () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return; // Exit if the user cancels
    }

    // Make DELETE request to delete the user's account
    fetch(`https://aqueous-mountain-08725-cb2ff83949fb.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete account");
        }
        onLoggedOut(); // Log out the user after successful deletion
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Container className="profile-view mt-4">
      <Row>
        <Col>
          <h1>Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}

          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Birthday:</strong> {new Date(user.birthday).toLocaleDateString()}
          </p>

          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Favorite Movies</h2>
          {favoriteMovies.length === 0 ? (
            <p>You have no favorite movies yet.</p>
          ) : (
            <Row className="gy-4">
              {favoriteMovies.map((movie) => (
                <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
