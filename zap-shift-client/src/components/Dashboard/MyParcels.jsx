import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  console.log(parcels);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(parcels.length / itemsPerPage);
  const paginatedParcels = parcels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    // Confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
          }
          refetch();
        });
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Failed to delete parcel",
          "error"
        );
      }
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* Table header */}
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Type</th>
            <th>Date</th>
            <th>Cost (৳)</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows */}
          {paginatedParcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>
                <div className="font-bold">{parcel.tracking_id}</div>
                <div className="text-sm opacity-50">
                  {parcel.senderCity} → {parcel.receiverCity}
                </div>
              </td>
              <td>
                <span
                  className={`badge ${
                    parcel.type === "document" ? "badge-info" : "badge-warning"
                  }`}
                >
                  {parcel.type}
                </span>
                {parcel.type === "non-document" && (
                  <div className="text-xs mt-1">{parcel.weight} kg</div>
                )}
              </td>
              <td>{formatDate(parcel.creation_date)}</td>
              <td>
                <span className="font-mono">{parcel.cost.toFixed(2)}</span>
              </td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td>
                <span className="badge badge-ghost">
                  {parcel.delivery_status}
                </span>
              </td>
              <td>
                <div className="flex gap-2">
                  {parcel.payment_status === "unpaid" && (
                    <button
                      onClick={() => onPay(parcel._id)}
                      className="btn btn-xs btn-success"
                    >
                      Pay
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">
            Page {currentPage} of {totalPages}
          </button>
          <button
            className="join-item btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
