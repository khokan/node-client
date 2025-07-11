import { BsFillCartPlusFill } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import OrderChart from "../../../components/Chart/OrderChart";
import Calendar from "react-calendar";

const SellerStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["seller-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure("/seller-stats");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-12">
      {/* Cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
        {/* Revenue Card */}
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl">
          <div className="bg-gradient-to-tr from-orange-600 to-orange-400 absolute -mt-4 mx-4 grid h-16 w-16 place-items-center text-white rounded-xl shadow-lg shadow-orange-500/40">
            <FaDollarSign className="w-6 h-6" />
          </div>
          <div className="p-4 text-right">
            <p className="text-sm text-blue-gray-600">Total Revenue</p>
            <h4 className="text-2xl font-semibold text-blue-gray-900">
              ${data?.totalRevenue}
            </h4>
          </div>
        </div>

        {/* Orders Card */}
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl">
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 absolute -mt-4 mx-4 grid h-16 w-16 place-items-center text-white rounded-xl shadow-lg shadow-blue-500/40">
            <BsFillCartPlusFill className="w-6 h-6" />
          </div>
          <div className="p-4 text-right">
            <p className="text-sm text-blue-gray-600">Total Orders</p>
            <h4 className="text-2xl font-semibold text-blue-gray-900">
              {data?.totalOrder}
            </h4>
          </div>
        </div>
      </div>

      {/* Chart and Calendar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 mb-4">
        {/* Order Chart */}
        <div className="bg-white shadow-md rounded-xl xl:col-span-2">
          <OrderChart barChartData={data?.barChartData} />
        </div>

        {/* Calendar */}
        <div className="bg-white shadow-md rounded-xl">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default SellerStatistics;
