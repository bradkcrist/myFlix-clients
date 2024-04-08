import { useState } from 'react';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birth: birth,
    };

    fetch('https://mymovie1-195f3788c76b.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required minLength='6' />
      </label>
      <label>
        Password:
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Birth:
        <input type='date' value={birth} onChange={(e) => setBirth(e.target.value)} required />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};
