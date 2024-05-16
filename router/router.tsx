import { createBrowserRouter } from "react-router-dom";
import Movie from "../src/components/Movie";
import Movies from "../src/components/Movies";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/movie/:id",
    element: <Movie />,
  },
  {
    path: "/characters",
    element: <h1>Characters</h1>,
  },
]);

export default router;
