import React, { Suspense } from "react";
import useAuth from "../../../hooks/useAuth";
import JobsLists from "./JobsLists";
import { JobsCreatedByPromise } from "../../../api/jobApi";

const MyPostedJobs = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>My Posted Jobs</h2>
      <Suspense>
        <JobsLists
          JobsCreatedByPromise={JobsCreatedByPromise(user.email)}
        ></JobsLists>
      </Suspense>
    </div>
  );
};

export default MyPostedJobs;
