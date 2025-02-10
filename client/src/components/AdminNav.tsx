
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const AdminNav = ({setDashboard}:{setDashboard:Dispatch<SetStateAction<boolean>>}) => {
const {user}=useUserStore()
  return (
    <div className="bg-gray-800 z-50 text-white absolute top-20 right-50 rounded-md mt-2">
    
      <div className="space-y-2" onClick={()=>{setDashboard(false)}}>
        {user.restaurant_id?<Link  to="/admin/restaurant" className="flex items-center space-x-2 px-6 py-2 hover:bg-hoverOrange rounded">

<span>Restaurant</span>
</Link>:<Link  to="/admin/add-resturent" className="flex items-center space-x-2 px-6 py-2 hover:bg-hoverOrange rounded">

<span>Add Restaurant</span>
</Link>}
        
        
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
