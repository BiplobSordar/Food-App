import AvailableMenu from "../components/AvailableMenu";
import imageUrl from '../assets/images/CaesarSalad.jpg'
import pizza from  "../assets/images/MargheritaPizza.jpg"
import cb from "../assets/images/ChickenBiryani.jpg"
import cs from "../assets/images/CaesarSalad.jpg"
import pa from "../assets/images/PastaAlfredo.jpg"
import tp from "../assets/images/andooriPaneer.jpg"
import { useRestaurantStore } from "../store/useRestaurantStore";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const singleRestaurant = {
    imageUrl:imageUrl, // Placeholder image
    restaurantName: "Delicious Bites",
    cuisines: ["Italian", "Mexican", "Chinese"],
    deliveryTime: 30,
    menus: [
        {
          id: 1,
          name: "Margherita Pizza",
          description: "Classic cheese and tomato pizza with a crispy crust.",
          price: 299,
          image: pizza,
        },
        {
          id: 2,
          name: "Chicken Biryani",
          description: "Fragrant basmati rice with tender chicken pieces and spices.",
          price: 399,
          image:cb,
        },
        {
          id: 3,
          name: "Caesar Salad",
          description: "Crisp lettuce, croutons, and creamy Caesar dressing.",
          price: 199,
          image:cs,
        },
        {
          id: 4,
          name: "Pasta Alfredo",
          description: "Rich and creamy Alfredo sauce with fettuccine pasta.",
          price: 349,
          image:pa,
        },
        {
          id: 5,
          name: "Tandoori Paneer",
          description: "Spiced paneer grilled to perfection with smoky flavors.",
          price: 249,
          image:tp,
        },
      ]
  };

  
  
  

const ResturentDetails = () => {
  const {loading,singleRestaurant,getSingleRestaurant}=useRestaurantStore()
  const params=useParams()
  const id=params.id
  useEffect(()=>{
    getSingleRestaurant(id)
  },[])
  if(loading)return <Loading/>
  console.log(singleRestaurant,'thsi is the single restaursnas')


  return (
    <div className="max-w-6xl mx-auto my-10">
    <div className="w-full">
      {/* Restaurant Image */}
      <div className="relative w-full h-32 md:h-64 lg:h-72">
        <img
          src={singleRestaurant?.image_url || "Loading..."}
          alt="res_image"
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
      </div>
      
      {/* Restaurant Info */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="my-5">
          {/* Restaurant Name */}
          <h1 className="font-medium text-xl">{singleRestaurant?.name }</h1>
          
          {/* Cuisines */}
          <div className="flex gap-2 my-2">
            {singleRestaurant?.cuisines.map((cuisine: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full shadow"
              >
                {cuisine}
              </span>
            ))}
          </div>
          
          {/* Delivery Time */}
          <div className="flex md:flex-row flex-col gap-2 my-5">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-7a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="flex items-center gap-2 font-medium">
                Delivery Time:{" "}
                <span className="text-[#D19254]">
                  {singleRestaurant?.delivery_time || "NA"} mins
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
  
      {/* Available Menu */}
      {singleRestaurant?.menus && (
        <AvailableMenu menus={singleRestaurant?.menus!} />
        
      )}
    </div>
  </div>
  
  )
}

export default ResturentDetails