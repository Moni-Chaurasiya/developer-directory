import {useState} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useAuth} from '../context/AuthContext';
import {signup as signupAPI} from '../services/api'
import { UserPlus, User, Mail, Lock } from 'lucide-react';


const schema= z.object({
    name: z.string().min(2,'Name must be at least 2 Characters'),
    email: z.string.email('Please enter a valid email'),
    password: z.string().min(6,'Password must be at least 6 characters')
})

const Signup= ()=>{
    const {signup} = useAuth();
    const [loading,setLoading]=useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors}
    }   =  useForm({resolver:zodResolver(schema)})
    
   const onSubmit= async (data)=>{
     try {
        setLoading(true);
        const response = await signupAPI(data);
        signup(response.data.user,response.data.token);
     }catch (error) {
        toast.error(error.response?.data?.message || 'Signup failed')
     }finally{
        setLoading(false)
     }
   }
return (
   <div className="">
      <div className="">
        <div className="">
          <div className="">
            <img src="/dev.png" alt="Logo" className="h-12 w-12" />
            <h1 className="">
              DevDirectory
            </h1>
          </div>
          <h2 className="">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sign up to start managing developers
          </p>
        </div>

        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="">
                Name
              </label>
              <div className="">
                <User className="" />
                <input
                  type="text"
                  {...register('name')}
                  className=""
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="2">
                Email
              </label>
              <div className="">
                <Mail className="" />
                <input
                  type="email"
                  {...register('email')}
                  className=""
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="">
                Password
              </label>
              <div className="r">
                <Lock className="" />
                <input
                  type="password"
                  {...register('password')}
                  className=""
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className=""
            >
              {loading ? (
                <>
                  <div className=""></div>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Sign Up
                </>
              )}
            </button>
          </form>

          <div className="">
            <p className="">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
)


}

export default Signup;