import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import { getFilmTitleSlug } from "../utils/helpers";
import Spinner from "./Spinner";

const SingleMovie = () => {
  const { film, loading } = useContext(MovieContext);
  console.log({ film, loading });

  if (loading) {
    return (
      <div className='font-staatliches'>
        <Spinner loadingText='Loading...' loading={loading} />;
      </div>
    );
  }

  return (
    <div className='m-4 flex border-2 border-black'>
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
