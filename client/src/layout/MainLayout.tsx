import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"




const MainLayout = () => {
  return (
    <div className=" flex flex-col min-h-screen  md:m-0">
      <header className="w-full"><Navbar /></header>
      {/* Navbar  */}
      {/* <header>
        <Navbar/>
    </header> */}
      {/* Main content  */}
      <div className="flex-1">

        <Outlet />
      </div>

      {/* Footer  */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout