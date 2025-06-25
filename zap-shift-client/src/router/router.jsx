import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignIn from "../components/Authentication/SignIn";
import SignUp from "../components/Authentication/SignUp";
import Home from "../components/Home/Home";
import Coverage from "../components/Services/Coverage";
import SendParcel from "../components/Services/SendParcel";
import PrivateRouter from "./PrivateRouter";
import MyParcels from "../components/Dashboard/MyParcels";
import DashBoardLayout from "../layouts/DashBoardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "sendParcel",
        Component: SendParcel,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <DashBoardLayout />
          </PrivateRouter>
        ),
        children: [
          {
            path: "myParcels",
            Component: MyParcels,
          },
        ],
      },
    ],
  },
]);

export default router;
