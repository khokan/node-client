import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Users = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  // useEffect(() => {
  //   fetch('/')
  //     .then(res => res.json())
  //       .then(data => {
  //         console.log(data);
  //       })
  // },[])

  // useEffect(() => {
  //   axios.get('/')
  //       .then(data => { 
  //         console.log(data.data);
  // })
  // },[])

  const handleDelete = (id) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
             
      fetch(`https://node-server-six-mocha.vercel.app/users/${id}`, {
          method: 'DELETE',
          })
          .then(res =>res.json())
          .then(data => {                    
              if(data.deletedCount > 0){
                  const remianing = users.filter(user => user._id != id)
                  setUsers(remianing)
                  // TODO: Delete user from firebase
                  console.log('after deleted',data)
              }
          })

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (    
    <div>
      <h2>USers</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
               No
              </th>
              <th>Name</th>
              <th>Time</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user,index) => (
              <tr key={user._id}>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.address}</div>
                    </div>
                  </div>
                </td>               
                <td>{user.lastSignInTime}</td> 
                <td>{user.email}</td>
                <th>
                  <button className="btn btn-xs">V</button>
                  <button className="btn btn-xs">E</button>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-xs">X</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
