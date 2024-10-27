// this is my frontend\src\components\Home\Hero.jsx file
import React from 'react'
import logo from '../../assets/hero01.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Added framer-motion

const Hero = () => {
  return (
    <div className='h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center sm:mt-4'>
        <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-normal'>
            <motion.h1 
              className=' text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Books You Dream Of, Just a Click Away
            </motion.h1>
            <motion.p 
              className='mt-4 txt-xl text-zinc-300 text-center lg:text-left'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Find your next favorite book with just a click—where every wish for the perfect read becomes a reality
            </motion.p>
            <motion.div 
              className='mt-8'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link 
               to="/all-books" 
               className='text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc-800 rounded-full'
               >
                Discover Books
              </Link>
            </motion.div>
        </div>
        <motion.div 
          className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <img src={logo} alt='bookHeroPage' />
        </motion.div>
    </div>
  )
}

export default Hero;
