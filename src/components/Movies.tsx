import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import { getFilmTitleSlug } from "../../utils/helpers";
import Movie from "./Movie";

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
      <div className='h-dvh flex flex-col justify-center items-center'>
        <MoonLoader color={"#FFD700"} loading={loading} size={250} />
        <h1 className='bg-black p-4 text-3xl mt-6 text-yellow-500 font-staatliches'>
          The force will soon be with you...
        </h1>
      </div>
    );
  }
  return (
    <div className='h-dvh grid grid-col-1 md:grid-cols-3 gap-x-4 gap-y-12 justify-center md:justify-between'>
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
            <Movie film={film} />
          </Link>
        )
      )}
    </div>
  );
};

export default Movies;
