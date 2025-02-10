import { IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "../store/useOrderStore";
import { useCartStore } from "../store/useCartStore";

const Success = () => {
  const { getOrders ,orders} = useOrderStore()
  const {clearCart}=useCartStore()
  
 

  useEffect(() => {
    getOrders()
  }, []);
 

  if (orders?.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Status: <span className="text-[#FF5A5A]">{orders?.order_status.toUpperCase()}</span>
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>
          {orders?.menus?.map((order:any, index:number) => (
            <div key={index}>
             
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={order.image_url
                        }
                        alt={order.name}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                        {order.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-800 dark:text-gray-200 flex items-center">
                        <IndianRupee className="w-4 h-4 mr-1" />

                        <span className="text-lg font-medium">{order.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>
                </div>
             
            </div>
          ))}
        </div>
        <Link to="/cart">
          <button className="bg-orange hover:bg-hoverOrange text-white w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
