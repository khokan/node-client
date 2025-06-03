import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";

const ViewApplications = () => {
  const applications = useLoaderData();
  const handleChangeStatus = (e, app_id) => {
    console.log(e.target.value, app_id);
    axios
      .patch(`${import.meta.env.VITE_NODE_SERVER_URL}/applications/${app_id}`, {
        status: e.target.value,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("status successfully updated");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Application count {applications.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Select status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applications.map((application) => (
              <tr key={application._id}>
                <th></th>
                <td>{application.email}</td>
                <td>Quality Control Specialist</td>
                <td>
                  <select
                    onChange={(e) => handleChangeStatus(e, application._id)}
                    defaultValue={application.status}
                    className="select"
                  >
                    <option disabled={true}>select status</option>
                    <option>Pending</option>
                    <option>Review</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
