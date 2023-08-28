import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FaRegClock, FaWater } from 'react-icons/fa';

// Import DaisyUI classes
import 'daisyui/dist/full.css';
import StarRating from './startRating';
import MovieStars from './startRating';
import { ToastContainer, toast } from 'react-toastify';

import StartRating from './startRating';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Tooltip from './Tooltip';

const MovieCard = ({ title, genre, rating, imageUrl, id, setAllMovies, movieList, watchLater }) => {
  const navigate = useNavigate()
  const handleDelete = async () => {

    const response = await axios("http://localhost:3005/api/movies", {
      method: "DELETE",
      data: { id }
    })

    const newList = movieList.filter((item) => item._id !== response.data._id)
    setAllMovies(newList)

  }
  const handleAddtoWathcLater = async () => {

    try {

      const data = JSON.parse(localStorage.getItem("movieDb"));

      const response = await axios(
        "http://localhost:3005/api/users/addWatchLater",
        {
          method: "POST",
          data: { movieId: id},
          headers: { Authorization: data.token },
        }
      );
      if (response.status === 200) {
        // toast.success("Added to watch later");
        toast.success("Added to watch later", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      }
      if(response.status == 201){
        toast.info("Already in watch Latter", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      navigate("/login")
      toast.error(error?.response?.data.message);


    }
  }

  return (
    <div className="flex ">
      <img src={imageUrl} alt={title} className="  w-[140px] h-[300px] object-cover rounded-lg " />

      <div className="bg-gray-100 flex flex-col justify-between  shadow-2xl rounded-md p-4">
        <h2 className="text-xl text-gray-800 font-bold mb-2 capitalize">{title}</h2>
        <p className="text-gray-600 font-normal mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, incidunt.</p>
        <div className="">
          {genre?.map((item, index) => (
            <div className="badge badge-accent badge-outline ml-1" key={item?._id} >{item.title}</div>
          ))}
        </div>

        <div className="flex items-center ml-1 mb-4 h-auto rating rating-sm">
          <StartRating rating={rating} id={id} title={title} />
          <p className="text-orange-600 mb-1 mt-1 ml-3 font-bold">{(rating / 25) + 1} Star</p>
        </div>
        <div className="flex items-center justify-between">
          <div className=""></div>
          <div className=" flex items-center">
            {watchLater &&  <Tooltip data="Add watch Latter" > <FaRegClock onClick={handleAddtoWathcLater} className=' text-[22px] hover:text-stone-500 mr-1 cursor-pointer' /> </Tooltip>}
            {watchLater && (<>
              <Tooltip data={"Click and Edit"} > <Link to={`movieEdit/${id}`} className=' btn text-[21px] hover:text-stone-500' ><AiFillEdit /></Link></Tooltip>



              <Tooltip data={"Permenantaly delete!"} > <div onClick={handleDelete} className=" btn text-[21px] hover:text-red-500"><AiFillDelete /></div></Tooltip></>)}
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MovieCard;
