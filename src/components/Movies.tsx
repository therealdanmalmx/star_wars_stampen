import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import { getFilmTitleSlug } from "../../utils/helpers";
import Movie from "./Movie";
import Spinner from "./Spinner";

type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
};

const Movies = () => {
  const [films, setFilms] = useState([]);
  const [characters, setChatacters] = useState<Character[]>([]);
  const [filmTitle, setFilmTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const starWarsAPI = "https://swapi.dev/api/";

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
  };

  useEffect(() => {
    const fetchTheDarkSide = async () => {
      setLoading(true);
      const response = await fetch(`${starWarsAPI}/films`);
      const data = await response.json();
      setFilms(data.results);
      setLoading(false);
      console.log(data.results);
    };
    fetchTheDarkSide();
  }, []);

  if (loading) {
    return (
      <div className='font-staatliches'>
        <Spinner
          loadingText='The force will soon be with you...'
          loading={loading}
        />
      </div>
    );
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mx-6 md:mx-96 justify-center items-start'>
      {films.map(
        (
          film: { title: string; characters: string[]; episode_id: number },
          index
        ) => (
          <Link to={`/movie/${index + 1}`} key={film.episode_id}>
            <div
              className='flex flex-col cursor-pointer'
              onMouseOver={() => getCharacters(film)}
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
        )
      )}
    </div>
  );
};

export default Movies;
