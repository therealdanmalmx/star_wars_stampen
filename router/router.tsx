import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Characters from "../src/components/Characters";
import Movies from "../src/components/Movies";
import SingleCharacter from "../src/components/SingleCharacter";
import SingleMovie from "../src/components/SingleMovie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/movie/:movieId",
    element: <SingleMovie />,
  },
  {
    path: "/movie/:movieId/characters",
    element: <Characters />,
  },
  {
    path: "/movie/:movieId/characters/:characterId",
    element: <SingleCharacter />,
  },
]);

export default router;
