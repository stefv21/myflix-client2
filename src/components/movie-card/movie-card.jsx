export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={onMovieClick}>
      <h2>{movie.title}</h2>
      <img src={movie.imageURL} alt={movie.title} />
    </div>
  );
};

