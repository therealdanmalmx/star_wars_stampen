import { createContext, useContext, useEffect, useState } from "react";
import {
  Character,
  FilmProp,
  FilmsContextTypes,
  Movie,
  Movies,
} from "../types/types";

const MoviesContext = createContext<FilmsContextTypes>({
  films: [],
  title: "",
  charactersFromFilm: [],
  loading: false,
  getCharactersForMovie: () => {},
});

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }: FilmProp) => {
  const [films, setFilms] = useState<Movies>([]);
  const [title, settTitle] = useState<string>("");

  const [charactersFromFilm, setCharactersFromFilm] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCharactersForMovie = async (film: Movie) => {
    settTitle(film.title);
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
    title,
    charactersFromFilm,
    loading,
    getCharactersForMovie,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
