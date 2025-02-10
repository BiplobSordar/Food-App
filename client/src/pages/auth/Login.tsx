import { Loader2, Lock, Mail } from 'lucide-react'
import { ChangeEvent,  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginFormData, loginSchema, } from '../../schema/userSchema'
import { useUserStore } from '../../store/useUserStore'
import { useToast } from '../../context/ToastContext'




const Login = () => {

  const { loading, login } = useUserStore()
  const { addToast } = useToast()
  const [formData, setFormData] = useState<LoginFormData
  >({
    email: '',
    password: ''
  }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
 
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    try {
      loginSchema.parse(formData); // Validate using Zod
      setErrors({}); // Clear errors if validation passes

    


      // call login Api
      const result = await login(formData, addToast)

      if (result) {
        navigate('/')
      }
      return

    } catch (err: any) {
      if (err.errors) {
        // Map errors to state
        const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
        err.errors.forEach((error: any) => {
          const field = error.path[0] as keyof LoginFormData;
          newErrors[field] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };


  

  // console.log(errors.password,'this is the errors')
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">

      <form
        onSubmit={handleSubmit}

        className="md:p-8 w-[50%] rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl text-center">Little Bite</h1>

        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={changeEventHandler}
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
              onChange={changeEventHandler}
              className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <Lock className="absolute inset-y-2 left-2 h-5 w-5 text-gray-500 pointer-events-none" />

            {errors && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="mb-10  items-center">
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
              className="w-full  bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange"
            >
              Login
            </button>

          )}
          <div className="mt-4">
            <Link className="hover:text-blue-500 hover:underline" to={'/forgot-password'}>Forgot Password</Link>
          </div>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <p className="mt-2">
          Don't have an account?{' '}
          <Link className="hover:text-blue-500 hover:underline" to={'/signup'}>Signup</Link>

        </p>
      </form>
    </div>

  )
}



export default Login