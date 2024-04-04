import React from 'react';

export const LoginView = ({ onLoggedIn }) => {
  const data = {
    access: username,
    secret: password,
  };

  fetch('https://mymovie1-195f3788c76b.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Login response:', data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert('No such user');
      }
    })
    .catch((e) => {
      alert('Something went wrong');
    });
};
