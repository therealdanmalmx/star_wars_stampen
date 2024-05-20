import { useEffect, useState } from "react";
import { getFilmTitleSlug } from "../utils/helpers";
import Spinner from "./Spinner";

import { Link, useParams } from "react-router-dom";
import { Movie } from "../types/types";
import { useMovies } from "../contexts/MoviesContext";

const SingleMovie = () => {
  const { title } = useMovies();
  const { movieId } = useParams();
  const [film, setFilm] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState<boolean>(false);

  const getSingleFilm = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/films/${movieId}`);
      const data = await response.json();
      setFilm(data);
      setLoading(false);
    } catch (error) {
      throw new Error(`Failed to fetch film from ${movieId}`);
    }
  };

  useEffect(() => {
    getSingleFilm();
  }, [movieId]);

  if (loading) {
    return (
      <div className='font-staatliches'>
        <Spinner loadingText={`Loading ${title}`} loading={loading} />;
      </div>
    );
  }

  if (!movieId) {
    return (
      <div className='h-dvh flex justify-center items-center'>
        <h1 className='font-staatliches text-4xl text-center'>
          Could not find a movie with the id of{" "}
          <span className='font-bold'>{movieId}</span>
        </h1>
      </div>
    );
  }
  if (!film.title) {
    return (
      <div className='h-dvh flex justify-center items-center'>
        <h1 className='font-staatliches text-4xl text-center'>
          Loading {film.title}
        </h1>
      </div>
    );
  }
  return (
    <div className='py-40 px-6 md:px-12 flex'>
      {film && (
        <div
          key={film.episode_id}
          className='flex flex-col md:flex-row justify-between  border-2 border-black'
        >
          <img
            src={`/images/${getFilmTitleSlug(film.title)}.jpg`}
            alt={`${film.title} image`}
            height={650}
            width={330}
            className='h-[650px] w-fit object-cover'
          />
          <div>
            <h1 className='bg-black text-yellow-500 px-8 py-6 w-full text-center h-fit text-3xl md:text-5xl uppercase font-staatliches tracking-widest font-bold'>
              {film.title}
            </h1>
            <div className='md:grid-col-2 grid-col-1 text-xl space-x-0 m-6'>
              <p className='md:grid-col-1 font-bold'>Synopsis: </p>
              <p className='text-xl'>{film.opening_crawl}</p>
            </div>
            <div className='md:grid-col-2 grid-col-1 text-xl space-x-0 m-6'>
              <p className='font-bold'>Director: </p>
              <p className='text-xl'>{film.director}</p>
            </div>
            <div className='md:grid-col-2 grid-col-1 text-xl space-x-0 m-6'>
              <p className='font-bold'>Producers: </p>
              <p className='text-xl'>{film.producer}</p>
            </div>
            <div className='md:grid-col-2 grid-col-1 text-xl space-x-0 m-6'>
              <p className='font-bold'>Release date: </p>
              <p className='text-xl'>{film.release_date}</p>
            </div>
            <div className='m-6'>
              <Link to={`/movie/${movieId}/characters`} key={film.episode_id}>
                <button className='m-8 mx-auto md:w-fit w-full bg-black text-yellow-500 font-staatliches py-2 px-4'>
                  See Characters
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMovie;
