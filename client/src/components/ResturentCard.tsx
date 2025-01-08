import { MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Resturent } from "../schema/resturentSchema";

const ResturentCard = ({ resturent }:any) => {
  return (
    // <div
    //   key={resturent._id}
    //   className="bg-white w-full dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    // >
    //   <div className="relative">
    //     <div className="relative" style={{ paddingTop: 'calc(100% / (16 / 6))' }}>
    //       <img
    //         src={resturent.imageUrl}
    //         alt={resturent.resturentName}
    //         className="absolute top-0 left-0 w-full h-full object-cover"
    //       />
          
    //     </div>
    //     <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
    //       <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
    //         Featured
    //       </span>
    //     </div>
    //   </div>
    //   <div className="p-4">
    //     <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
    //       {resturent.resturentName}
    //     </h1>
    //     <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
    //       <MapPin size={16} />
    //       <p className="text-sm">
    //         City: <span className="font-medium">{resturent.city}</span>
    //       </p>
    //     </div>
    //     <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
    //       <Globe size={16} />
    //       <p className="text-sm">
    //         Country: <span className="font-medium">{resturent.country}</span>
    //       </p>
    //     </div>
    //     <div className="flex gap-2 mt-4 flex-wrap">
    //       {resturent.cuisines.map((cuisine:string, idx:number) => (
    //         <span
    //           key={idx}
    //           className="font-medium text-white px-2 py-1 rounded-full shadow-sm border border-gray-300"
    //         >
    //           {cuisine}
    //         </span>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
    //     <Link to={`/resturent/${resturent._id}`}>
    //       <button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
    //         View Menus
    //       </button>
    //     </Link>
    //   </div>
    // </div>


//     <div
//   key={resturent._id}
//   className="bg-white w-full dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
// >
//   {/* Restaurant Image */}
//   <div className="relative">
//     <div className="relative" style={{ paddingTop: "calc(100% / (16 / 6))" }}>
//       <img
//         src={resturent.imageUrl}
//         alt={resturent.resturentName}
//         className="absolute top-0 left-0 w-full h-full object-cover"
//       />
//     </div>
//     <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
//       <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//         Featured
//       </span>
//     </div>
//   </div>

//   {/* Restaurant Info */}
//   <div className="p-4">
//     <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//       {resturent.resturentName}
//     </h1>
//     <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
//       <MapPin size={16} />
//       <p className="text-sm">
//         City: <span className="font-medium">{resturent.city}</span>
//       </p>
//     </div>
//     <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
//       <Globe size={16} />
//       <p className="text-sm">
//         Country: <span className="font-medium">{resturent.country}</span>
//       </p>
//     </div>
//     <div className="flex gap-2 mt-4 flex-wrap">
//       {resturent.cuisines.map((cuisine: string, idx: number) => (
//         <span
//           key={idx}
//           className="font-medium text-white px-2 py-1 rounded-full shadow-sm border border-gray-300"
//         >
//           {cuisine}
//         </span>
//       ))}
//     </div>
//   </div>

//   {/* View Menus Button */}
//   <div className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
//     <Link to={`/resturent/${resturent._id}`}>
//       <button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
//         View Menus
//       </button>
//     </Link>
//   </div>
// </div>


<div
  key={resturent._id}
  className="bg-white w-full dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
>
  {/* Image Section */}
  <div className="relative">
    <div className="relative" style={{ paddingTop: "calc(100% / (16 / 6))" }}>
      <img
        src={resturent.imageUrl}
        alt={resturent.resturentName}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
    <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Featured
      </span>
    </div>
  </div>

  {/* Restaurant Info */}
  <div className="p-4">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      {resturent.resturentName}
    </h1>
    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
      <MapPin size={16} />
      <p className="text-sm">
        City: <span className="font-medium">{resturent.city}</span>
      </p>
    </div>
    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
      <Globe size={16} />
      <p className="text-sm">
        Country: <span className="font-medium">{resturent.country}</span>
      </p>
    </div>
    <div className="flex gap-2 mt-4 flex-wrap">
      {resturent.cuisines.map((cuisine: string, idx: number) => (
        <span
          key={idx}
          className="font-medium text-white px-2 py-1 rounded-full shadow-sm border border-gray-300 bg-orange-500"
        >
          {cuisine}
        </span>
      ))}
    </div>
  </div>

  {/* View Menus Button */}
  <div className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
    <Link to={`/resturent/${resturent._id}`}>
      <button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
        View Menus
      </button>
    </Link>
  </div>
</div>


  );
};

export default ResturentCard;
