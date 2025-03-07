import { Loader2 } from "lucide-react"
import React, { useState } from "react"
import { addResturentFormType, addResturentFromSchema } from "../../schema/addResturentSchma"
import { string } from "zod"
import { useRestaurantStore } from "../../store/useRestaurantStore"
import { useToast } from "../../context/ToastContext"
import { Navigate, useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/useUserStore"





const AddResturent = () => {
  const { addToast } = useToast()
  const navigate=useNavigate()

  let restaurant = false
  const { loading, createRestaurant } = useRestaurantStore()
  const {checkAuthentication}=useUserStore()

  const [input, setInput] = useState<addResturentFormType>({
    name: '',
    city: '',
    country: '',
    cuisines: [],
    deliveryTime: 0,
    // imageFile: undefined
  })


  const [errors, setErrors] = useState<Partial<addResturentFormType>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setInput({ ...input, [name]: type === "number" ? Number(value) : value })
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = addResturentFromSchema.safeParse(input)
    console.log(result, 'tshsi is the resutl fo the form validataion')

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors
      setErrors(fieldErrors as Partial<addResturentFormType>)
      return
    }
    if (result.success) {
      setErrors({})
      console.log('this i sthe input at createRestaurant',input)
      const id = await createRestaurant(input, addToast)
      console.log(id,'this is the restaurant id')
      if (id) {
        checkAuthentication()
        
        navigate(`/admin/restaurant`)
    
      }
    }

  }
  
  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <div>
        <div>
          <h1 className="font-extrabold text-3xl text-center mb-10 text-gray-800">Add Restaurants</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={input.name}

                  placeholder="Enter your restaurant name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange focus:outline-none focus:border-orange-500 shadow-sm"
                />
                {errors && (<span className="text-xs text-red-600 font-medium">{errors.name}</span>)}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={input.city}
                  placeholder="Enter your city name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange focus:outline-none focus:border-orange-500 shadow-sm"
                />
                {errors && (<span className="text-xs text-red-600 font-medium">{errors.city}</span>)}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  value={input.country}
                  placeholder="Enter your country name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange focus:outline-none focus:border-orange-500 shadow-sm"
                />
                {errors && (<span className="text-xs text-red-600 font-medium">{errors.country}</span>)}
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Time (in minutes)
                </label>
                <input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime === 0 ? '' : input.deliveryTime}
                  onChange={handleChange}
                  placeholder="Enter your delivery time"
                  min="1"
                  step="1"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange-500 focus:outline-none focus:border-orange-500 shadow-sm" />
                {errors && (<span className="text-xs text-red-600 font-medium">{errors.deliveryTime}</span>)}
              </div>

              {/* Cuisines */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cuisines
                </label>
                <input
                  type="text"
                  name="cuisines"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInput({
                      ...input, cuisines: e.target.value.split(',')
                    })

                  }}
                  value={input.cuisines}
                  placeholder="e.g. Momos, Biryani"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange focus:outline-none focus:border-orange-500 shadow-sm"
                />
                {errors && (<span className="text-xs text-red-600 font-medium">{errors.cuisines}</span>)}
              </div>

              {/* Upload Restaurant Banner */}
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Restaurant Banner
                </label>
                <input
                  onChange={(e: any) => {
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined
                    })
                  }}
                  type="file"
                  accept="image/*"
                  name="imageFile"

                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange focus:outline-none focus:border-orange-500 shadow-sm"
                />
                {errors && (<span className="text-xs text-red-600 font-medium">{errors.imageFile?.name || 'Image File Is Required'}</span>)}
              </div> */}
            </div>

            <div className="mt-8 flex justify-center">
              {loading ? (
                <button
                disabled
                  className="w-full bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange flex items-center justify-center"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Please wait
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full  bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange"
                >
                  Create Restaurant
                </button>

              )}
             
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default AddResturent