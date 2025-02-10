
import AvailableMenu from '../../components/AvailableMenu'
import { useRestaurantStore } from '../../store/useRestaurantStore'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '../../context/ToastContext'
import Loading from '../../components/Loading'

import Modal from '../../components/Modal'
import EditRestaurantDetailsForm from './EditRestaurantDetailsForm'
import { useNavigate } from 'react-router-dom'
import { Loader2, Plus } from 'lucide-react'






const MyRestaurant = () => {
  const navigate = useNavigate()
  const { loading, getRestaurant, restaurant, uploadRestaurantBanner } = useRestaurantStore()
  const { addToast } = useToast()
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>('')
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const fetchRestaurant = async () => {
    await getRestaurant(addToast)
  }
  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend =async () => {
        const result = reader.result as string
        setSelectedProfilePicture(result)
        await uploadRestaurantBanner({
          file: result,
          restaurantId: restaurant.id
        }, addToast)

      }
      reader.readAsDataURL(file)
    }
   
   


  }





  useEffect(() => {
    fetchRestaurant()
  }, [])
  if (loading && !restaurant) return <Loading />
  let updatedData = {
    name: restaurant?.name,
    city: restaurant?.city,
    country: restaurant?.country,
    deliveryTime: Number(restaurant?.delivery_time),
    cuisines: restaurant?.cuisines
  }

  return (
    <>

      {isUpdate && <Modal isOpen={isUpdate} onClose={() => { setIsUpdate(!isUpdate) }} children={<EditRestaurantDetailsForm updatedData={updatedData} closeModal={() => { setIsUpdate(!isUpdate) }} />} />}
      <div className="max-w-6xl mx-auto my-10">
        <div className="w-full">
          {/* Restaurant Image */}
          <div className="relative w-full h-32 md:h-64 lg:h-72">
            <img
              src={selectedProfilePicture?selectedProfilePicture:restaurant?.image_url || ''}
              alt="res_image"
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
            <div className={`absolute top-0 left-0 w-full h-full ${loading?'opacity-100':'opacity-0'}  hover:opacity-100 flex items-center justify-center `} onClick={() => { inputRef.current?.click() }}>
              <input type='file' disabled={loading} ref={inputRef} onChange={fileChangeHandler} className='hidden' name='file' />
              {loading ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <Plus className="text-red-800 w-8 h-8" />}
            </div>
            
          </div>
          <div className='w-full flex justify-end items-end'>
            <button
              onClick={() => { setIsUpdate(!isUpdate) }}

              className="min-w-max mt-5 bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange"
            >
              Edit Restautant Details
            </button>
            <button
              onClick={() => { navigate('/admin/menu') }}


              className="min-w-max mt-5 bg-orange mx-2 text-white py-2 px-4 rounded-lg hover:bg-hoverOrange"
            >
              Edit Menu
            </button>
          </div>



          {/* Restaurant Info */}
          <div className="flex flex-col md:flex-row justify-between">
            <div className="my-5">
              {/* Restaurant Name */}
              <h1 className="font-medium text-xl">{restaurant?.name || "Loading..."}</h1>

              {/* Cuisines */}
              <div className="flex gap-2 my-2">
                {restaurant?.cuisines.map((cuisine: string, idx: number) => (
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
                      {restaurant?.delivery_time || "NA"} mins
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Available Menu */}
          {restaurant?.menus && (
            <AvailableMenu menus={restaurant?.menus!} />

          )}
        </div>
      </div></>


  )
}

export default MyRestaurant