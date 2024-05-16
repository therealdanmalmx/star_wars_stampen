import React, { useEffect, useState } from 'react'
import MoonLoader from "react-spinners/MoonLoader";


type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
}

const Movies = () => {
  const [films, setFilms] = useState([]);
  const [characters, setChatacters] = useState<Character[]>([]);
  const [filmTitle, setFilmTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const starWarsAPI = 'https://swapi.dev/api/'

  const getFilmTitleSlug = (title: string) => {
    return title.toLowerCase().replace(/ /g, "-");
  };


  const getCharacters = async (film: { characters: string[], title: string }) => {
    const characters: Character[] = await Promise.all(
      film.characters.map(async (character: string) => {
        const response = await fetch(character);
        const data = await response.json();
        return data;
      })
    );
    setFilmTitle(film.title);
    setChatacters(characters);
    console.log(characters);
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
        <MoonLoader
          color={"#FFD700"}
          loading={loading}
          size={250}
          title='Finding the force...'
        />
        <h1 className='bg-black p-4 text-3xl mt-6 text-yellow-500 font-staatliches'>Finding the force...</h1>
      </div>
    )
  }
  return (

    <div className="grid grid-col-1 md:grid-cols-3 gap-x-4 gap-y-12 justify-center md:justify-between">
    {films.map((film: { title: string; characters: string[] }) => (
      <div key={film.title} className="flex flex-col cursor-pointer" onMouseOver={() => getCharacters(film)}>
        <img src={`src/assets/${getFilmTitleSlug(film.title)}.jpg`} alt={`${film.title} image`} className="h-[450px] object-cover"/>
        <h1 className="text-2xl text-center bg-black w-full font-staatliches text-yellow-500 p-4 md:p-8">{film.title}</h1>
      </div>
    ))}
      {/* { films.length && characters.length ? (<h1 className="text-3xl font-bold col-span-3">Charaters in <span className="py-4 px-6 text-yellow-500 bg-black text-staatliches">{filmTitle}</span></h1>) :
      (<h1 className="text-3xl font-bold col-span-3">Hover over a movie to see the characters</h1>)
    }
    <div className="col-span-3 w-full overflow-x-scroll flex [&::-webkit-scrollbar]:hidden">
      {characters && characters.map((character) => (
        <>
          <div key={character.name} className="flex justify-center items-center min-w-32 min-h-32 rounded-full bg-black  mx-2">
            <div className="w-3/4 text-center text-yellow-500 font-bold text-staatliches">{character.name}</div>
          </div>
        </>
      ))  }
    </div> */}
  </div>
  )
}

export default Movies