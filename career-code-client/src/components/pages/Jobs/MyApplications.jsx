import React, { Suspense, useEffect, useState } from "react";
import ApplicationList from "./ApplicationList";
import useAuth from "../../../hooks/useAuth";
import { h2 } from "motion/react-client";
import useApplicationApi from "../../../api/useApplicationApi";
// import { myApplicationPromise } from "../../../api/applicationApi";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState(null);
  const [loading, setLoading] = useState(true);
  const { myApplicationPromise } = useApplicationApi();
  useEffect(() => {
    if (user?.email) {
      myApplicationPromise(user.email).then((data) => {
        setApplications(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ApplicationList applications={applications} />
    </div>
  );
};

export default MyApplications;
