import React from "react";
import Card from "../Card/Card";

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
