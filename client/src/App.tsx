
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
import { ToastProvider } from './context/ToastContext'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoute'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import Loading from './components/Loading'
import MyRestaurant from './pages/admin/MyRestaurantDetails'
import Checkout from './pages/user/CheckoutPage'


const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: '/',
        element: <>
          <HeroSection />
          <AvailableResturent />
        </>
      },
      {
        path: '/login',

        element: <AuthenticatedUser><Login /></AuthenticatedUser>

      },
      {
        path: '/signup',
        element: <AuthenticatedUser><Signup /></AuthenticatedUser>
      },
      {
        path: '/forgot-password',
        element: <ForgetPassword />
      },
      {
        path: '/reset-password/:token',
        element: <ResetPassword />
      },
      {
        path: '/verify-email',
        element: <VerifyEmail />
      },
      {
        path: '/profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: '/search/:searchText',
        element: <SearchPage />
      },
      {
        path: '/resturent/:id',
        element: <ResturentDetails />
      },
      {
        path: '/cart',
        element: <Cart />

      },
      {
        path: '/order',
        element: <ProtectedRoute><Success /></ProtectedRoute>
      },
      {
        path: '/checkout/:id',
        element: <ProtectedRoute><Checkout/></ProtectedRoute>
      },

      //  admin routes start here 
      {
        path: '/admin/add-resturent',
        element: <AdminRoute><AddResturent /></AdminRoute>
      },
      {
        path: '/admin/restaurant',
        element: <AdminRoute><MyRestaurant /></AdminRoute>
      },
      {
        path: '/admin/menu',
        element: <AdminRoute><AddMenuToResturent /></AdminRoute>
      },
      {
        path: '/admin/orders',
        element: <AdminRoute> <Orders /></AdminRoute>
      }




    ]
  }


])
function App() {



  const { checkAuthentication, isCheckingAuth ,isAuthenticated,user} = useUserStore()
  useEffect(() => {
    checkAuthentication()
   
   
  }, [checkAuthentication])

  if(!isAuthenticated && user){
    localStorage.clear();
 
    location.reload(); 
  }


  if (isCheckingAuth) return <Loading />
  return (


    <main>
      <ToastProvider>

        <RouterProvider router={appRoute} />
      </ToastProvider>


    </main>

  )
}

export default App
