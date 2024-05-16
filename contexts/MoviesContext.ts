import React, { createContext, useState, useEffect } from "react";

type Character = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
  };

  interface FilmContextType {
    films: any[];
    characters: Character[];
    selectedFilm: any;
    setSelectedFilm: (film: any) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    starWarsAPI: string;
    getCharacters: (film: { characters: string[]; title: string }) => void;
  }
const FilmContext = createContext<FilmContextType>({
  films: [],
  characters: [],
  selectedFilm: null,
  setSelectedFilm: () => {},
  loading: false,
  setLoading: () => {},
  starWarsAPI: "",
});

export const FilmProvider = ({ children, starWarsAPI = "https://swapi.dev/api/" }) => {
  const [films, setFilms] = useState([]);
  const [filmTitle, setFilmTitle] = useState("");
const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTheDarkSide = async () => {
      setLoading(true);
      const response = await fetch(`${starWarsAPI}/films`);
      const data = await response.json();
      setFilms(data.results);
      setLoading(false);
    };
    fetchTheDarkSide();
  }, [starWarsAPI]);

  const getCharacters = async (film: {
    characters: string[];
    title: string;
  }) => {
    const characters: Character[] = await Promise.all(
      film.characters.map(async (character: string) => {
        const response = await fetch(character);
        const data = await response.json();
        return data;
      })
    );
    setFilmTitle(film.title);
    setCharacters(characters);
  };

  const contextValue = {
    films,
    characters,
    selectedFilm,
    setSelectedFilm,
    loading,
    setLoading,
    starWarsAPI,
    getCharacters,
    filmTitle
  };

  return (
    <FilmContext.Provider value={contextValue}>{children}</FilmContext.Provider>
  );
};

export default FilmContext;

