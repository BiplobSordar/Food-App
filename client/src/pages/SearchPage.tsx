import React, { useEffect, useState } from 'react'
import { Globe, MapPin, X } from "lucide-react";
import Filter from '../components/Filter';
import { Link, useParams } from 'react-router-dom';
import SearchPageSkeleton from '../components/SearchPageSkeleton';
import NoResultFound from '../components/NoResultFound';
import RestaurantCard from '../components/ResturentCard';
import { Resturent } from '../schema/resturentSchema';
import ResturentCard from '../components/ResturentCard';
import Loading from '../components/Loading';



const dummyData: Resturent[] = [
    {
        _id: '1',
        resturentName: 'The Gourmet Kitchen',
        city: 'New York',
        country: 'USA',
        imageUrl: 'https://via.placeholder.com/500x300?text=Restaurant+1',
        cuisines: ['Italian', 'French', 'Vegetarian']
    },
    {
        _id: '2',
        resturentName: 'Sushi Delight',
        city: 'Tokyo',
        country: 'Japan',
        imageUrl: 'https://via.placeholder.com/500x300?text=Restaurant+2',
        cuisines: ['Japanese', 'Sushi', 'Seafood']
    },
    {
        _id: '3',
        resturentName: 'Taco Fiesta',
        city: 'Los Angeles',
        country: 'USA',
        imageUrl: 'https://via.placeholder.com/500x300?text=Restaurant+3',
        cuisines: ['Mexican', 'Tacos', 'Spicy']
    },
    {
        _id: '4',
        resturentName: 'Curry House',
        city: 'London',
        country: 'UK',
        imageUrl: 'https://via.placeholder.com/500x300?text=Restaurant+4',
        cuisines: ['Indian', 'Curry', 'Vegetarian']
    },
    {
        _id: '5',
        resturentName: 'Bistro 360',
        city: 'Paris',
        country: 'France',
        imageUrl: 'https://via.placeholder.com/500x300?text=Restaurant+5',
        cuisines: ['French', 'Bistro', 'Fine Dining']
    }
];

//   export default dummyData;


const SearchPage = () => {
    const params = useParams()
    const [searchQuery, setSearchQuery] = useState<string>('')
    let loading = false


    return (
        // <div className=" flex justify-center  mx-auto w-full my-10">
        //     <div className="flex w-[70%]  flex-col md:flex-row justify-between gap-10">
        //         <Filter />
        //         <div className="flex-1 w-full">
        //             {/* Search Input Field */}
        //             <div className="w-full justify-evenly flex items-center gap-2">
        //                 <input
        //                     type="text"
        //                     value={searchQuery}
        //                     placeholder="Search by restaurant & cuisines"
        //                     onChange={(e) => setSearchQuery(e.target.value)}
        //                     className="border w-[70%] px-4 py-2 rounded-md focus:outline-none"
        //                 />
        //                 <button
        //                     //   onClick={() => searchRestaurant(params.text!, searchQuery, appliedFilter)}
        //                     className="bg-orange hover:bg-hoverOrange text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        //                 >
        //                     Search
        //                 </button>
        //             </div>
        //             {/* Searched Items display here */}
        //             <div>
        //                 <div className="flex flex-col gap-3 md:flex-row justify-center md:items-center md:gap-2 my-3">
        //                     <h1 className="font-medium text-lg text-center">
        //                         {/* ({searchedRestaurant?.data.length}) */}
        //                         Search result found
        //                     </h1>
        //                     <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
        //                         {/* {appliedFilter.map((selectedFilter: string, idx: number) => (
        //       <div key={idx} className="relative inline-flex items-center max-w-full">
        //         <span
        //           className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap border border-[#D19254] py-1 px-2"
        //         >
        //           {selectedFilter}
        //         </span>
        //         <X
        //           onClick={() => setAppliedFilter(selectedFilter)}
        //           size={16}
        //           className="absolute text-[#D19254] right-1 hover:cursor-pointer"
        //         />
        //       </div>
        //     ))} */}
        //                     </div>
        //                 </div>
        //                 {/* Restaurant Cards */}
        //                 <div className="grid justify-items-center mx-auto md:grid-cols-3 gap-6 w-full h-screen">
        //                     {/* {loading ? (
        //     <SearchPageSkeleton />
            
        //   ) : !loading && searchedRestaurant?.data.length === 0 ? (
        //     <NoResultFound searchText={params.text!} />
            
        //   ) : ( */}
        //                     {
        //     // dummyData.map((resturent: Resturent) => (
        //     // //   <div
        //     // //     key={restaurant._id}
        //     // //     className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        //     // //   >
        //     // //     <div className="relative">
        //     // //       <div className="relative" style={{ paddingTop: 'calc(100% / (16 / 6))' }}>
        //     // //         <img
        //     // //           src={restaurant.imageUrl}
        //     // //           alt=""
        //     // //           className="absolute top-0 left-0 w-full h-full object-cover"
        //     // //         />
        //     // //       </div>
        //     // //       <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
        //     // //         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        //     // //           Featured
        //     // //         </span>
        //     // //       </div>
        //     // //     </div>
        //     // //     <div className="p-4">
        //     // //       <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        //     // //         {restaurant.restaurantName}
        //     // //       </h1>
        //     // //       <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
        //     // //         <MapPin size={16} />
        //     // //         <p className="text-sm">
        //     // //           City: <span className="font-medium">{restaurant.city}</span>
        //     // //         </p>
        //     // //       </div>
        //     // //       <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
        //     // //         <Globe size={16} />
        //     // //         <p className="text-sm">
        //     // //           Country: <span className="font-medium">{restaurant.country}</span>
        //     // //         </p>
        //     // //       </div>
        //     // //       <div className="flex gap-2 mt-4 flex-wrap">
        //     // //         {restaurant.cuisines.map((cuisine: string, idx: number) => (
        //     // //           <span
        //     // //             key={idx}
        //     // //             className="font-medium px-2 py-1 rounded-full shadow-sm border border-gray-300"
        //     // //           >
        //     // //             {cuisine}
        //     // //           </span>
        //     // //         ))}
        //     // //       </div>
        //     // //     </div>
        //     // //     <div className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
        //     // //       <Link to={`/restaurant/${restaurant._id}`}>
        //     // //         <button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
        //     // //           View Menus
        //     // //         </button>
        //     // //       </Link>
                  
        //     // //     </div>
        //     // //   </div>
        //     // // <RestaurantCard resturent={resturent}/>
        //     // <ResturentCard resturent={resturent}/>
        //     // ))
        
        //   }
        //                     {/* <NoResultFound /> */}
        //                     <Loading/>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <Loading/>

    )
}

export default SearchPage