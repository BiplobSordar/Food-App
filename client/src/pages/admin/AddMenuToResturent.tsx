import { Loader2, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MenuFormSchema, menuSchema } from "../../schema/addMenuSchema";
import { number } from "zod";
import { MenuItem } from "../../components/MenuCard";
import EditMunu from "./EditMenu";
import EditMenu from "./EditMenu";
import { useMenuStore } from "../../store/useMenuStroe";
import { useToast } from "../../context/ToastContext";
import { useRestaurantStore } from "../../store/useRestaurantStore";




const AddMenuToResturent = () => {
    const { createMenu, loading } = useMenuStore()
    const { getRestaurant ,restaurant} = useRestaurantStore()
    const { addToast } = useToast()
    const [open, setOpen] = useState<boolean>(false)
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [selectedMenu, setSelectedMenu] = useState<any>({
        id: 0, name: '', description: '', price: 0, image: 'undefined'
    })
    const [error, setError] = useState<Partial<MenuFormSchema>>({})


    const [input, setInput] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });







    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(input,'thsi is the input inside sumbit')
        // form validation start Here 
        const result = menuSchema.safeParse(input)
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors
            console.log(fieldErrors)
            setError(fieldErrors as Partial<MenuFormSchema>)
            return
        }
        if (result.success) {
            setError({})
        }


        // api implementation start here

        try {
            const formData = new FormData()

            formData.append('name', input.name)
            formData.append('description', input.description)
            formData.append('price', input.price.toString())
            if (input.image) {
                formData.append('image', input.image)
            }
            console.log(formData,'thsi i sthe form data')
            const result = await createMenu(formData, addToast)
            console.log(result,'thsi is the api call result')
            if (result) {
                setInput({
                    name: "",
                    description: "",
                    price: 0,
                    image: undefined,
                })
                await getRestaurant()
                setOpen(!open)

            }
        } catch (error) {
            console.log(error)
        }
       
    }
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setInput({ ...input, [name]: type == 'number' ? Number(value) : value })
    }


    useEffect(()=>{
        getRestaurant()
    },[])
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between items-center">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">Available Menus</h1>
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center bg-orange text-white px-4 py-2 rounded-lg hover:bg-hoverOrange focus:ring-4 focus:ring-orange-300 transition ease-in-out"
                >
                    <Plus className="mr-2" /> Add Menus

                </button>
            </div>

            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => { setOpen(!open) }}>
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-bold mb-2">Add A New Menu</h2>
                        <p className="text-sm text-gray-600 mb-4">Create a menu that will make your restaurant stand out.</p>
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="Enter menu name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange-500 focus:outline-none focus:border-orange-500"
                                />
                                {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Enter menu description"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange-500 focus:outline-none focus:border-orange-500"
                                />
                                {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price in (Rupees)</label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={input.price === 0 ? '' : input.price}
                                    onChange={changeEventHandler}
                                    placeholder="Enter menu price"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange-500 focus:outline-none focus:border-orange-500"
                                />
                                {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Menu Image</label>
                                <input
                                    id="image"
                                    type="file"
                                    name="image"

                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setInput({ ...input, image: e.target.files?.[0] || undefined })
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-orange-500 focus:outline-none focus:border-orange-500"
                                />
                                {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
                            </div>

                            <div className="mt-5 flex justify-end">
                                {loading ? (
                                    <button
                                        disabled
                                        className="bg-orange text-white px-4 py-2 rounded-lg flex items-center justify-center cursor-not-allowed"
                                    >
                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait

                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-hoverOrange focus:ring-4 focus:ring-orange-300 transition ease-in-out"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </form>
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            <X />

                        </button>
                    </div>
                </div>
            )}

            {restaurant?.menus.map((menu: any, idx: number) => (
                <div key={idx} className="mt-6 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
                        <img
                            src={menu.image_url}
                            alt="Menu item"
                            className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h1 className="text-lg font-semibold text-gray-800">{menu.name}</h1>
                            <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
                            <h2 className="text-md font-semibold mt-2">
                                Price: <span className="text-[#D19254]">{menu.price}</span>
                            </h2>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedMenu(menu);
                                setEditOpen(true);
                            }}
                            className="bg-orange text-white px-3 py-2 rounded-lg hover:bg-hoverOrange focus:ring-4 focus:ring-orange-300 transition ease-in-out mt-2"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}

            {editOpen && <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />}

        </div>

    )
}

export default AddMenuToResturent