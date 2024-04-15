import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movie, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  return (
    <Row className='justify-content-md-center'>
      <>
        {!user ? (
          <>
            <Col md={5}>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
              or
              <SignupView />
            </Col>
          </>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          </Col>
        ) : movie.length === 0 ? (
          <div>The list is empty</div>
        ) : (
          <div>
            <Button
              className='logout-btn'
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
            {movie.map((movie) => (
              <Col key={movie.id} md={3}>
                <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)} />
              </Col>
            ))}
          </div>
        )}
      </>
    </Row>
  );
};
