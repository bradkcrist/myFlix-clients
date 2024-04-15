import { Card, Button } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className='movie-card'>
      <Card.Body>
        <Card.Img className='movie-img' variant='top' src={movie.image} width={100} height={700} />
        <Card.Title className='title'>{movie.title}</Card.Title>
        <Card.Subtitle className='title-info'>Description:</Card.Subtitle>
        <Card.Text className='movie-info'>{movie.description}</Card.Text>
        <Card.Subtitle className='title-info'>Genre:</Card.Subtitle>
        <Card.Text className='movie-info'>{movie.genre}</Card.Text>
        <Card.Text className='movie-info'>{movie.details}</Card.Text>
        <Card.Subtitle className='title-info'>Director:</Card.Subtitle>
        <Card.Text className='movie-info'>{movie.director}</Card.Text>
        <Card.Text className='movie-info'>{movie.bio}</Card.Text>
        <Card.Text className='movie-info'>{movie.birth}</Card.Text>
        <Button className='movie-btn' onClick={onBackClick}>
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};
