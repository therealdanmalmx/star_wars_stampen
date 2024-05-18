import { createContext, useContext, useEffect, useState } from "react";
import {
  Character,
  FilmsContextTypes,
  FilmProp,
  Movie,
  Movies,
} from "../types/types";

const MoviesContext = createContext<FilmsContextTypes>({
  films: [],
  characters: [],
  loading: false,
  getCharacters: () => {},
});

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }: FilmProp) => {
  const [films, setFilms] = useState<Movies>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const getCharacters = async (film: Movie) => {
  //   const characters: Character[] = await Promise.all(
  //     film.characters.map(async (character) => {
  //       const characterUrl = character.url;
  //       const response = await fetch(characterUrl);
  //       const data = await response.json();
  //       return data;
  //     })
  //   );
  //   setFilmTitle(film.title);
  //   setCharacters(characters);
  // };

  const getCharacters = async (film: Movie) => {
    try {
      const characters: Character[] = await Promise.all(
        film.characters.map(async (character) => {
          const characterUrl = character.url;
          const response = await fetch(characterUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch character ${character.name}`);
          }
          const data = await response.json();
          return data;
        })
      );
      setCharacters(characters);
    } catch (error) {
      throw new Error(`Failed to fetch characters for ${film.title}`);
    }
  };

  useEffect(() => {
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
    fetchTheDarkSide();
  }, []);

  const contextValue: FilmsContextTypes = {
    films,
    characters,
    loading,
    getCharacters,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
