import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'The Hobbit: An Unexpected Journey',
      description:
        'A reluctant hobbit named Bilbo Baggins is swept into a quest by the wizard Gandalf. Joining a company of dwarves led by Thorin Oakenshield, Bilbo embarks on a perilous journey to reclaim the Lonely Mountain and its treasure from the fearsome dragon Smaug.',
      genre:
        'Fantasy, Fantasy movie is a film genre that showcases imaginative and otherworldly elements, often featuring magical realms, mythical creatures, and extraordinary events that transcend the boundaries of reality.',
      director: 'Peter Jackson',
      bio: 'New Zealander director and screenwriter',
      birth: '10-31-1961',
    },
    {
      id: 2,
      title: 'The Hobbit: The Desolation of Smaug',
      description:
        'Bilbo Baggins navigates perilous landscapes and encounters dangerous creatures as he joins a quest to reclaim treasure guarded by the dragon Smaug. Unraveling secrets and testing alliances, the journey becomes a thrilling adventure where friendships are forged and courage is tested in the heart of Middle-earth.',
      genre:
        'Fantasy, Fantasy movie is a film genre that showcases imaginative and otherworldly elements, often featuring magical realms, mythical creatures, and extraordinary events that transcend the boundaries of reality.',
      director: 'Peter Jackson',
      bio: 'New Zealander director and screenwriter',
      birth: '10-31-1961',
    },
    {
      id: 3,
      title: 'The Hobbit: The Battle of The Five Armies',
      description:
        "Middle-earth is thrown into a spectacular war as the Smaug's wrath unleashes chaos. Heroes and races clash for control of the Lonely Mountain, leading to a climactic battle that will determine the fate of the realm. Loyalties are tested, sacrifices made, and destinies fulfilled in this epic conclusion to Bilbo Baggins's extraordinary journey",
      genre:
        'Fantasy, Fantasy movie is a film genre that showcases imaginative and otherworldly elements, often featuring magical realms, mythical creatures, and extraordinary events that transcend the boundaries of reality.',
      director: 'Peter Jackson',
      bio: 'New Zealander director and screenwriter',
      birth: '10-31-1961',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
