import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [films, setFilms] = useState([]);

  const getCharacters = async (film: { characters: string[] }) => {
    const characters = await Promise.all(
      film.characters.map(async (character: string) => {
        const response = await fetch(character);
        const data = await response.json();
        return data;
      })
    );
    console.log(characters);
  };

  useEffect(() => {
    const fetchTheDarkSide = async () => {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
      setFilms(data.results);
      console.log(data.results);
    };
    fetchTheDarkSide();
  }, []);

  return (
    <>
      {films.map((film: { title: string; characters: string[] }) => {
        return <h1 onClick={() => getCharacters(film)}>{film.title}</h1>;
      })}
    </>
  );
}

export default App;
