import React, { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ movies, favoriteMovieIds }) => {
  console.log(movies);
  console.log(favoriteMovieIds);
  let favoriteMovies = (movies || []).filter((m) => favoriteMovieIds.includes(m.id));
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://mymovie1-195f3788c76b.herokuapp.com/users', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((users) => {
        const loggedInUser = users.find((u) => u.Username === storedUser.Username);
        setUser(loggedInUser);
        setUsername(loggedInUser.Username);
        setEmail(loggedInUser.Email);
      });
  }, [user]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedInfo = { username, password, email };

    fetch(`https://mymovie1-195f3788c76b.herokuapp.com/users/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Profile Updated!');
        setUser(data);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleDeregister = () => {
    fetch(`https://mymovie1-195f3788c76b.herokuapp.com/users/${username}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('User Deleted');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      test
      {user ? (
        <div>
          <h1>User Profile</h1>
          <form onSubmit={handleUpdate}>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <button type='submit'>Update Profile</button>
          </form>
          <button onClick={handleDeregister}>Delete Profile</button>
          <h2>Favorite Movies</h2>
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
