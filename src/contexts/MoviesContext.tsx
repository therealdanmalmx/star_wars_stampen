import { createContext, useContext, useEffect, useState } from "react";
import {
  Character,
  FilmContextTypes,
  FilmProp,
  Film,
  Films,
} from "../types/types";

const FilmContext = createContext<FilmContextTypes>({
  films: [],
  characters: [],
  loading: false,
  getCharacters: () => {},
  filmTitle: "",
});

export const useMovies = () => useContext(FilmContext);

export const FilmProvider = ({ children }: FilmProp) => {
  const [films, setFilms] = useState<Films>([]);
  const [filmTitle, setFilmTitle] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCharacters = async (film: Film) => {
    const characters: Character[] = await Promise.all(
      film.characters.map(async (character) => {
        const characterUrl = character.url;
        const response = await fetch(characterUrl);
        const data = await response.json();
        return data;
      })
    );
    setFilmTitle(film.title);
    setCharacters(characters);
  };

  useEffect(() => {
    const fetchTheDarkSide = async () => {
      setLoading(true);
      const response = await fetch("https://swapi.dev/api/films");
      console.log({ response });
      const data = await response.json();
      setFilms(data.results);
      setLoading(false);
    };
    fetchTheDarkSide();
  }, []);

  const contextValue: FilmContextTypes = {
    films,
    characters,
    loading,
    getCharacters,
    filmTitle,
  };

  return (
    <FilmContext.Provider value={contextValue}>{children}</FilmContext.Provider>
  );
};

export default FilmContext;
