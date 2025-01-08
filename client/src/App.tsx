
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgetPassword from './pages/auth/ForgetPassword'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import HeroSection from './components/HeroSection'
import NotFound from './pages/404'
import Profile from './pages/Profile'
import SearchPage from './pages/SearchPage'
import ResturentDetails from './pages/ResturentDetails'
import AvailableResturent from './components/AvailableResturent'
import Cart from './pages/Cart'
import AddResturent from './pages/admin/AddResturent'
import AddMenuToResturent from './pages/admin/AddMenuToResturent'
import Orders from './pages/admin/Orders'
import Success from './pages/Success'

function App() {

  const appRoute = createBrowserRouter([
    {path:'/',
      element:<MainLayout/>,
      children:[
        {
          path:'*',
          element:<NotFound/>
        },
        {
          path:'/',
          element:<>
          <HeroSection/>
          <AvailableResturent/>
          </>
        },
        {path:'/login',
          element:<Login/>
         
        },
        {
          path:'/signup',
          element:<Signup/>
        },
        {
          path:'/forgot-password',
          element:<ForgetPassword/>
        },
        {
          path:'/reset-password',
          element:<ResetPassword/>
        },
        {
          path:'/verify-email',
          element:<VerifyEmail/>
        },
        {
          path:'/profile',
          element:<Profile/>
        },
        {
          path:'/search/:searchText',
          element:<SearchPage/>
        },
        {
          path:'/resturent/:id',
          element:<ResturentDetails/>
        },
        {
          path:'/cart',
          element:<Cart/>

        },
        {
          path:'/order',
          element:<Success/>
        },

      //  admin routes start here 
      {
        path:'/admin/add-resturent',
        element:<AddResturent/>
      },
      {
        path:'/admin/menu',
        element:<AddMenuToResturent/>
      },
      {
        path:'/admin/orders',
        element:<Orders/>
      }




      ]
    }


  ])


  return (
    <main>
      <RouterProvider router={appRoute}>

      </RouterProvider>
    </main>

  )
}

export default App
