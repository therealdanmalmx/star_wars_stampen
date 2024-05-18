import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MoviesProvider } from "./contexts/MoviesContext";
import Movies from "./components/Movies";
import SingleMovie from "./components/SingleMovie";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <MoviesProvider>
          <Routes>
            <Route path='/' element={<Movies />} />
            <Route path='/movie/:id' element={<SingleMovie />} />
          </Routes>
        </MoviesProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
