import React, { useEffect, useState } from 'react';
import MovieCard from '../component/MovieCard';
import Sidebar from '../component/Sidebar';
import axios from 'axios';
import Header from '../component/Header';
import usePagination from '../hooks/usePagination';

const MovieDashboard = () => {
  const [movieList, setMovieList] = useState([]);
  const { pagination, pageNo, setTotalPage } = usePagination({
    pageNo: 1,
    pageSize: 6,
    totalPage: ''
  })

  const [selectedGenres, setSelectedGenred] = useState([]);
  const [filterStar, setFilterStar] = useState(0);
  useEffect(() => {
    getMovieList();
  }, [pagination.pageNo, pagination.totalPage, selectedGenres, filterStar]);
  useEffect(() => {
    getAllMovies()
  }, [])
  const getMovieList = async () => {
    try {
      const response = await axios(`http://localhost:3005/api/movies/filter?page=${pagination.pageNo}&pageSize=${pagination.pageSize}`,
        {
          method: "POST",
          data: { selectedGenres, filterStar }
        })
      setMovieList(response?.data?.movieList)
      setTotalPage(response?.data?.totalPage)
    } catch (error) {
      console.log("Error fetching movie list", error);
    }
  }
  const [allMovies, setAllMovies] = useState([{}])
  const getAllMovies = async () => {
    const response = await axios.get("http://localhost:3005/api/movies/moviesWithGenre")
    setAllMovies(response.data)
  }


  return (
    <>
      <Header
      hidden={true}
        selectedGenres={selectedGenres}
        filterGenre={setSelectedGenred}
        selectedStar={filterStar}
        filterStar={setFilterStar} />
      <div className='flex'>
        <Sidebar />
        <div className="flex-grow mt-16 ml-20 bg-primary-200 min-h-screen"> {/* Converted color class */}
          {/* ... */}
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Movie Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movieList.map((item, index) => (
                <MovieCard
                  key={index}
                  setAllMovies={setMovieList}
                  movieList={allMovies}
                  id={item._id}
                  imageUrl={item.imageName}
                  title={item.title}
                  watchLater={true}
                  genre={item.genre}
                  rating={item.ratings}
                />
              ))}

            </div>
            <div className="absolute  bottom-0   left-[50%] -translate-x-2/4 -translate-y-2/4">
              <div className="join flex justify-center pb-4">{pageNo}</div>
            </div>
          </main>
          {/* ... */}
        </div>
      </div>
    </>
  );
};

export default MovieDashboard;
