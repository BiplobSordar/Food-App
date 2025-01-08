import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightBlue text-center px-6 py-12 md:py-24">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-darkBlue">404</h1>
        <p className="text-2xl font-semibold text-gray-700">
          Oops! We couldn't find that page.
        </p>
        <p className="text-lg text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-orange text-white rounded-lg hover:bg-hoverOrange transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
