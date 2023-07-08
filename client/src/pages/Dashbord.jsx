import React, { useEffect, useState } from 'react';
import MovieCard from '../component/MovieCard';
import Sidebar from '../component/Sidebar';
import axios from 'axios';
import Header from '../component/Header';

const MovieDashboard = () => {
  useEffect(() => {
    getAllMovies()
  }, [])
  const [allMovies,setAllMovies] = useState([{}])
  const getAllMovies=async()=>{
    const response = await axios.get("http://localhost:3005/api/movies/moviesWithGenre")
    setAllMovies(response.data)
  }

  
  return (
    <>
    <Header/>
    <div className='flex'>
      <Sidebar />
      <div className="flex-grow mt-16 ml-20 bg-primary-200 min-h-screen"> {/* Converted color class */}
        {/* ... */}
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold mb-4">Movie Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {  allMovies.map((item,index)=>(
              <MovieCard
              key={index}
              setAllMovies={setAllMovies}
              movieList={allMovies}
              id={item._id}
              imageUrl={item.imageName}
              title={item.title}
              watchLater={true}
              genre={item.genre}
              rating={item.ratings}
            />
            ))}
            {/* Add more MovieCard components with different movie details */}
          </div>
        </main>
        {/* ... */}
      </div>
    </div>
    </>
  );
};

export default MovieDashboard;
