import React from "react";
import { useLoaderData } from "react-router";

const Phone = () => {
  const phone = useLoaderData();
  return (
    <div>
      {phone.author}
      <br />
      {<img src={phone.cover} alt="" />}
    </div>
  );
};

export default Phone;
