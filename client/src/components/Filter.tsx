import React, { useEffect } from 'react'
import { useRestaurantStore } from '../store/useRestaurantStore';

export type FilterOptionsState = {
  id: string,
  label: string
}

const filterOptions: FilterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];
// SELECT DISTINCT unnest(cuisines) AS cuisines FROM restaurants; get cuisines query
const Filter = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter,cuisines ,getCuisines} = useRestaurantStore();

  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };
  useEffect(()=>{
    if(!cuisines){

      getCuisines()
    }
  },[])
 
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <button
          className="text-blue-500 hover:underline focus:outline-none"
          onClick={resetAppliedFilter}
        >
          Reset
        </button>
      </div>
      {cuisines.map((option:any,ind:any) => (
        <div key={ind} className="flex items-center space-x-2 my-5">
          <input
            type="checkbox"
           
            checked={appliedFilter.includes(option)}
            onChange={() => appliedFilterHandler(option)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor={ind}
            className="text-sm font-medium leading-none cursor-pointer"
          >
            {option}
          </label>
        </div>
      ))}
    </div>

  )
}

export default Filter