export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
        <br />
        <span>Deatils:</span>
        <span>{movie.details}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.bio}</span>
      </div>
      <div>
        <span>Birth: </span>
        <span>{movie.birth}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
