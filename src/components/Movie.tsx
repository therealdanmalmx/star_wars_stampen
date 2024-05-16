import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmTitleSlug } from "../../utils/helpers";
import { MoonLoader } from "react-spinners";

type Film = {
  episode_id: number;
  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
};

const Movie = () => {
  const [filmInfo, setFilmInfo] = useState({} as Film);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSingleFilm = async (id: string | undefined) => {
      setLoading(true);
      const response = await fetch(`https://swapi.dev/api/films/${id}`);
      const data = await response.json();
      setFilmInfo(data);
      setLoading(false);
      console.log({ data });
    };
    console.log({ filmInfo });
    getSingleFilm(id);
  }, [id]);

  if (loading) {
    return (
      <div className='h-dvh flex flex-col justify-center items-center'>
        <MoonLoader color={"#FFD700"} loading={loading} size={250} />
        <h1 className='bg-black p-4 text-3xl mt-6 text-yellow-500 font-staatliches'>
          {filmInfo && `Finding ${filmInfo.title}`}
        </h1>
      </div>
    );
  }
  return (
    <div className='m-4 flex bordr border-2 border-black'>
      {filmInfo && filmInfo.title && (
        <div key={filmInfo.episode_id} className='flex justify-between'>
          <img
            src={`/src/assets/${getFilmTitleSlug(filmInfo.title)}.jpg`}
            alt={`${filmInfo.title} image`}
            className='h-[650px] object-cover'
          />
          <div>
            <h1 className='bg-black text-yellow-500 p-8 w-full text-center text-5xl uppercase font-staatliches tracking-widest font-bold'>
              {filmInfo.title}
            </h1>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Synopsis: </p>
              <p className='text-xl'>{filmInfo.opening_crawl}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Director: </p>
              <p className='text-xl'>{filmInfo.director}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Release date: </p>
              <p className='text-xl'>{filmInfo.release_date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
