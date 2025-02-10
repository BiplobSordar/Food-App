import { ChevronDown, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { useOrderStore } from "../../store/useOrderStore";
import Loading from "../../components/Loading";

export default function Orders() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
const {getRestaurantOrders,admin_orders,loading}=useOrderStore()
  useEffect(()=>{
  getRestaurantOrders()
  },[])

  const toggleDropdown = (orderId:any) => {
    setDropdownOpen((prev) => (prev === orderId ? null : orderId));
  };

  const statuses = ["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"];


  if(loading)return <Loading/>

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {admin_orders?.map((order:any) => (
          <div
            key={order.id}
            className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {order.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address: </span>
                {order.address}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Total Amount: </span>
                {order.price}
              </p>
            </div>
            <div className="w-full sm:w-1/3 relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Status
              </label>
              <button
                onClick={() => toggleDropdown(order.id)}
                className="flex justify-between items-center w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300"
              >
                {statuses.find((status) => status.toLowerCase() === order.status)}
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {dropdownOpen === order.id && (
                <ul className="absolute z-10 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md w-full">
                  {statuses.map((status, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        // handleStatusChange(order._id, status.toLowerCase());
                        toggleDropdown(null);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 ${
                        order.status === status.toLowerCase() ? "font-semibold" : ""
                      }`}
                    >
                      {order.status === status.toLowerCase() && (
                        <CheckCircle className="inline mr-2 h-4 w-4 text-green-500" />
                      )}
                      {status}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
