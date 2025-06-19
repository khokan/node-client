import React, { Suspense, use } from "react";
import Banner from "./Banner";
import HotJobs from "../Jobs/HotJobs";

// const jobsPromise = fetch('http://localhost:5000/jobs').then(res => res.json());
const jobsPromise = fetch(`${import.meta.env.VITE_NODE_SERVER_URL}/jobs`)
  .then((res) => res.json())
  .catch((error) => {
    console.error("Fetch error:", error);
    throw error; // Still throw so Suspense fallback shows
  });
const Home = () => {
  const jobs = use(jobsPromise);
  return (
    <div>
      <Banner />
      <Suspense fallback={"Laoding..."}>
        <HotJobs jobs={jobs} />
      </Suspense>
    </div>
  );
};

export default Home;
