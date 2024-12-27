import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <p><strong>Movie ID:</strong> {movie._id}</p>
    
      <img src={movie.imageURL} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <h3>Genre: {movie.genre.name}</h3>
      <p>{movie.genre.description}</p>
      <h3>Director: {movie.director.name}</h3>
      <p>{movie.director.bio}</p>
      <p><strong>Born:</strong> {movie.director.birth} {movie.director.death && `- Died: ${movie.director.death}`}</p>
      <button onClick={onBackClick}>Back to Movies</button>
    </div>
  );
};

