import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, onUpdateFavorites }) => {
  // Check if the movie is already in the user's favorites
  const isFavorite = user.favoriteMovies.includes(movie.id);

  const handleFavoriteToggle = () => {
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://aqueous-mountain-08725-cb2ff83949fb.herokuapp.com/users/${user.username}/movies/${movie.id}`;

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update favorites");
        }
        return response.json();
      })
      .then((updatedUser) => {
        // Update user's favorite movies list in the parent component
        onUpdateFavorites(updatedUser.FavoriteMovies);
      })
      .catch((err) => {
        alert("An error occurred: " + err.message);
      });
  };

  return (
    <Card className="movie-card custom-bg">
      <div className="image-container">
        <Card.Img variant="top" src={movie.image.imageUrl} alt={movie.title} />
      </div>
      <Card.Body className="custom-flex">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Directed by {movie.director.name}</Card.Text>
        <Link to={`/movies/${movie.id}`} className="btn btn-primary">
          View Details
        </Link>
        {/* Favorite button */}
        <Button
          variant={isFavorite ? "danger" : "success"}
          className="mt-2"
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onUpdateFavorites: PropTypes.func.isRequired,
};
