import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { useState, useEffect } from 'react';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('https://mymovie1-195f3788c76b.herokuapp.com/movies', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            description: doc.Description,
            director: doc.Director.Name,
            birth: doc.Director.Birth,
            bio: doc.Director.Bio,
            genre: doc.Genre.Name,
            details: doc.Genre.Description,
            featured: doc.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
