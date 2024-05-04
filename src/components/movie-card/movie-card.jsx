import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addTitle, setAddTitle] = useState('');
  const [delTitle, setDelTitle] = useState('');

  useEffect(() => {
    const addToFavorites = () => {
      fetch(`https://mymovie1-195f3788c76b.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, {
        method: 'POST',
        // body: JSON.stringify(favoriteMoviesData),
        headers: { Authorization: `Bearer ${storedToken}`, 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add movie to favorites.');
          }
          alert('Movie added to favorites successfully!');
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const removeFromFavorites = () => {
      fetch(`https://mymovie1-195f3788c76b.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${storedToken}`, 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to remove movie from favorites.');
          }
          alert('Movie removed from favorites successfully!');
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (addTitle) {
      addToFavorites();
    }
    if (delTitle) {
      removeFromFavorites();
    }
  }, [addTitle, delTitle, token]);

  const handleAddToFavorites = () => {
    setAddTitle(movie.title);
  };

  const handleRemoveFromFavorites = () => {
    setDelTitle(movie.title);
  };

  return (
    <Row>
      <Col>
        <Card className='movie-click'>
          <Card.Body>
            <Card.Img src={movie.image} width='50' />
            <Card.Title>{movie.title}</Card.Title>
            <Link to={`/movie/${encodeURIComponent(movie.id)}`}>
              <Button>Open</Button>
            </Link>
            <Card>
              {isFavorite ? (
                <Button variant='primary' onClick={handleRemoveFromFavorites}>
                  Remove from favorites
                </Button>
              ) : (
                <Button variant='primary' onClick={handleAddToFavorites}>
                  Add to favorites
                </Button>
              )}
            </Card>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.number,
    }),
    featured: PropTypes.string,
  }).isRequired,
};
