import React, { useState } from "react";
import pizzaImage from '../assets/images/pizza.png'
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate=useNavigate()
  const [searchText,setSearchText]=useState<string>('')
  return (
    <div className="bg-darkBlue text-white flex flex-col md:flex-row items-center justify-evenly px-6 py-12 min-h-max ">
   
      <div className="text-center md:text-left md:max-w-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Order Food anytime & anywhere
        </h1>
        <p className="text-gray-400 text-lg mb-6">
          Hey! Our Delicious food is waiting for you, we are always near to you.
        </p>
        <div className="flex items-center space-x-2 border border-gray-500 rounded-lg px-4 py-2 bg-white text-black">
          <input
            type="text"
            placeholder="Search restaurant by name, city & country"
            className="flex-1 outline-none"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              setSearchText(e.target.value)
            }}
            value={searchText}
          />
          <button className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-hoverOrange"
          onClick={()=>{navigate(`/search/${searchText}`)}}
          >
            Search
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="mt-8 md:mt-0 flex justify-center items-center  min-h-fit">
        <img
          src={pizzaImage}
          alt="Pizza"
          className="w-[70%] rounded-full"
        />
      </div>
    </div>
  );
};

export default HeroSection;
