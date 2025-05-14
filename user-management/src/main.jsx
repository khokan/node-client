import { createBrowserRouter, RouterProvider } from "react-router";

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Main from "./components/Main";

import "./app.css";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Customers from "./components/Customers";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import UpdateUser from "./components/UpdateUser";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "blogs",
        Component: Blogs,
        loader: () => fetch("http://localhost:5000/blogs"),
      },
      {
        path: "blog/:id",
        Component: Blog,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blog/${params.id}`),
      },
      {
        path: "customers",
        Component: Customers,
      },
      {
        path: "users",
        Component: Users,
        loader: () => fetch("http://localhost:5000/users"),
      },
      {
        path: 'users/:id',
        Component: UserDetails,
        loader: ({params})=> fetch(`http://localhost:5000/users/${params.id}`)
      },
      {
        path: 'update/:id',
        Component: UpdateUser,
        loader: ({params})=> fetch(`http://localhost:5000/users/${params.id}`)
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
