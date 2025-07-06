import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SellerOrderDataRow = ({ order }) => {
  console.log("Order:", order); // This is correct

  const [status, setStatus] = useState(order.status);
  const [editing, setEditing] = useState(true);
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setStatus(e.target.value);
    setEditing(true);
  };

  const mutatation = useMutation({
    mutationFn: async (status) => {
      const { data } = await axiosSecure.patch(
        `/seller/order/status/${order._id}`,
        { status }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // refetch()
      toast.success("User Role Updated Successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdate = () => {
    mutatation.mutate(status);
    setEditing(false);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{order.plantName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {order.customer.name}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${order.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{order.quantity}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`${
            status === "Start Processing"
              ? "text-yellow-500"
              : status === "Deliver"
              ? "text-green-500"
              : "text-red-500"
          } whitespace-no-wrap`}
        >
          {status ? status : "Pending"}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={handleChange}
            className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">Start Processing</option>
            <option value="Delivered">Deliver</option>
          </select>

          <button
            onClick={handleUpdate}
            disabled={!editing}
            className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
            <span className="relative">Update</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
