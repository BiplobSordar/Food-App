
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [comfirmPassword,setConfirmPassword]=useState<string>('')
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
    <form className="flex flex-col gap-5 md:p-8  w-[50%] rounded-lg mx-4">
      <div className="text-center">
        <h1 className="font-extrabold text-center text-2xl mb-2">Reset Password</h1>
        <p className="text-sm text-gray-600">Enter your new password to reset old one</p>
      </div>
      <div className="relative my-2">
          <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
           className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
      </div>
      <div className="relative my-2">
          <input
          type="confirmpassword"
          value={comfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Enter Confirm Password"
           className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
      </div>
      {/* {
          loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
          ) : (
              <Button className="bg-orange hover:bg-hoverOrange">Reset Password</Button>
          )
      } */}
      <button
            type="submit"
            className="w-full my-3 bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange"
          >
           Reset Password
          </button>
      <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500">Login</Link>
      </span>
    </form>
  </div>
  )
}

export default ResetPassword