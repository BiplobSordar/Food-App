const ResturentCardSkeleton = () => {
    return (
      <div className="bg-white w-full dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden animate-pulse">
        {/* Image Section Skeleton */}
        <div className="relative" style={{ paddingTop: "calc(100% / (16 / 6))" }}>
          <div className="absolute top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
  
        {/* Featured Badge Skeleton */}
        <div className="absolute top-2 left-2 bg-gray-300 dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
          <div className="h-4 w-16 bg-gray-400 dark:bg-gray-600 rounded"></div>
        </div>
  
        {/* Restaurant Info Skeleton */}
        <div className="p-4">
          {/* Restaurant Name */}
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
  
          {/* City Info */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-4 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
  
          {/* Country Info */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-4 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
  
          {/* Cuisines Skeleton */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"
              ></div>
            ))}
          </div>
        </div>
  
        {/* View Menus Button Skeleton */}
        <div className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default ResturentCardSkeleton;
  