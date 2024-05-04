import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();

  const movies = movie.find((m) => m.id === movieId);

  return (
    <Card className='movie-card'>
      <Card.Body>
        <Card.Img className='movie-img' variant='top' src={movies.image} width={100} height={700} />
        <Card.Title className='title'>{movies.title}</Card.Title>
        <Card.Subtitle className='title-info'>Description:</Card.Subtitle>
        <Card.Text className='movie-info'>{movies.description}</Card.Text>
        <Card.Subtitle className='title-info'>Genre:</Card.Subtitle>
        <Card.Text className='movie-info'>{movies.genre}</Card.Text>
        <Card.Text className='movie-info'>{movies.details}</Card.Text>
        <Card.Subtitle className='title-info'>Director:</Card.Subtitle>
        <Card.Text className='movie-info'>{movies.director}</Card.Text>
        <Card.Text className='movie-info'>{movies.bio}</Card.Text>
        <Card.Text className='movie-info'>{movies.birth}</Card.Text>
        <Link to={`/`}>
          <button className='back-button'>Back</button>
        </Link>
      </Card.Body>
    </Card>
  );
};
