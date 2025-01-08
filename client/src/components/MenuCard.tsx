import { ShoppingCart, CreditCard } from 'lucide-react';

export type MenuItem = {
  id: number; // Unique identifier for each menu item
  name: string; // Name of the menu item
  description: string; // Description of the menu item
  price: number; // Price of the menu item
  image: string; // URL of the image for the menu item
};



const MenuCard = ({ menu, addToCart }: { menu: MenuItem; addToCart: (menu: MenuItem) => void }) => {
  return (
    //   <div className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200">
    //     <img src={menu.image} alt={menu.name} className="w-full h-40 object-cover" />
    //     <div className="p-4">
    //       <h2 className="text-xl font-semibold text-gray-800">{menu.name}</h2>
    //       <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
    //       <h3 className="text-lg font-semibold mt-4">
    //         Price: <span className="text-[#D19254]">₹{menu.price}</span>
    //       </h3>
    //     </div>
    //     <div className="p-4">
    //       <button
    //         onClick={() => addToCart(menu)}
    //         className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600"
    //       >
    //         Add to Cart
    //       </button>
    //     </div>
    //   </div>

    //     <div className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200 transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
    //   {/* Image Section */}
    //   <img src={menu.image} alt={menu.name} className="w-full h-40 object-cover" />

    //   {/* Content Section */}
    //   <div className="p-4">
    //     <h2 className="text-xl font-semibold text-gray-800">{menu.name}</h2>
    //     <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
    //     <h3 className="text-lg font-semibold mt-4">
    //       Price: <span className="text-[#D19254]">₹{menu.price}</span>
    //     </h3>
    //   </div>

    //   {/* Button Section */}
    //   <div className="p-4">
    //     <button
    //       onClick={() => addToCart(menu)}
    //       className="w-full bg-orange-500 text-white font-semibold py-2 rounded shadow hover:bg-orange-600 hover:shadow-lg transition-all duration-300"
    //     >
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>




    <div className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <img src={menu.image} alt={menu.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{menu.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
        <h3 className="text-lg font-semibold mt-4">
          Price: <span className="text-[#D19254]">₹{menu.price}</span>
        </h3>
      </div>
      <div className="p-4 flex justify-between gap-2 items-center">
        <ShoppingCart className='text-orange cursor-pointer' size={28} />
        

        

        <button
          //   onClick={() => buyNow(menu)}
          className="w-1/2 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 flex justify-center items-center space-x-2"
        >
          <CreditCard size={24} />
          <span>Buy Now</span>
        </button>
      </div>
    </div>


  );
};

export default MenuCard
