import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const ResetPassword = () => {
  const [load, setLoad] = useState(false)

  const [passwordReset, setPasswordReset] = useState({
    resetCode: "",
    newPassword: "",
  });
  const [matchPassword, setMatchPassword] = useState(true);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setPasswordReset((prev) => ({
      ...passwordReset,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (passwordReset.newPassword && matchPassword) {
        setLoad(true)
        const response = await axios("http://localhost:3005/api/users/resetPassword", {
          method: "POST",
          data: {
            passwordReset,
          },
        });

        if (response.status === 200) {
          toast.success("Password reset succeeded 👍🏻", {
            position: "top-center",

            autoClose: 2500,
            hideProgressBar: true,

          })

          setTimeout(() => {
            navigate("/login")

          }, 3000);

        }
      }
    } catch (error) {
      setLoad(false)

      toast.error(error.response.data.message);
    }
  }
  const conformPassword = (e) => {
    const data = e.target.value
    if (passwordReset.newPassword != data) {
      setMatchPassword(false)
    } else {
      setMatchPassword(true)
    }
  }
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">

      <form className="bg-white shadow-2xl border border-indigo-200 rounded-md px-8 pt-6 pb-8 mb-4">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="logo.png"
            alt="Logo"
          />
          <h2 className="mb-6 p-5 text-center text-3xl font-extrabold text-gray-900">
            ResetPassword
          </h2>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Reset code
          </label>

          <input
            className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name='resetCode' type="number"
            placeholder="Enter your email"
            value={passwordReset.resetCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            New password
          </label>

          <input
            className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name='newPassword'
            placeholder="Enter your New password"
            value={passwordReset.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Conform password
          </label>

          <input
            className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Conform your password"
            onChange={(e) => conformPassword(e)}
            required
          />
          <div className="w-full">
            {!matchPassword && (
              <span className="text-red-500 text-xs">
                Not match with new password
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={handleSubmit} className="btn bg-blue-600 text-white font-bold hover:text-black">
            {load && <span className="loading loading-spinner"></span>}
            {load ? "loading..." : "submit"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default ResetPassword