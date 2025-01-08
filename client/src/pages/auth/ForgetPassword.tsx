import React, { useState } from 'react'
import { Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";



const ForgetPassword = () => {
  const [email,setEmail]=useState<string>('')
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <form className="md:p-8 w-[50%] rounded-lg md:border border-gray-200 mx-4">
        <div className="mb-4 text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
        </div>
        <div className="relative ">
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
            
        </div>
        {/* {
            loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
            ) : (
                <Button className="bg-orange hover:bg-hoverOrange">Send Reset Link</Button>
            )
        } */}
        <button
            type="submit"
            className="w-full my-3 bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange"
          >
            Send Reset Link
          </button>
        <span className="text-center my-2">
            Back to{" "}
            
            <Link to="/login" className="text-blue-500 my-2">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default ForgetPassword