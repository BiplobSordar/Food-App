import { Loader2, Lock, Mail, PhoneOutgoing, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupFormData, signupSchema } from "../../schema/userSchema";
import { useUserStore } from "../../store/useUserStore";
import axios from "axios";
import { useToast } from "../../context/ToastContext";
// const API_ENDPOINT = 'http://localhost:7000/api/v1/user'
axios.defaults.withCredentials = true;


const Signup = () => {
    const { addToast } = useToast()
    const navigate = useNavigate()
    const { signup, loading, user } = useUserStore()


    const [formData, setFormData] = useState<SignupFormData>({
        username: "",
        email: "",
        password: "",
        contact: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // Validate the form on submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            signupSchema.parse(formData); // Validate using Zod
            setErrors({}); // Clear errors if validation passes


            const result = await signup(formData, addToast)
            

           
            if (result) {
                navigate('/verify-email')
            }
        } catch (err: any) {
            if (err.errors) {
                // Map errors to state
                const newErrors: Partial<Record<keyof SignupFormData, string>> = {};
                err.errors.forEach((error: any) => {
                    const field = error.path[0] as keyof SignupFormData;
                    newErrors[field] = error.message;
                });
                setErrors(newErrors);
            }
        }

    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center ">
            <form
                onSubmit={handleSubmit}

                className="md:p-8 w-[50%] rounded-lg md:border border-gray-200 mx-4"
            >
                <div className="mb-4">
                    <h1 className="font-bold text-center text-2xl">Little Bite</h1>


                </div>
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        <User className="absolute inset-y-2 left-2 h-5 w-5 text-gray-500 pointer-events-none" />

                        {errors && (
                            <span className="text-xs text-red-500">{errors.username}</span>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        <Mail className="absolute inset-y-2 left-2 h-5 w-5 text-gray-500 pointer-events-none" />

                        {errors && (
                            <span className="text-xs text-red-500">{errors.email}</span>
                        )}
                    </div>


                </div>
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        <Lock className="absolute inset-y-2 left-2 h-5 w-5 text-gray-500 pointer-events-none" />

                        {errors && (
                            <span className="text-xs text-red-500">{errors.password}</span>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Contact Number"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        <PhoneOutgoing className="absolute inset-y-2 left-2 h-5 w-5 text-gray-500 pointer-events-none" />

                        {errors && (
                            <span className="text-xs text-red-500">{errors.contact}</span>
                        )}
                    </div>
                </div>
                <div className="mb-10">
                    {loading ? (
                        <button
                            disabled
                            className="w-full bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange flex items-center justify-center"
                        >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                            Please wait
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange"
                        >
                            Signup
                        </button>
                    )}
                    {/* <div className="mt-4">
                        <Link className="hover:text-blue-500 hover:underline" to={'/forgot-password'}>Forgot Password</Link>
                    </div> */}
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <p className="mt-2">
                    Already have an account?{' '}
                    <Link className="hover:text-blue-500 hover:underline" to={'/login'}>Login</Link>


                </p>
            </form>
        </div>

    )
}

export default Signup;