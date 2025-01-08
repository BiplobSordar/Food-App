
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

const AdminNav = ({setDashboard}:{setDashboard:Dispatch<SetStateAction<boolean>>}) => {
  return (
    <div className="bg-gray-800 text-white absolute top-20 right-50 rounded-md mt-2">
      {/* <div className="flex items-center space-x-4 px-6 py-4">
        <button className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">

          <span>Dashboard</span>
        </button>
      </div> */}
      <div className="space-y-2" onClick={()=>{setDashboard(false)}}>
        <Link  to="/admin/add-resturent" className="flex items-center space-x-2 px-6 py-2 hover:bg-hoverOrange rounded">

          <span>Restaurant</span>
        </Link>
        <Link to="/admin/menu" className="flex items-center space-x-2 px-6 py-2 hover:bg-hoverOrange rounded">

          <span>Menu</span>
        </Link>
        <Link to="/admin/orders" className="flex items-center space-x-2 px-6 py-2 hover:bg-hoverOrange rounded">

          <span>Orders</span>
        </Link>

      </div>
    </div>
  );
};

export default AdminNav;
