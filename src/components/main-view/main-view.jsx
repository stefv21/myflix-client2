import React, { useState } from "react";
import { MovieCard } from "./MovieCard";
import { MovieView } from "./MovieView";

export const MainView = () => {
  const [movies] = useState([
    {
      _id: "675afb4e8f311542b0f04379",
      title: "Silence of the Lambs",
      description:
        "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      director: {
        name: "Jonathan Demme",
        bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        birth: "1944",
        death: "2017",
      },
      genre: {
        name: "Thriller",
        description:
          "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
      },
      imageURL: "silenceofthelambs.png",
      releaseYear: 1991,
    },
    {
      _id: "675b07578f311542b0f0437a",
      title: "Top Gun",
      description: "A modern action movie about elite naval aviators.",
      director: {
        name: "Tony Scott",
        bio: "Tony Scott was a British film director, producer, and screenwriter, known for his action films.",
        birthyear: "1944-06-21",
        deathyear: "2012-08-19",
      },
      genre: {
        name: "Action",
        description:
          "Fast-paced movies with intense sequences of physical action.",
      },
      imageURL: "http://example.com/topgun.jpg",
      releaseYear: 1986,
    },
    {
      _id: "675b07578f311542b0f0437b",
      title: "The Little Mermaid",
      description:
        "A Disney animated classic about a young mermaid's adventures.",
      director: {
        name: "Ron Clements",
        bio: "Ron Clements is an American animator, film director, and screenwriter known for his work on Disney classics.",
        birthyear: "1953-04-25",
      },
      genre: {
        name: "Fantasy",
        description: "Movies involving magical or supernatural elements.",
      },
      imageURL: "http://example.com/littlemermaid.jpg",
      releaseYear: 1989,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div>
      {/* Conditional rendering based on selectedMovie */}
      {selectedMovie ? (
        <MovieView 
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} // Clear selection to return to movie list
        />
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={() => setSelectedMovie(movie)} // Set the clicked movie as selected
          />
        ))
      )}
    </div>
  );
};