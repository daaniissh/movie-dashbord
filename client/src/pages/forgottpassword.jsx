import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [load, setLoad] = useState(false)
  const handleInputChange = (e) => {
    setMail(e.target.value);
  };
  const handleSubmit = async (e) => {

    e.preventDefault()
    try {

      if (mail) {
        setLoad(true)
        const response = await axios("http://localhost:3005/api/users/forgotPassword", {
          method: "POST",
          data: { mail },
        })
        if (response.status === 200) {

          toast.success("Your reset code has been sent successfully, Please check your inbox",{
            position: "top-center",
    
            autoClose: 2500,
            hideProgressBar: true,
    
          })
 
          setTimeout(() => {
          navigate("/resetPassword")

        }, 3000);
        } else if (
          response.status == 400
        ) {
          toast.error("Failed to send reset code!")
          setLoad(false)
        }

      } else {
        toast.error("Enter mail address!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoad(false)
    } finally {
      setLoad(false)
    }
  }
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">

      <form className="bg-white shadow-2xl border border-gray-100 rounded-sm px-8 pt-6 pb-8 mb-4">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="logo.png"
            alt="Logo"
          />
          <h2 className="mb-6 p-5 text-center text-3xl font-extrabold text-gray-900">
            ForgotPassword
          </h2>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>

          <input
            className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={mail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">



          <button onClick={handleSubmit} className="btn bg-blue-600 text-white font-bold hover:text-black">
            {load && <span className="loading loading-spinner"></span>}
            {load ? "Sending..." : "Send code on your gmail"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default ForgotPassword 