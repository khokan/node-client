import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const userData = useLoaderData();
  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updateUser = { name, email };
    fetch(`http://localhost:5000/users/${userData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) console.log(data);
      });
  };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={userData.name} />
        <br />
        <input type="email" name="email" defaultValue={userData.email} />
        <br />
        <input type="submit" value="Edit User" />
      </form>
    </div>
  );
};

export default UpdateUser;
