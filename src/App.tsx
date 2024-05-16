import { useEffect, useState } from "react";
import "./App.css";

type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
}

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setChatacters] = useState<Character[]>([]);
  const starWarsAPI = 'https://swapi.dev/api/'

  const getFilmTitleSlug = (title: string) => {
    return title.toLowerCase().replace(/ /g, "-");
  };


  const getCharacters = async (film: { characters: string[] }) => {
    const characters: Character[] = await Promise.all(
      film.characters.map(async (character: string) => {
        const response = await fetch(character);
        const data = await response.json();
        return data;
      })
    );
    setChatacters(characters);
    console.log(characters);
  };
 
  useEffect(() => {
    const fetchTheDarkSide = async () => {
      const response = await fetch(`${starWarsAPI}/films`);
      const data = await response.json();
      setFilms(data.results);
      console.log(data.results);
    };
    fetchTheDarkSide();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-12 w-full justify-between px-12 ">
      {films.map((film: { title: string; characters: string[] }) => (
        <>
        <div className="flex flex-col cursor-pointer" onClick={() => getCharacters(film)}>
          <img src={`src/assets/${getFilmTitleSlug(film.title)}.jpg`} alt={`${film.title} image`} className="h-[500px] object-cover"/>
          <h1 className="text-xl">{film.title}</h1>
        </div>
        </>
      ))}
      <div className="col-span-3 overflow-x-scroll flex">
        {characters.map((character) => (
            <div className="size-36 rounded-full bg-gray-500 mx-2">{character.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;