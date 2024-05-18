import React from "react";
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
    path: "/film/:id/characters",
    element: <h1>Characters</h1>,
  },
  {
    path: "/film/:id/characters/:id",
    element: <h1>Character</h1>,
  },
]);

export default router;
