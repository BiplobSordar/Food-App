import React from 'react'



const NoResultFound = ({searchText}:{searchText:any}) => {
  return (
    <div className="text-center">
  <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
    No results found
  </h1>
  <p className="mt-2 text-gray-500 dark:text-gray-400">
    We couldn't find any results for <span className='text-red-600'>{searchText}</span> <br /> Try searching
    with a different term.
  </p>
  <a
    href="/"
    className="inline-block mt-4 bg-orange text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-orangeHover focus:ring-2 focus:ring-orange-500 focus:outline-none"
  >
    Go Back to Home
  </a>
</div>
  )
}

export default NoResultFound