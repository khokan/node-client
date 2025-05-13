import React from "react";
import { useLoaderData } from "react-router";

const UserDetails = () => {
  const userData = useLoaderData();
  return (
    <div>
      {
        <>
          <p>{userData._id}</p>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
        </>
      }
    </div>
  );
};

export default UserDetails;
