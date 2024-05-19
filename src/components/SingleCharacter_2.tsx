import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../types/types";
import Spinner from "./Spinner";

const SingleCharacter = () => {
  if (loading) {
    return <Spinner loadingText={`Loading character...`} loading={loading} />;
  }

  return (
    <div className='m-4 flex justify-center mx-auto border-2 w-11/12 md:w-1/2 border-black'>
      {character && (
        <div
          key={character.name}
          className='flex w-full justify-center items-center'
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
