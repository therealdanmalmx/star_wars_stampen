import { useEffect, useState } from "react";
import { getFilmTitleSlug } from "../utils/helpers";
import Spinner from "./Spinner";

import { useParams } from "react-router-dom";
import { Movie } from "../types/types";

const SingleMovie = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState<boolean>(false);

  const getSingleFilm = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/films/${id}`);
      console.log({ response });
      const data = await response.json();
      setFilm(data);
      setLoading(false);
    } catch (error) {
      throw new Error(`Failed to fetch film from ${id}`);
    }
  };

  useEffect(() => {
    getSingleFilm();
  }, [id]);

  if (loading) {
    return (
      <div className='font-staatliches'>
        <Spinner loadingText='Loading...' loading={loading} />;
      </div>
    );
  }

  if (!id) {
    return (
      <div className='h-dvh flex justify-center items-center'>
        <h1 className='font-staatliches text-4xl text-center'>
          Could not find a movie with the id of{" "}
          <span className='font-bold'>{id}</span>
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
    <div className='m-4 flex bordr border-2 border-black'>
      {film && (
        <div key={film.episode_id} className='flex justify-between'>
          <img
            src={`/src/assets/${getFilmTitleSlug(film.title)}.jpg`}
            alt={`${film.title} image`}
            className='h-[650px] object-cover'
          />
          <div>
            <h1 className='bg-black text-yellow-500 p-8 w-full text-center text-5xl uppercase font-staatliches tracking-widest font-bold'>
              {film.title}
            </h1>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Synopsis: </p>
              <p className='text-xl'>{film.opening_crawl}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Director: </p>
              <p className='text-xl'>{film.director}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Producers: </p>
              <p className='text-xl'>{film.producer}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Release date: </p>
              <p className='text-xl'>{film.release_date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMovie;
