import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Row
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Col>
        <Card className='movie-click'>
          {movie.title}
          {movie.imagepath}
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
  onMovieClick: PropTypes.func.isRequired,
};
