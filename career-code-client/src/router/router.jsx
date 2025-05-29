import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import Home from "../components/pages/Home/Home";
import JobDetails from "../components/pages/Jobs/JobDetails";
import ApplyJobs from "../components/pages/Jobs/ApplyJobs";
import MyApplications from "../components/pages/Jobs/MyApplications";

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

          {
            path: "/jobs/:id",
            Component: JobDetails,
            loader: ({params}) => fetch(`https://node-server-six-mocha.vercel.app/jobs/${params.id}`)
          },
          {
            path: "/jobApply/:id",
            Component: ApplyJobs,
            loader: ({params}) => fetch(`https://node-server-six-mocha.vercel.app/jobs/${params.id}`)
          },
          {
            path: "/myApplications",
            Component: MyApplications,
          },
      ],
    },
  ]);

  export default router;