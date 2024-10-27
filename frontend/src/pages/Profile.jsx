// this is my frontend\src\pages\Profile.jsx file

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';
import { FaMoon, FaSun } from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState();
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in.');
        return;
      }
      try {
        const response = await axios.get(
          'http://localhost:1000/api/v1/get-user-information',
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error.message);
      }
    };
    fetch();
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`transition-all duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      } px-4 md:px-12 flex flex-col md:flex-row py-8 gap-4`}
    >
      <button
        className="absolute top-4 right-8 text-xl"
        onClick={toggleTheme}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      {!profile && (
        <div className="w-full h-[100vh] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen bg-gradient-to-r from-grey-900 to-grey-800">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
