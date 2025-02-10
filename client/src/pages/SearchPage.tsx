import { useEffect, useState } from 'react'
import { X } from "lucide-react";
import Filter from '../components/Filter';
import { useParams } from 'react-router-dom';
import SearchPageSkeleton from '../components/SearchPageSkeleton';
import NoResultFound from '../components/NoResultFound';

import ResturentCard from '../components/ResturentCard';

import { useRestaurantStore } from '../store/useRestaurantStore';





//   export default dummyData;


const SearchPage = () => {
  const params = useParams()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { loading, search, appliedFilter, setAppliedFilter, searchedRestaurant } = useRestaurantStore()

  useEffect(() => {
    search(params.searchText, searchQuery, appliedFilter)
  }, [params.searchText!, appliedFilter])

 
  const searchClick = async () => {
    console.log(params.searchText,'thsi is the url search text')
  
    await search(params.searchText, searchQuery,appliedFilter)
  }

  return (
    <div className=" flex justify-center  mx-auto w-full my-10">
      <div className="flex w-[70%]  flex-col md:flex-row justify-between gap-10">
        <Filter />
        <div className="flex-1 w-full">
          {/* Search Input Field */}
          <div className="w-full justify-evenly flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border w-[70%] px-4 py-2 rounded-md focus:outline-none"
            />
            <button
              disabled={loading}
              onClick={searchClick}
              className="bg-orange hover:bg-hoverOrange text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Search
            </button>
          </div>
          {/* Searched Items display here */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row justify-center md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg text-center">
                {/* ({searchedRestaurant?.data.length}) */}
                Search result found
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map((selectedFilter: string, idx: number) => (
                  <div key={idx} className="relative inline-flex items-center max-w-full">
                    <span
                      className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap border border-[#D19254] py-1 px-2"
                    >
                      {selectedFilter}
                    </span>
                    <X
                      onClick={() => setAppliedFilter(selectedFilter)}
                      size={16}
                      className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Restaurant Cards */}

            <div className="grid justify-center items-center mx-auto md:grid-cols-3 gap-6 w-full h-max">


              {loading ? (
                <SearchPageSkeleton />
              ) : !loading && searchedRestaurant?.length === 0 ? (
                <NoResultFound searchText={params.text!} />
              ) : (
                searchedRestaurant?.map((restaurant: any) => (
                  <ResturentCard restakey={restaurant.id} resturent={restaurant} />


                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>


  )
}

export default SearchPage




