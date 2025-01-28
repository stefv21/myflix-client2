import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
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
};
