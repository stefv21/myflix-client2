import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="movie-card custom-bg" onClick={() => onMovieClick(movie)}>
        <div className="image-container">
            <Card.Img variant="top" src={movie.image.imageUrl} alt={movie.title} />
        </div>
        <Card.Body className="custom-flex">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
                Directed by {movie.director.name}
            </Card.Text>
            <Button variant="primary" onClick={() => onMovieClick(movie)}>
                View Details
            </Button>
        </Card.Body>
    </Card>
);
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};