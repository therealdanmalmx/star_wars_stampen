import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Movies from './components/Movies';
import Movie from './components/Movie';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/movie/:id",
    element: <Movie />,
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
