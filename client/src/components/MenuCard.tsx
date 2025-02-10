import { ShoppingCart, CreditCard } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { CheckCircle } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export type MenuItem = {
  id: number; // Unique identifier for each menu item
  name: string; // Name of the menu item
  description: string; // Description of the menu item
  price: number; // Price of the menu item
  image_url: string; // URL of the image for the menu item
};



const MenuCard = ({ menu }: { menu: any }) => {

  const { addToCart, cart } = useCartStore()
  const location = useLocation()
  const navigate = useNavigate()

  const isItemInCart = (cartItems: any, itemId: any) => {
    return cartItems.some((item: any) => item.id === itemId);

  };
  const isAdminPath = (pathname: string) => {
    return pathname.includes('/admin');
  };
  const buy = (menu: any) => {

    Navigate({ to: `/checkout/${menu.id}`, replace: true })

  }
  // Use the isAdminPath function
  const isAdmin = isAdminPath(location.pathname);
  return (





    <div className="w-[100%] mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl p-2">
      <img src={menu.image_url} alt={menu.name} className="w-[100%] h-40 object-cover" />
      <div className="p-4 w-full">
        <h2 className="text-xl font-semibold text-gray-800">{menu.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
        <h3 className="text-lg font-semibold mt-4">
          Price: <span className="text-[#D19254]">₹{menu.price}</span>
        </h3>
      </div>
      <div className="p-4 flex justify-between gap-2 items-center">
        {isAdmin ? <button
          //   onClick={() => buyNow(menu)}
          className="w-1/2 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 flex justify-center items-center space-x-2"
        >
          <CreditCard size={24} />
          <span>Edit Menu</span>
        </button> : <> {
          !isItemInCart(cart, menu.id) ? <ShoppingCart className='text-orange cursor-pointer' size={28} onClick={() => { addToCart(menu) }} /> : <CheckCircle className="text-orange" size={28} />

        }</>}





        {!isAdmin && <button
          //   onClick={() => buyNow(menu)}
          className="w-1/2 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 flex justify-center items-center space-x-2"
        >
          <CreditCard size={24} />
          <span onClick={() => {
            addToCart(menu)
            navigate(`/checkout/${menu.id}`)

          }}>Buy Now</span>
        </button>}

      </div>
    </div>


  );
};

export default MenuCard
