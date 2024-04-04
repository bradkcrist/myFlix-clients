import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { useState, useEffect } from 'react';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movie, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://mymovie1-195f3788c76b.herokuapp.com/movies', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImagePath,
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
  }, [token]);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movie.length === 0) {
    return <div>The list is empty</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
      {movie.map((movie) => {
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
