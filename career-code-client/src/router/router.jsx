import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import Home from "../components/pages/Home/Home";
import JobDetails from "../components/pages/Jobs/JobDetails";
import ApplyJobs from "../components/pages/Jobs/ApplyJobs";
import MyApplications from "../components/pages/Jobs/MyApplications";
import AddJob from "../components/pages/Jobs/AddJob";
import PrivateRouter from "./PrivateRouter";
import MyPostedJobs from "../components/pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../components/pages/MyPostedJobs/ViewApplications";

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
        path: "addJob",
        element: (
          <PrivateRouter>
            <AddJob />
          </PrivateRouter>
        ),
      },
      {
        path: "myPostedJobs",
        element: (
          <PrivateRouter>
            <MyPostedJobs />
          </PrivateRouter>
        ),
      },
      {
        path: "/applications/:job_id",
        element: (
          <PrivateRouter>
            <ViewApplications></ViewApplications>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_NODE_SERVER_URL}/applications/jobs/${
              params.job_id
            }`
          ),
      },
      {
        path: "/jobs/:id",
        Component: JobDetails,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_NODE_SERVER_URL}/jobs/${params.id}`),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRouter>
            <ApplyJobs />
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_NODE_SERVER_URL}/jobs/${params.id}`),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRouter>
            <MyApplications />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
