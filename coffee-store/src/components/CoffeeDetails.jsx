import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLoaderData } from "react-router";

const CoffeeDetails = () => {
  const { user } = use(AuthContext);
  const { name, likedBy } = Coffee;
  const data = useLoaderData();
  const [likes, setLikes] = useState(likedBy.includes(user));

  return <div></div>;
};

export default CoffeeDetails;
