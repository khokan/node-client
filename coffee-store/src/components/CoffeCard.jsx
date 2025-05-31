import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, quantiy, price, photo, taste } = coffee;

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_NODE_SERVER_URL}/coffees/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remianing = coffees.filter((coffee) => coffee._id != _id);
              setCoffees(remianing);
              console.log("after deleted", data);
            }
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="flex justify-around items-center w-full">
        <div>
          <h2 className="card-title">{name}</h2>
          <p>{price}</p>
          <p>{quantiy}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="join join-vertical space-y-2">
            <button className="btn join-item">View</button>
            <Link to={`/update-coffee/${_id}`} className="btn join-item">
              Edit
            </Link>
            <button onClick={() => handleDelete(_id)} className="btn join-item">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeCard;
