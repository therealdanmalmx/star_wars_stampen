import { createContext, useContext, useEffect, useState } from "react";
import {
  Character,
  FilmsContextTypes,
  FilmProp,
  Movie,
  Movies,
} from "../types/types";

const CharactersContext = createContext<FilmsContextTypes>({
  films: [],
  charactersFromFilm: [],
  loading: false,
  getCharactersForMovie: () => {},
});

export const useCharacters = () => useContext(CharactersContext);

export const CharactersProvider = ({ children }: FilmProp) => {
  const [films, setFilms] = useState<Movies>([]);
  const [charactersFromFilm, setCharactersFromFilm] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCharactersForMovie = async (film: Movie) => {
    setCharactersFromFilm(film.characters);
  };

  const fetchTheDarkSide = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Failed to fetch the Star Wars films.");
      }
      const data = await response.json();
      setFilms(data.results);
      setLoading(false);
    } catch (error) {
      throw new Error(
        "Something went wrong while fetching the films. Try again later."
      );
    }
  };
  useEffect(() => {
    fetchTheDarkSide();
  }, []);

  const contextValue: FilmsContextTypes = {
    films,
    charactersFromFilm,
    loading,
    getCharactersForMovie,
  };

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  );
};

export default CharactersContext;
