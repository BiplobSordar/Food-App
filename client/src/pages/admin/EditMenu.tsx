import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { menuSchema, MenuFormSchema } from '../../schema/addMenuSchema'
import { MenuItem } from '../../components/MenuCard';
import { Loader2 } from 'lucide-react';
import { any, string } from 'zod';
import { useMenuStore } from '../../store/useMenuStroe';
import { useToast } from '../../context/ToastContext';
import { useRestaurantStore } from '../../store/useRestaurantStore';


type editMenuFormType = {
    name: string,
    description: string,
    price: number,
    image: any
}
const EditMenu = ({ editOpen, setEditOpen, selectedMenu }: { selectedMenu: any, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>> }) => {
   
    const { loading, editMenu } = useMenuStore()
    const { getRestaurant } = useRestaurantStore()
    const { addToast } = useToast()

    const [input, setInput] = useState<editMenuFormType>({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });
    useEffect(() => {
        setInput(selectedMenu)
    }, [])
    const [error, setError] = useState<Partial<MenuFormSchema>>({});
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // form validation start here 
        const result = menuSchema.safeParse(input)
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors
            setError(fieldErrors as Partial<MenuFormSchema>)
            return
        }
        if (result.success) {
            setError({})

        }

        // api Implementation start here 


        try {
            const formData = new FormData()
            formData.append('name', input.name)
            formData.append('description', input.description)
            formData.append('price', input.price.toString())
            if (input.image) {

                formData.append('image', input.image)
            }
            const result = await editMenu(selectedMenu.id, formData, addToast)
            if (result) {
                await getRestaurant()
                setEditOpen(!editOpen)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setInput({ ...input, [name]: type == 'number' ? Number(value) : value })
    }

    useEffect(() => {
        setInput({
            name: selectedMenu?.name || "",
            description: selectedMenu?.description || "",
            price: selectedMenu?.price || 0,
            image: undefined,
        })
    }, [])

   
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${editOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Edit Menu</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setEditOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                    Update your menu to keep your offerings fresh and exciting!
                </p>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                            placeholder="Enter menu name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {error && (
                            <span className="text-xs font-medium text-red-600">
                                {error.name}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            placeholder="Enter menu description"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {error && (
                            <span className="text-xs font-medium text-red-600">
                                {error.description}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price in (Rupees)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={input.price}
                            onChange={changeEventHandler}
                            placeholder="Enter menu price"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {error && (
                            <span className="text-xs font-medium text-red-600">
                                {error.price}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Menu Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) =>
                                setInput({ ...input, image: e.target.files?.[0] || undefined })
                            }
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
                        />
                        {error && (
                            <span className="text-xs font-medium text-red-600">
                                {error.image?.name}
                            </span>
                        )}
                    </div>
                    <div className="mt-5">
                        {loading ? (
                            <button
                                disabled
                                className="flex items-center justify-center w-full px-4 py-2 text-white bg-orange rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait

                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-orange rounded-md shadow-sm hover:bg-hoverOrange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMenu