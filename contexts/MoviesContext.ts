import React, { createContext, useState, useEffect } from "react";

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

type Character = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
};

const FilmContext = createContext({
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
      const [selectedFilm, setSelectedFilm] = useState(null);
      const [characters, setChatacters] = useState<Character[]>([]);
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
          setChatacters(characters);
          console.log(characters);
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
  };

  return (
    <FilmContext.Provider value={contextValue}>{children}</FilmContext.Provider>
  );
};

export default FilmContext;


function setFilmTitle(title: string) {
    throw new Error("Function not implemented.");
}
