//this is my frontend\src\components\Footer\Footer.jsx file
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Added social media icons

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-gray-900 to-gray-950 text-white px-8 py-4'>
        <div className=''>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semisolid'>&copy; 2024, made by Saurabh Mishra</h1>
            <div className='flex gap-4'>
              <a href="https://facebook.com" className='hover:text-blue-500 transition duration-300'><FaFacebookF /></a>
              <a href="https://twitter.com" className='hover:text-blue-500 transition duration-300'><FaTwitter /></a>
              <a href="https://instagram.com" className='hover:text-pink-500 transition duration-300'><FaInstagram /></a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer;
