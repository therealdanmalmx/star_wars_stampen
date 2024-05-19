import { Link } from "react-router-dom";
import { useMovies } from "../contexts/MoviesContext";
import { Movie } from "../types/types";
import { getFilmTitleSlug } from "../utils/helpers";
import Spinner from "./Spinner";

const Movies = () => {
  const { films, loading, getCharactersForMovie } = useMovies();

  if (loading) {
    return (
      <div className='h-96 font-staatliches'>
        <div className='h-96 mx-6 md:m-0 '>
          <Spinner
            loadingText='The force will soon be with you...'
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='h-dvh py-40 md:mx-96 gap-12 flex flex-wrap justify-center items-start md:justify-between'>
      {films.map((film: Movie, index) => (
        <Link to={`/movie/${index + 1}`} key={film.episode_id}>
          <div
            className='flex flex-col cursor-pointer'
            onClick={() => getCharactersForMovie(film)}
          >
            <img
              src={`src/assets/${getFilmTitleSlug(film.title)}.jpg`}
              alt={`${film.title} image`}
              className='max-h-[500px] object-cover'
            />
            <h1 className='text-2xl text-center bg-black w-full font-staatliches text-yellow-500 p-4 md:p-8'>
              {film.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Movies;
