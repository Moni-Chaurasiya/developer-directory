import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogIn, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { login as loginAPI } from '../services/api';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await loginAPI(data);
      login(response.data.user, response.data.token);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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
            Welcome Back
          </h2>
          <p className="">
            Login to manage your developer directory
          </p>
        </div>

        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="">
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
              <div className="">
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
                  <div className="e"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="">
            <p className="">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;