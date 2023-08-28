import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const LoginPage = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios("http://localhost:3005/api/users/login", {
        method: "POST",
        data: login
      })
      if (response.status == 200) {
        localStorage.setItem("movieDb", JSON.stringify({
          token: response.data?.accessToken,
          email: response.data?.email,
          title: response.data?.userName
        }))
        const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 1000));
        toast.promise(
          resolveAfter3Sec,
          {
            pending: 'Wait...',
            success: 'successfully logined👌',
            error: 'Promise rejected 🤯'
          }
        )
        setTimeout(() => {
          navigate("/")

        }, 3000);
      }
    } catch (error) {
      toast.error(error?.response?.data.message, {
        position: "top-center",

        autoClose: 2500,
        hideProgressBar: true,

      });
    }
  };
  const handleInputChange = (e) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="logo.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm gap-5 -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                onChange={handleInputChange}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={handleInputChange}

                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">


            </div>

            <div className="text-sm">
              <Link to="/ForgotPassword" state={{ email: login.email }} className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 11c0-1.42.54-2.75 1.43-3.74A5.932 5.932 0 015.89 5.36C6.9 2.47 9.56.5 12.5.5c2.93 0 5.6 1.97 6.61 4.86A5.931 5.931 0 0120 11v5a1 1 0 01-1 1H1a1 1 0 01-1-1v-5zm12-5a3 3 0 11-6 0 3 3 0 016 0zm-1 0a2 2 0 11-4 0 2 2 0 014 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
