// this is my frontend\src\components\BookCard\BookCard.jsx file
import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const BookCard = ({ data, favourite, onRemove }) => { // Add onRemove callback
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id,
    };

    const handleRemoveBook = async () => {
        try {
            const response = await axios.put(
                "https://bookwishofficial.onrender.com/api/v1/remove-book-from-favourite",
                {},
                { headers }
            );
            toast.success(response.data.message); // Use toast
            onRemove(data._id); // Trigger the callback to refresh favorites
        } catch (error) {
            toast.error('Failed to remove the book from favorites!'); // Use toast for error
        }
    };

    return (
        <motion.div
            className='bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'
            whileHover={{ scale: 1.05 }}
        >
            <Link to={`/view-book-details/${data._id}`}>
                <div className='flex flex-col'>
                    <div className='bg-gradient-to-r from-gray-800 to-gray-900 rounded-md flex items-center justify-center'>
                        <img src={data.url} alt={data.title} className='h-[30vh] object-cover' />
                    </div>
                    <h2 className='mt-4 text-xl text-white font-semibold h-[12vh] text-center'>{data.title}</h2>
                    <p className='mt-2 text-zinc-400 font-semibold h-[7vh] text-center'>by {data.author}</p>
                    <p className='mt-2 text-zinc-200 text-xl font-semibold text-center'>₹ {data.price}</p>
                </div>
            </Link>
            {favourite && (
                <button
                    className='bg-gradient-to-r from-amber-900 to-amber-950 px-4 py-2 border border-yellow-500 text-white font-semibold mt-4 hover:bg-yellow-400 transition-all duration-300'
                    onClick={handleRemoveBook}
                >
                    Remove
                </button>
            )}
        </motion.div>
    );
};

export default BookCard;


