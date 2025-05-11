import React from "react";
import Header from "./Header";
import { Link, useLoaderData } from "react-router";

const Phones = () => {
  const phones = useLoaderData();
  return (
    <div>
      <h2>All Phones: {phones.length}</h2>
      {phones.map((phone) => (
        <li key={phone.id}>
          <Link to={`/phone/${phone.id}`}>{phone.author}</Link>{" "}
        </li>
      ))}
    </div>
  );
};

export default Phones;
