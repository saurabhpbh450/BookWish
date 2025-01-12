//this is my frontend\src\components\ViewBookDetails\ViewBookDetails.jsx

import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart, FaCartPlus, FaEdit } from "react-icons/fa"; 
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://bookwishofficial.onrender.com/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        toast.error("Error fetching book details.");
      }
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourate = async () => {
    try {
      const response = await axios.put(
        "https://bookwishofficial.onrender.com/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error adding to favourites.");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "https://bookwishofficial.onrender.com/api/v1/add-to-cart",
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error adding to cart.");
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        "https://bookwishofficial.onrender.com/api/v1/delete-book",
        { headers }
      );
      toast.success(response.data.message);
      navigate("/all-books");
    } catch (error) {
      toast.error("Error deleting book.");
    }
  };

  const defaultImage = 'path/to/placeholder/image.jpg';

  return (
    <>
      <ToastContainer />
      {data ? (
        <div className='px-4 md:px-12 py-8 bg-gradient-to-r from-gray-900 to-gray-950 flex flex-col md:flex-row gap-6 items-start shadow-lg '>
          <div className='w-full lg:w-3/6 '>
            <motion.div
              className='flex justify-around bg-gradient-to-r from-gray-800 to-gray-900 p-12 rounded-lg transition-transform transform hover:scale-105'
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={data.url || defaultImage}
                alt={data.title}
                className='h-[65vh] lg:h-[70vh] rounded-lg object-cover transition-opacity duration-300 shadow-lg'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {isLoggedIn && role === "user" && (
                <div className='flex flex-col'>
                  <motion.button
                    className='rounded-full text-3xl p-3 mt-4 text-red-500 transition-transform hover:scale-110'
                    onClick={handleFavourate}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaHeart />
                  </motion.button>
                  <motion.button
                    className='rounded-full text-3xl p-3 mt-4 text-blue-500 transition-transform hover:scale-110'
                    onClick={handleCart}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaCartPlus />
                  </motion.button>
                </div>
              )}
              {isLoggedIn && role === "admin" && (
                <div className='flex flex-col'>
                  <Link
                    to={`/updateBook/${id}`}
                    className='rounded-full text-3xl p-3 mt-4 text-blue-500 items-center transition-transform hover:scale-110'
                  >
                    <FaEdit />
                  </Link>
                  <motion.button
                    className='rounded-full text-3xl p-3 mt-4 text-red-500 items-center transition-transform hover:scale-110'
                    onClick={deleteBook}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MdDeleteForever />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
          <div className='p-4 w-full lg:w-3/6'>
            <h1 className='text-4xl text-yellow-100 font-semibold'>{data.title}</h1>
            <p className='text-yellow-300 mt-1'>by {data.author}</p>
            <p className='text-zinc-400 mt-4 text-xl'>{data.desc}</p>
            <p className='flex text-yellow-200 mt-4 items-center justify-start'>
              <GrLanguage className='me-3' />
              {data.language}
            </p>
            <p className='text-yellow-100 mt-4 text-3xl font-semibold'>₹ {data.price}</p>
          </div>
        </div>
      ) : (
        <div className='h-screen bg-zinc-900 flex items-center justify-center'>
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;

