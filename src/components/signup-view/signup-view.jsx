import { useState } from 'react';
import { Form, Container, Row, Col, Card, Button } from 'react-bootstrap';

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
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Title className='signup'>Sign-Up Page</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className='signup'>Username:</Form.Label>
                <Form.Control className='signup-bubble' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required minLength='6' placeholder='Enter Username' />
              </Form.Group>
              <Form.Group>
                <Form.Label className='signup'>Password:</Form.Label>
                <Form.Control className='signup-bubble' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Enter Password' />
              </Form.Group>
              <Form.Group>
                <Form.Label className='signup'>Email:</Form.Label>
                <Form.Control className='signup-bubble' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter Email' />
              </Form.Group>
              <Form.Group>
                <Form.Label className='signup'>Birth:</Form.Label>
                <Form.Control className='signup-bubble' type='date' value={birth} onChange={(e) => setBirth(e.target.value)} required placeholder='Enter Birthday' />
              </Form.Group>
              <Button className='signup-btn' type='submit'>
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
