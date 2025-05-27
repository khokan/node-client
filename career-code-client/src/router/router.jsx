import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import Home from "../components/pages/Home/Home";

const router = createBrowserRouter([
    {
      path: "/",
      Component: MainLayout,
      children: [        
        {
          index:true, Component: Home
        },
        {
            path: "signin",
            Component: SignIn,
          },
          {
            path: "signup",
            Component: SignUp,
          },
      ],
    },
  ]);

  export default router;