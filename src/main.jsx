import { createBrowserRouter, RouterProvider } from "react-router";

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Phones from "./components/Phones";
import Main from "./components/Main";

import "./app.css";
import Phone from "./components/Phone";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "phones",
        Component: Phones,
        loader: () => fetch("http://localhost:5000/blogs"),
      },
      {
        path: "phone/:id",
        Component: Phone,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blogs/${params.id}`),
      },
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
