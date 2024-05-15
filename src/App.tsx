import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [films, setFilms] = useState([]);

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
      {films.map((film: { title: string }) => {
        return <h1>{film.title}</h1>;
      })}
    </>
  );
}

export default App;
