import PropTypes from "prop-types";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div className="movie-card custom-bg" onClick={() => onMovieClick(movie)}>
            <div className="image-container">
                <img src={movie.image.imageUrl} alt={movie.title} />
            </div>
            <div className="card-body custom-flex">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">Directed by {movie.director.name}</p>
            </div>
        </div>
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