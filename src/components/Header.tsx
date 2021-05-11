import { useState, useEffect } from 'react';

import '../styles/content.scss';

import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Header({state}) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${state.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${state.selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [state.selectedGenreId]);

  return(
      <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header> 
  )
}