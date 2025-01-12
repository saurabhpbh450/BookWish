//this is my frontend\src\components\Footer\Footer.jsx file
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Replaced Twitter with LinkedIn

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-gray-900 to-gray-950 text-white px-8 py-4'>
      <div className=''>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semisolid'>&copy; 2024, made by Saurabh Mishra</h1>
          <div className='flex gap-4'>
            <a 
              href="https://www.facebook.com/profile.php?id=100049159752579" 
              target="_blank" 
              rel="noopener noreferrer" 
              className='hover:text-blue-500 transition duration-300'
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.instagram.com/saurabhmishra1077/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className='hover:text-pink-500 transition duration-300'
            >
              <FaInstagram />
            </a>
            <a 
              href="https://in.linkedin.com/in/saurabhmishra1077" 
              target="_blank" 
              rel="noopener noreferrer" 
              className='hover:text-blue-700 transition duration-300'
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
