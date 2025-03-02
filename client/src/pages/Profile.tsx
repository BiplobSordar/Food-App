import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import {

  Loader2,

  Plus,
} from "lucide-react";
import image from '../assets/images/user.png'
import { useUserStore } from '../store/useUserStore';
import Modal from '../components/Modal';
import { useToast } from '../context/ToastContext';



const Profile = () => {
  const { addToast } = useToast()
  const { loading, user, beASeller, checkAuthentication, uploadAvatar } = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [updateProfileModalIsOpen, setUpdateProfileModalIsOpen] = useState<boolean>(false)

  const [profileData, setProfileData] = useState<any>({
    username: '',
    email: '',
    streetAddress: '',
    postalCode: '',
    state: '',
    city: '',
    country: '',
    additionalDirections: '',
    contact: '',
    profilePicture: ''

  })
  useEffect(() => {
    setProfileData({
      username: user.username,
      email: user.email,
      streetAddress: user.address_line_1,
      postalCode: user.postal_code,
      state: user.state,
      city: user.city,
      country: user.country,
      additionalDirections: user.address_line_2,
      contact: user.contact,
      profilePicture: user.avatar


    })
  }, [user])




  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>('')
  const imageRef = useRef<HTMLInputElement | null>(null)





  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setSelectedProfilePicture(result)
        setProfileData((prev: any) => ({
          ...prev,
          profilePicture: result
        }))

      }
      reader.readAsDataURL(file)

    }
  }



  let data = {
    username: user.username,
    email: user.email,
    contact: user.contact
  }

  let address = {

    id: user.address_id,
    streetAddress: user.address_line_1,
    postalCode: user.postal_code,
    state: user.state,
    city: user.city,
    country: user.country,
    additionalDirections: user.address_line_2,

  }

  const seller = async (e: any) => {
    const result = await beASeller(addToast)
    if (result) {
      await checkAuthentication()
    }
  }




  return (
    <>

      {isModalOpen && !user.address_id && <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(!isModalOpen) }} children={<AddressForm />} />}
      {isModalOpen && user.address_id && <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(!isModalOpen) }} children={<AddressForm address={address} />} />}

      {updateProfileModalIsOpen && <Modal isOpen={updateProfileModalIsOpen} onClose={() => { setUpdateProfileModalIsOpen(!updateProfileModalIsOpen) }} children={<UpdateProfileForm data={data} />} />}



      <div className="max-w-7xl mx-auto my-5 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative md:w-28 md:h-28 w-20 h-20 mx-5">
              <img
                src={selectedProfilePicture ? selectedProfilePicture : profileData?.profilePicture ? profileData?.profilePicture : image}
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
                onClick={() => imageRef.current?.click()}
                className={`absolute inset-0 flex items-center justify-center ${loading ? '' : 'opacity-0'} hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer`}
              >
                {loading ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <Plus className="text-white w-8 h-8" />}


              </div>
            </div>


            <div className="text-left">
              <h2 className="font-bold text-2xl text-gray-800">{profileData.username || 'Full Name'}</h2>
              <p className="text-sm text-gray-500">{profileData.email || 'Email'}</p>
            </div>
          </div>




        </div>
        {selectedProfilePicture && <button
          onClick={async () => {
            await uploadAvatar(selectedProfilePicture, addToast)
            setSelectedProfilePicture('')
          }}
          className="px-4 py-2 m-5 bg-orange text-white rounded hover:bg-hoverOrange"
        >
          {loading ? <> <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait</> : 'Upload Avatar'}

        </button>}
        <div className='my-3 mx-5'>
          <button
            onClick={() => setUpdateProfileModalIsOpen(!updateProfileModalIsOpen)}
            className="px-4 py-2 bg-orange text-white rounded hover:bg-hoverOrange"
          >
            Edit Profile
          </button>
          {user.address_id ? <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="px-4 py-2 mx-2 bg-orange text-white rounded hover:bg-hoverOrange"
          >
            Edit Address
          </button> : <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="px-4 py-2 bg-orange text-white rounded hover:bg-hoverOrange"
          >
            Add Address
          </button>}

        </div>
        <div >
          {!user.seller && <>
            {loading ? <button
              disabled
              className="flex mx-5 items-center justify-center px-4 py-2 bg-orange text-white rounded hover:bg-hoverOrange"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </button> : <button
              onClick={seller}

              className="px-4 py-2 mx-5 bg-orange text-white rounded hover:bg-hoverOrange"
            >
              Be A Seller
            </button>}


          </>}
        </div>

        <div className="grid md:grid-cols-4 md:gap-4 gap-6 my-12">
          <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-sm text-gray-500 font-medium">Contact</h3>
            <p className="text-gray-700">{profileData.contact || 'N/A'}</p>
          </div>

          {user.address_id && (
            <>
              <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-sm text-gray-500 font-medium">City</h3>
                <p className="text-gray-700">{profileData.city || 'N/A'}</p>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-sm text-gray-500 font-medium">Country</h3>
                <p className="text-gray-700">{profileData.country || 'N/A'}</p>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-sm text-gray-500 font-medium">Street Address</h3>
                <p className="text-gray-700">{profileData.streetAddress || 'N/A'}</p>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-sm text-gray-500 font-medium">Postal Code</h3>
                <p className="text-gray-700">{profileData.postalCode || 'N/A'}</p>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-sm text-gray-500 font-medium">State</h3>
                <p className="text-gray-700">{profileData.state || 'N/A'}</p>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-sm text-gray-500 font-medium">Additional Directions</h3>
                <p className="text-gray-700">{profileData.additionalDirections || 'None'}</p>
              </div>
            </>
          )}
        </div>


      </div>



    </>



  )
}

export default Profile







interface AddressFormProps {
  address?: {
    id: string,
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    additionalDirections?: string;
  };
}

const AddressForm: React.FC<AddressFormProps> = ({ address }) => {
  const { loading, addAddress, updateAddress, checkAuthentication } = useUserStore();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    streetAddress: address?.streetAddress || '',
    city: address?.city || '',
    state: address?.state || '',
    postalCode: address?.postalCode || '',
    country: address?.country || '',
    additionalDirections: address?.additionalDirections || '',
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = address
      ? await updateAddress(formData, addToast)
      : await addAddress(formData, addToast);
    if (result) {
      await checkAuthentication();
    } else {
      return
    }
  };

  return (
    <>
      <h1 className="text-center">{address ? 'Update Your Address' : 'Add Your Address'}</h1>
      <form onSubmit={handleAddressSubmit} className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 font-medium">Street Address</label>
            <input
              name="streetAddress"
              onChange={changeHandler}
              value={formData.streetAddress}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 font-medium">City</label>
            <input
              name="city"
              onChange={changeHandler}
              value={formData.city}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 font-medium">State</label>
            <input
              name="state"
              onChange={changeHandler}
              value={formData.state}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 font-medium">Postal Code</label>
            <input
              name="postalCode"
              onChange={changeHandler}
              value={formData.postalCode}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 font-medium">Country</label>
            <input
              name="country"
              onChange={changeHandler}
              value={formData.country}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm text-gray-500 font-medium">Additional Directions (optional)</label>
          <textarea
            name="additionalDirections"
            rows={3}
            onChange={changeHandler}
            value={formData.additionalDirections}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-4 text-right">
          {loading ? (
            <button
              disabled
              className="flex items-center justify-center px-4 py-2 bg-orange text-white rounded hover:bg-hoverOrange"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-orange text-white rounded hover:bg-hoverOrange"
            >
              {address ? 'Update Address' : 'Save Address'}
            </button>
          )}
        </div>
      </form>
    </>
  );
};



const UpdateProfileForm = ({ data }: { data: any }) => {

  const { addToast } = useToast()
  const { loading, updateProfile, checkAuthentication } = useUserStore();
  const [input, setInput] = useState<any>({ email: '', username: '', contact: '' })
  useEffect(() => {
    setInput(data)

  }, [data])
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent) => {
    e.preventDefault()

    const result = await updateProfile(input, addToast)

    if (result) {
      await checkAuthentication()

    }

  }

  return (
    <>
      <h1 className='text-center'>Update Your Profile Details </h1>
      <form
        onSubmit={updateProfileHandler}
        className="grid md:grid-cols-2 md:gap-4 gap-6 my-12">
        <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
          <label className="text-sm text-gray-500 font-medium">Username</label>
          <input
            type="text"
            name="username"
            required
            value={input.username}
            onChange={changeHandler}
            className="w-full mt-1 p-2 text-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none border-b border-gray-300 focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
          <label className="text-sm text-gray-500 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            disabled
            className="w-full mt-1 p-2 text-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none border-b border-gray-300 focus:border-blue-500 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
          <label className="text-sm text-gray-500 font-medium">Contact</label>
          <input
            type="number"
            name="contact"
            required
            min={11}
            value={input.contact}
            onChange={changeHandler}
            className="w-full mt-1 p-2 text-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none border-b border-gray-300 focus:border-blue-500"
            placeholder="Enter your contact number"
          />
        </div>

        <div className="text-center md:col-span-2">
          {loading ? (
            <button
              disabled
              className="flex items-center justify-center px-4 py-2 bg-orange text-white rounded hover:bg-hoverOrange"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-orange text-white rounded hover:bg-hoverOrange"
            >
              Update Profile
            </button>
          )}

        </div>
      </form>
    </>

  )

}


