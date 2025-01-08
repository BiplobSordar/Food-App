



const ResturentDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 animate-pulse">
  <div className="w-full">
    {/* Image Skeleton */}
    <div className="relative w-full h-32 md:h-64 lg:h-72 bg-gray-200 rounded-lg shadow-lg"></div>
    
    {/* Restaurant Info Skeleton */}
    <div className="flex flex-col md:flex-row justify-between">
      <div className="my-5">
        {/* Name Skeleton */}
        <div className="w-1/2 h-6 bg-gray-200 rounded mb-4"></div>
        
        {/* Cuisines Skeleton */}
        <div className="flex gap-2 my-2">
          <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
        </div>
        
        {/* Delivery Time Skeleton */}
        <div className="flex md:flex-row flex-col gap-2 my-5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Available Menu Skeleton */}
    <div className="space-y-4 mt-5">
      <div className="w-full h-12 bg-gray-200 rounded"></div>
      <div className="w-full h-12 bg-gray-200 rounded"></div>
      <div className="w-full h-12 bg-gray-200 rounded"></div>
    </div>
  </div>
</div>

  )
}

export default ResturentDetailsSkeleton 