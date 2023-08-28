import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css'
import MovieDashboard from './pages/Dashbord';

import 'react-toastify/dist/ReactToastify.css';
import MovieForm from './pages/MovieEdit';
import GenreForm from './pages/GenreForm';
import MovieCard from './component/MovieCard';
import MovieWatchLater from './pages/watchLater';
import Header from './component/Header';
import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import ForgotPassword from './pages/forgottpassword';
import ResetPassword from './pages/Resetassword';

const App = () => {
  return (
    <>

    <Routes>
      <Route exact path="/" element={<MovieDashboard />} />
      <Route path="/movies" element={<MovieForm />} />
      <Route path="/movieEdit/:id" element={<MovieForm />} />
      <Route path="/genre" element={<GenreForm />} />
      <Route path="/signUp" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/movieWatchLater" element={<MovieWatchLater />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </>
  );
};


export default App
