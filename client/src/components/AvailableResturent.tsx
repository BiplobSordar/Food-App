import { useEffect } from "react"
import { useRestaurantStore } from "../store/useRestaurantStore"
import ResturentCardSkeleton from "./RestaurantCardSkeketon"
import ResturentCard from "./ResturentCard"


const AvailableResturent = () => {
  const { loading, getRestaurants, restaurants } = useRestaurantStore()
  useEffect(() => {
    getRestaurants()
  }, [])
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
          {
            loading ? <>
              <ResturentCardSkeleton />
              <ResturentCardSkeleton />
              <ResturentCardSkeleton />
              <ResturentCardSkeleton />
              <ResturentCardSkeleton />
              <ResturentCardSkeleton />
              <ResturentCardSkeleton />
              <ResturentCardSkeleton />
            </> : restaurants?.map((restaurant: any) => (
              <ResturentCard key={restaurant.id} resturent={restaurant} />

            ))
          }
          

        </div>
      </div>
    </section>

  )
}

export default AvailableResturent