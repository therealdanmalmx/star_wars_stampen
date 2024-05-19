import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../types/types";
import Spinner from "./Spinner";

const SingleCharacter = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [character, setCharacter] = useState<Character>({} as Character);
  const { characterId } = useParams();

  const getSingleCharacter = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/${characterId}`
      );
      const data = await response.json();
      setCharacter(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCharacter();
  }, [characterId]);

  if (loading) {
    return <Spinner loadingText={`Loading character...`} loading={loading} />;
  }

  return (
    <div className='flex justify-center mx-auto  w-11/12 md:w-1/2 border-black'>
      {character && (
        <div
          key={character.name}
          className='my-40 flex w-full justify-center items-center border-2 border-black'
        >
          <div className='w-full'>
            <h1 className='bg-black text-yellow-500 p-8 text-center text-5xl uppercase font-staatliches tracking-widest font-bold'>
              {character.name}
            </h1>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Birth year: </p>
              <p className='text-xl'>{character.birth_year}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Gender: </p>
              <p className='text-xl'>{character.gender}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Mass: </p>
              <p className='text-xl'>{character.mass}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Height: </p>
              <p className='text-xl'>{character.height}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Skin color: </p>
              <p className='text-xl'>{character.skin_color}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Eye color: </p>
              <p className='text-xl'>{character.eye_color}</p>
            </div>
            <div className='flex items-start text-xl space-x-4 m-6'>
              <p className='font-bold'>Hair color: </p>
              <p className='text-xl'>{character.hair_color}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCharacter;
