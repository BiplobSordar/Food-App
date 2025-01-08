import React, { useEffect, useRef, useState } from 'react'
import {
    Loader2,
    LocateIcon,
    Mail,
    MapPin ,
    MapPinnedIcon,
    Plus,
  } from "lucide-react";
  import image from '../assets/images/user.png'


const Profile = () => {
  const [profileData,setProfileData]=useState({
    fullname:'',
    email:'',
    address:'',
    city:'',
    country:'',
    profilePicture:''
  })
  
  const [selectedProfilePicture,setSelectedProfilePicture]=useState<string>('')
  const imageRef=useRef<HTMLInputElement|null>(null)
  let isLoading=false
  

  // Function dafination here start 

  const changeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setProfileData({...profileData,[name]:value})
  }

  const fileChangeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]

    if(file){
      const reader=new FileReader()
      reader.onloadend=()=>{
        const result=reader.result as string
        setSelectedProfilePicture(result)
        setProfileData((prev)=>({
          ...prev,
          profilePicture:result
        }))

      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form 
    // onSubmit={updateProfileHandler}
     className="max-w-7xl mx-auto my-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative md:w-28 md:h-28 w-20 h-20">
          <img
            // src={selectedProfilePicture || '/default-avatar.png'}
            src={image}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
          <input
          ref={imageRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={fileChangeHandler}
          />
          <div
           
            onClick={()=>{imageRef.current?.click()}}
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
          >
            <Plus className="text-white w-8 h-8" />
          </div>
        </div>
        <input
          type="text"
          name="fullname"
          value={profileData.fullname}
          onChange={changeHandler}
          
          placeholder="Full Name"
          className="font-bold text-2xl outline-none border-none focus:ring-transparent bg-transparent"
        />
      </div>
    </div>
 
    <div className="grid md:grid-cols-4 md:gap-4 gap-6 my-12">
  <div className="flex items-center gap-4 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
    <Mail className="text-blue-500 text-lg" />
    <div className="w-full">
      <label className="block text-sm text-gray-500 font-medium">Email</label>
      <input
        disabled
        name="email"
        value={profileData?.email}
        className="w-full mt-1 p-1 focus:rounded-md text-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none border-b border-gray-300 focus:border-blue-500"
      />
    </div>
  </div>

  <div className="flex items-center gap-4 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
    <LocateIcon className="text-green-500 text-lg" />
    <div className="w-full">
      <label className="block text-sm text-gray-500 font-medium">Address</label>
      <input
        name="address"
        className="w-full mt-1 p-1 focus:rounded-md text-gray-700 bg-transparent focus:ring-2 focus:ring-green-500 focus:outline-none border-b border-gray-300 focus:border-green-500"
        onChange={changeHandler}
        value={profileData.address}
      />
    </div>
  </div>

  <div className="flex items-center gap-4 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
    <MapPin className="text-purple-500 text-lg" />
    <div className="w-full">
      <label className="block text-sm text-gray-500 font-medium">City</label>
      <input
        name="city"
        onChange={changeHandler}
        value={profileData.city}
        className="w-full mt-1 p-1 focus:rounded-md  text-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none border-b border-gray-300 focus:border-purple-500"
      />
    </div>
  </div>

  <div className="flex items-center gap-4 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
    <MapPinnedIcon className="text-red-500 text-lg" />
    <div className="w-full">
      <label className="block text-sm text-gray-500 font-medium">Country</label>
      <input
        onChange={changeHandler}
        value={profileData.country}
        name="country"
        className="w-full mt-1 p-1 focus:rounded-md text-gray-700 bg-transparent focus:ring-2 focus:ring-red-500 focus:outline-none border-b border-gray-300 focus:border-red-500 "
      />
    </div> 
  </div>
</div>

    <div className="text-center">
      {isLoading ? (
        <button
          disabled
          className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </button>
      ) : (
        <button
          type="submit"
          className="px-4 py-2 bg-orange text-white rounded hover:bg-hoverOrange"
        >
          Update
        </button>
      )}
    </div>
  </form>
  
  )
}

export default Profile