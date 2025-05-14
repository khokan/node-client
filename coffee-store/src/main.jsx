import { createBrowserRouter, RouterProvider } from "react-router";

import React, { Component, StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Home from "./components/Home";
import UpdateCoffee from "./components/UpdateCoffee";
import AddCoffee from "./components/AddCoffee";
import MainLayout from "./layouts/MainLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
       index: true, 
       Component: Home,
      },      
      {
          path: 'add-coffee',
          Component: AddCoffee
      },
      {
          path: 'update-coffee',
          Component: UpdateCoffee
      }     
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
