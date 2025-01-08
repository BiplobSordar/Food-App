import { Restaurant, restaurantsData } from "../resturentData"
import ResturentCard from "./ResturentCard"


const AvailableResturent = () => {
  return (
    <section className="bg-gray-50 py-10">
    <div className="max-w-6xl mx-auto px-4">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Available Restaurants
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Discover a variety of cuisines and dishes from top-rated restaurants near you.
      </p>
  
      {/* Restaurants Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {}
        {restaurantsData.map((restaurant:Restaurant) => (
            <ResturentCard resturent={restaurant}/>
        //   <div
        //     key={restaurant.restaurantName}
        //     className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        //   >
        //     {/* Restaurant Image */}
        //     <img
        //       src={restaurant.imageUrl}
        //       alt={restaurant.restaurantName}
        //       className="w-full h-40 object-cover"
        //     />
  
        //     {/* Restaurant Info */}
        //     <div className="p-4">
        //       <h3 className="text-xl font-semibold text-gray-800">
        //         {restaurant.restaurantName}
        //       </h3>
        //       <p className="text-sm text-gray-600 my-2">
        //         Cuisines: {restaurant.cuisines.join(", ")}
        //       </p>
        //       <p className="text-sm text-gray-600">
        //         Delivery Time:{" "}
        //         <span className="text-[#D19254] font-medium">
        //           {restaurant.deliveryTime} mins
        //         </span>
        //       </p>
        //     </div>
  
        //     {/* View Menu Button */}
        //     <div className="p-4">
        //       <button
        //         onClick={() => navigate(`/restaurant/${restaurant.restaurantName}`)}
        //         className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        //       >
        //         View Menu
        //       </button>
        //     </div>
        //   </div>
        ))}
      </div>
    </div>
  </section>
  
  )
}

export default AvailableResturent