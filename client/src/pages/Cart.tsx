import { Minus, Plus, Trash } from 'lucide-react';

import CheckoutDialog from '../components/CheckoutDialog';
import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';



const Cart = () => {

  const [open, setOpen] = useState<boolean>(false);
  const { cart, incrementQuantity, decrementQuantity, clearCart, removeFromTheCart } = useCartStore()


  return (




    <div className="flex flex-col w-full justify-center items-center my-10">
      <div className="flex justify-end">
        <button onClick={clearCart} className="text-white min-w-max px-3 py-1.5 rounded-md text-center bg-orange hover:bg-hoverOrange">Clear All</button>
      </div>

      <div className="space-y-4 w-full flex justify-center flex-col items-center">
        {cart.map((item: any, index: number) => (<CartItem key={index} item={item} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromTheCart={removeFromTheCart} />))}
      </div>
      <div className='w-full text-center mt-5'>
        <h1 className='text-xl font-bold'>Total Price : <span className='text-orange'>{cart.reduce((acc: any, curr: any) => {
          return acc + curr.price * curr.quantity
        }, 0)}</span></h1>
      </div>
      <div className="flex justify-end my-5">
        <button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange text-white px-6 py-2 rounded"
        >
          Proceed To Checkout
        </button>
      </div>
      <CheckoutDialog open={open} setOpen={setOpen} />
    </div>


  )
}

export default Cart




// import { Minus, Plus, Trash } from 'lucide-react';
const CartItem = ({ item, incrementQuantity, decrementQuantity, removeFromTheCart }: { item: any, incrementQuantity: (id: string) => void, decrementQuantity: (id: string) => void, removeFromTheCart: (id: string) => void }) => (
  <div className="flex w-full items-center justify-between p-4 md:w-[70%]  border-b border-gray-300 flex-col sm:flex-row">
    {/* Left Section: Item Image and Name */}
    <div className="flex items-center sm:w-2/3 mb-4 sm:mb-0">
      <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h3 className="text-lg sm:text-sm font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">₹{item.price}</p>
      </div>
    </div>

    {/* Right Section: Quantity controls and Total Price */}
    <div className="flex items-center space-x-4 sm:w-1/3">
      <div className="flex items-center space-x-2 sm:flex-col sm:space-y-2 sm:items-start">
        {/* Quantity Control (For small screens: stacked vertically) */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => decrementQuantity(item.id)}
            className="px-3 py-1 bg-gray-200 rounded-full"
          >
            <Minus size={18} />
          </button>
          <span className="px-3 py-1 font-bold">{item.quantity}</span>
          <button
            onClick={() => incrementQuantity(item.id)}
            className="px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded-full"
          >
            <Plus size={18} />
          </button>
        </div>
        {/* Price Total */}
        <p className="font-semibold">₹{item.price * item.quantity}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromTheCart(item.id)}
        className="text-red-500 hover:text-red-600 "
      >
        <Trash className='text-orange hover:text-red-500 hover:font-bold' size={20} />
      </button>
    </div>
  </div>
);






