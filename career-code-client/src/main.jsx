import { RouterProvider } from "react-router";

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./contexts/AuthProvider";
import "./index.css";
import router from "./router/router";



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>
);
