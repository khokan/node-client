import { RouterProvider } from "react-router";

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./contexts/AuthProvider";
import "./index.css";
import router from "./router/router";
import { Toaster } from "react-hot-toast";


const root = document.getElementById("root");
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <div className="urbanist-font max-w-7xl mx-auto">
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  </StrictMode>
);
