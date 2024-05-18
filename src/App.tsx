import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import { FilmProvider } from "./contexts/MoviesContext";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <FilmProvider>
          <Routes>
            <Route path='/' element={<Movies />} />
            <Route path='/movie/:id' element={<Movie />} />
          </Routes>
        </FilmProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
