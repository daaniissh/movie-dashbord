import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import axios from "axios";
import MovieCard from '../component/MovieCard';
const MovieWatchLater = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllData();
    console.log(movies.length + 1, "r");

  }, []);
  const getAllData = async () => {
    const movieDb = JSON.parse(localStorage.getItem("movieDb"));
    const response = await axios("http://localhost:3005/api/users/watchlatter", {
      method: "GET",
      headers: { Authorization: movieDb?.token }
    })
    setMovies(response?.data[0].movies)
    // localStorage.setItem("length", response?.data[0].movies.length)
  }




  return (
    <>
      <Header length={movies.length + 1} hidden={false} />
      <div className="container mx-auto mt-16 py-8">
        <h1 className="text-2xl font-bold mb-4">Movie Watch Later</h1>
        <div className="flex w-full flex-col justify-center items-center">

          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {movies.length != 0 && (movies?.map((movie) => (

              <MovieCard key={movie._id}
                id={movie._id}
                imageUrl={movie.imageName}
                title={movie.title}
                // watchLater={true}
                genre={movie.genre}
                rating={movie.ratings} />

            )))}
          </div>
          {movies.length == 0 && <div className="flex w-full flex-col justify-center items-center">

            <img src="empty.png" alt="" />
            <h1 className='font-bold text-3xl mb-10 ' >No added any movies in watch latter</h1>
          </div>}

        </div>
      </div>
    </>
  );
};

export default MovieWatchLater;
