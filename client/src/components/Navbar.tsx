
import { useState } from "react";
import { Menu, X, ShoppingCart, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import AdminNav from "./AdminNav";
import { useUserStore } from "../store/useUserStore";
import { useToast } from "../context/ToastContext";
import { useCartStore } from "../store/useCartStore";
import image from '../assets/images/user.png'

const Navbar = () => {
  const { loading, user, logout } = useUserStore()

  const { cart } = useCartStore()
  const { addToast } = useToast()
  const [dashboard, setDashboard] = useState<boolean>(false)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handelLogout = async () => {
    const result = await logout(addToast)
    if (result) {
      window.location.reload()
      navigate('/login')
    }
    return
  }


  return (
    <nav className="bg-darkBlue text-white w-full justify-between px-6 py-5 flex items-center md:justify-around  border-b-2 border-gray-500">
      {/* Logo */}
      <Link to={'/'}>
        <div className="text-2xl font-bold cursor-pointer hover:text-orange">Little Bite</div>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6">
        <Link to={'/'}>
          <li className="cursor-pointer text-xl font-bold hover:text-orange">Home</li>
        </Link>
        <Link to={'/profile'}>
          <li className="cursor-pointer text-xl font-bold hover:text-orange">Profile</li>
        </Link>
        <Link to={'/order'}>
          <li className="cursor-pointer text-xl font-bold hover:text-orange">Order</li>
        </Link>
      </ul>

      {/* Icons + Logout Button */}
      <div className="hidden md:flex items-center space-x-4 ">
        {user && user.seller && <button onClick={() => { setDashboard(!dashboard) }} className="flex items-center space-x-2 p-2  hover:bg-gray-700 rounded relative">

          <span className="text-xl text-orange">Dashboard</span>
        </button>}

        {dashboard && <AdminNav setDashboard={setDashboard} />}



        <Avatar imageUrl={user?.avatar||image} altText={'User Image'} />
       
        <div className="relative">
          {/* Cart Icon */}
          <ShoppingCart
            onClick={() => {
              navigate('/cart');
            }}
            className="cursor-pointer hover:text-orange"
          />

          {/* Cart Item Count */}
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cart.length}
          </div>
        </div>

        {user ? loading ? <button
          disabled
          className="w-full bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange flex items-center justify-center"
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />


          Logging Out
        </button> :
          <button onClick={handelLogout} className="px-4 py-2 bg-orange rounded-lg hover:bg-hoverOrange">
            Logout
          </button> : <> <button onClick={() => { navigate('/signup') }} className="px-4 py-2 bg-orange rounded-lg hover:bg-hoverOrange">
            SignUp
          </button>
          <button onClick={() => { navigate('/login') }} className="px-4 py-2 bg-orange rounded-lg hover:bg-hoverOrange">
            Login
          </button></>}



      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
      <div className="flex gap-5">
            <div className="relative">
              {/* Cart Icon */}
              <ShoppingCart
                onClick={() => {
                  navigate('/cart');
                }}
                className="cursor-pointer hover:text-orange"
              />

              {/* Cart Item Count */}
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center  justify-center">
                {cart.length}
              </div>
            </div>
            <Menu
              className="text-2xl cursor-pointer hover:text-orange"
              onClick={toggleMobileMenu}
            />
          </div>
      </div>

      {/* Mobile Dropdown Menu */}
     
      <ul
  className={`z-20 pt-5 fixed top-0 left-0 transform ease-in-out duration-500 w-full h-screen bg-darkBlue text-start md:hidden flex flex-col justify-between
    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
  `}
>
  
  <div className="pl-10 text-left relative ">
  <div className="flex justify-end mr-5 mt-5">
  <X
            className="text-2xl cursor-pointer hover:text-orange"
            onClick={toggleMobileMenu}
          />
  </div>
    <li className="mb-2">
      <Avatar imageUrl={user?.avatar||image} altText={'User Image'} size={20} />
    </li>
    <Link to={'/'}><li   onClick={toggleMobileMenu}  className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Home</li></Link>
    <Link to={'/profile'}><li   onClick={toggleMobileMenu}  className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Profile</li></Link>
    <Link to={'/order'}><li   onClick={toggleMobileMenu}  className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Order</li></Link>

    {user && user.seller && <>
      {user.restaurant_id ? (
        <Link to="/admin/restaurant">
          <li   onClick={toggleMobileMenu}  className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Restaurant</li>
        </Link>
      ) : (
        <Link to="/admin/add-resturent">
          <li   onClick={toggleMobileMenu}  className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Add Restaurant</li>
        </Link>
      )}

      <Link to="/admin/menu"><li    onClick={toggleMobileMenu} className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Menu</li></Link>
      <Link to="/admin/orders"><li   onClick={toggleMobileMenu} className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Orders</li></Link>
    </>}
  </div>

  <div className="w-full flex items-center justify-center pb-5">
    <button className="px-6 py-2 w-[80%] bg-orange rounded-lg hover:bg-hoverOrange">
      Logout
    </button>
  </div>
</ul>

    </nav>
  );
};

export default Navbar;
