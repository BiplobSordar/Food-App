import { Loader2 } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useToast } from '../../context/ToastContext';
import { useCartStore } from '../../store/useCartStore';

const Checkout = () => {
    const { user } = useUserStore();
    const { cart, clearCart } = useCartStore();
    const { loading, createOrder } = useOrderStore();
    const { addToast } = useToast();

    const [input, setInput] = useState<any>({
        name: "",
        email: "",
        contact: "",
        address: "",
        city: "",
        country: "",
    });

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        setInput({
            name: user.username || '',
            email: user.email || '',
            contact: user.contact || '',
            address: user.address_line_1 + ',' + user.address_line_2 || '',
            city: user.city || '',
            country: user.country || ''
        });
    }, [user]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        let orderItems = cart.map((item: any) => ({
            menu_id: item.id,
            restaurant_id: item.restaurant_id,
            quantity: item.quantity,
        }));

        let total_amount = cart.reduce((acc: any, curr: any) => {
            return acc + curr.price * curr.quantity;
        }, 0);

        const result = await createOrder(
            {
                user_id: user.user_id,
                orderItems,
                input,
                total_amount
            },
            addToast
        );

        if (result.url) {
            clearCart();
            window.location.href = result.url;
        }
    };

    return (
        <div
            className={`w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  }`}
            // onClick={() => setOpen(false)}
        >
            <div
                className="bg-white p-6 w-full max-w-[70%] rounded-lg flex flex-col lg:flex-row gap-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Section - Selected Products */}
                <div className="w-full lg:w-1/2 border-r pr-6">
                    <h2 className="text-xl font-semibold mb-4">Your Selected Items</h2>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {cart.length > 0 ? cart.map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold text-orange">{`$${(item.price * item.quantity).toFixed(2)}`}</p>
                            </div>
                        )) : <p className="text-gray-500">Your cart is empty.</p>}
                    </div>
                </div>

                {/* Right Section - Checkout Form */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold">Review Your Order</h2>
                    <p className="text-xs text-gray-600 mb-4">
                        Double-check your details and ensure everything is correct before proceeding.
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-1">Fullname</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-sm font-semibold mb-1">Contact</label>
                            <input
                                type="number"
                                id="contact"
                                name="contact"
                                value={input.contact}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold mb-1">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={input.address}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-semibold mb-1">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={input.city}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-semibold mb-1">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={input.country}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="col-span-2 pt-5">
                            {loading ? (
                                <button
                                    disabled
                                    className="w-full py-2 bg-orange text-white rounded-md flex justify-center items-center"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-orange text-white rounded-md hover:bg-hoverOrange"
                                >
                                    Continue To Payment
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Checkout;