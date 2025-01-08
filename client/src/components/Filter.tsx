import React from 'react'

export type FilterOptionsState={
    id:string,
    label:string
}

const filterOptions: FilterOptionsState[] = [
    { id: "burger", label: "Burger" },
    { id: "thali", label: "Thali" },
    { id: "biryani", label: "Biryani" },
    { id: "momos", label: "Momos" },
  ];

const Filter = () => {
  return (
    <div className="md:w-72">
    <div className="flex items-center justify-between">
      <h1 className="font-medium text-lg">Filter by cuisines</h1>
      <button
        className="text-blue-500 hover:underline focus:outline-none"
        // onClick={resetAppliedFilter}
      >
        Reset
      </button>
    </div>
    {filterOptions.map((option) => (
      <div key={option.id} className="flex items-center space-x-2 my-5">
        <input
          type="checkbox"
          id={option.id}
        //   checked={appliedFilter.includes(option.label)}
        //   onChange={() => appliedFilterHandler(option.label)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor={option.id}
          className="text-sm font-medium leading-none cursor-pointer"
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>
  
  )
}

export default Filter