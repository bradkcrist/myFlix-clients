import { React } from 'react';
import { useState } from 'react';
import { Form, Container, Row, Col, Card, Button } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
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

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Title className='login'>Login Page</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className='login'>Username:</Form.Label>
                <Form.Control className='login-bubble' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required placeholder='Enter Username' />
              </Form.Group>
              <Form.Group>
                <Form.Label className='login'>Password:</Form.Label>
                <Form.Control className='login-bubble' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Enter Password' />
              </Form.Group>
              <Button className='login-btn' type='submit'>
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
