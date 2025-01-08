const SearchPageSkeleton = () => {
    return (
      <>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
          >
            <div className="relative">
              <div className="aspect-w-16 aspect-h-6">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </div>
            <div className="p-4">
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
              <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </div>
            <div className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"></div>
            </div>
          </div>
        ))}
      </>
    );
  };
  

  export default SearchPageSkeleton