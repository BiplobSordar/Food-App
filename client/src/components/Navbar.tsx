
import { useState } from "react";
import { Menu, X, Moon, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import AdminNav from "./AdminNav";

const Navbar = () => {
  const [dashboard, setDashboard] = useState<boolean>(false)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
        <button onClick={() => { setDashboard(true) }} className="flex items-center space-x-2 p-2  hover:bg-gray-700 rounded relative">

          <span className="text-xl text-orange">Dashboard</span>
        </button>
        {dashboard && <AdminNav setDashboard={setDashboard} />}



        <Avatar imageUrl={'../assets/images/user.png'} altText={'User Image'} />
        <ShoppingCart onClick={() => { navigate('/cart') }} className="cursor-pointer hover:text-orange" />

        <button className="px-4 py-2 bg-orange rounded-lg hover:bg-hoverOrange">
          Logout
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        {isMobileMenuOpen ? (
          <X
            className="text-2xl cursor-pointer hover:text-orange"
            onClick={toggleMobileMenu}
          />
        ) : (
          <div className="flex gap-5">
            <ShoppingCart className="cursor-pointer hover:text-orange" />
            <Menu
              className="text-2xl cursor-pointer hover:text-orange"
              onClick={toggleMobileMenu}
            />
          </div>

        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <ul
        className={`z-20 pt-5 absolute top-16 left-0 transform ease-in-out duration-500 w-full h-screen bg-darkBlue text-start md:hidden  flex flex-col justify-between 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}

      >
        <div className="pl-10 text-left relative">
          <li className="mb-2">
            <Avatar imageUrl={'../assets/images/user.png'} altText={'User Image'} size={20} />
          </li>
          <Link to={'/'}><li className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Home</li></Link>
          <Link to={'/profile'}> <li className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Profile</li></Link>
          <Link to={'/order'}> <li className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Order</li></Link>


          <Link to={"/admin/add-resturent"}><li className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Resturent</li> </Link>
          <Link to="/admin/menu">
            <li className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Menu</li>
          </Link>
          <Link to="/admin/orders">
            <li className="cursor-pointer hover:text-orange py-2 text-lg font-bold">Orders</li>
          </Link>






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
