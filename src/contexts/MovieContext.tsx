import { createContext, useEffect, useState } from "react";
import { FilmContextTypes, FilmProp, Movie } from "../types/types";
import { useParams } from "react-router-dom";

const MovieContext = createContext<FilmContextTypes>({
  film: {} as Movie,
  loading: false,
  getSingleFilm: () => {},
});

export const MovieProvider = ({ children }: FilmProp) => {
  const [film, setFilm] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const getSingleFilm = async () => {
    if (id?.toString()) {
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/films/${id}`);
        const data = await response.json();
        setFilm(data);
        setLoading(false);
      } catch (error) {
        throw new Error(`Failed to fetch film from ${id}`);
      }
    }
  };

  useEffect(() => {
    getSingleFilm();
  }, []);

  const contextValue: FilmContextTypes = {
    film,
    loading,
    getSingleFilm,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
