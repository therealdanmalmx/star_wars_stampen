import { BrowserRouter, Route, Routes } from "react-router-dom";
import Characters from "./components/Characters";
import Movies from "./components/Movies";
import SingleCharacter from "./components/SingleCharacter";
import SingleMovie from "./components/SingleMovie";
import { MoviesProvider } from "./contexts/MoviesContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <MoviesProvider>
          <Routes>
            <Route path='/' element={<Movies />} />
            <Route path='/movie/:movieId' element={<SingleMovie />} />
            <Route path='/movie/:movieId/characters' element={<Characters />} />
            <Route
              path='/movie/:movieId/characters/:characterId'
              element={<SingleCharacter />}
            />
          </Routes>
        </MoviesProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
