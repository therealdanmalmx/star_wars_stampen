import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies";
import SingleMovie from "./components/SingleMovie";
import { MoviesProvider } from "./contexts/MoviesContext";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Providers>
                <Movies />
              </Providers>
            }
          />
          <Route
            path='/movie/:id'
            element={
              <Providers>
                <SingleMovie />
              </Providers>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

interface ProvidersProps {
  children: JSX.Element;
}
const Providers = ({ children }: ProvidersProps): React.ReactElement => (
  <MoviesProvider>
    <MovieProvider>{children}</MovieProvider>
  </MoviesProvider>
);

export default App;
