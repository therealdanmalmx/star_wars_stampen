import { useEffect, useState } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { Character } from "../types/types";
import Spinner from "./Spinner";
import { Link, useParams } from "react-router-dom";

const Characters = () => {
  const { movieId } = useParams();
  const { charactersFromFilm } = useMovies();
  const [characterId, setCharacterId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [character, setCharacter] = useState<Character[]>([]);

  const charactersList = Array.from(charactersFromFilm);

  const getAllCharacters = async (filmCharacters: Character[]) => {
    const fetchedCharacters = await Promise.all(
      filmCharacters.map(async (character) => {
        try {
          setLoading(true);
          const response = await fetch(character.toString());
          const data = await response.json();
          const fetchedCharacter: Character = data;

          return fetchedCharacter;
        } catch (error) {
          console.log(error);
        }
      })
    );
    setCharacter(
      fetchedCharacters.filter(
        (character) => character !== undefined
      ) as Character[]
    );

    setLoading(false);
  };
  useEffect(() => {
    getAllCharacters(charactersFromFilm);
  }, [charactersFromFilm]);

  const extractIdFromUrl = (url: string) => {
    const regex = /\/api\/people\/(\d+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className='font-staatliches'>
        <Spinner
          loadingText='The troops are on their way...'
          loading={loading}
        />
      </div>
    );
  }
  if (!charactersList.length) {
    return (
      <div className='h-dvh flex justify-center items-center'>
        <h1 className='my-auto font-staatliches text-4xl text-center'>
          First choose a{" "}
          <span className='text-yellow-500 underline'>
            <Link to='/'>movie</Link>
          </span>{" "}
          to see the characters
        </h1>
      </div>
    );
  }
  return (
    <Link to={`/movie/${movieId}/characters/${characterId}`}>
      <div className='h-dvh py-40 md:mx-96 gap-12 flex flex-wrap justify-center items-start md:justify-start'>
        {character &&
          character.map((char) => (
            <div
              key={char.name}
              className='bg-black size-36 rounded-full text-center flex justify-center items-center'
              onMouseOver={() =>
                setCharacterId(extractIdFromUrl(char.url) ?? "")
              }
            >
              <p className='font-staatliches text-yellow-500 text-2xl text-center w-3/4'>
                {char.name}
              </p>
            </div>
          ))}
      </div>
    </Link>
  );
};

export default Characters;
