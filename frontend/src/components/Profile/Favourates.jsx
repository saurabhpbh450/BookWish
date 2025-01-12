//this is my frontend\src\components\Profile\Favourates.jsx file
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import logo from '../../assets/favoriteSvg.svg';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // Fetching favourite books
  const fetchFavouriteBooks = async () => {
    try {
      const response = await axios.get(
        'https://bookwishofficial.onrender.com/api/v1/get-favourite-books',
        { headers }
      );
      setFavouriteBooks(response.data.data);
    } catch (error) {
      toast.error('Error fetching favorite books!');
    }
  };

  useEffect(() => {
    fetchFavouriteBooks(); // Fetch only once on mount
  }, []);

  // Callback to handle book removal
  const handleBookRemoved = (removedBookId) => {
    setFavouriteBooks(favouriteBooks.filter(book => book._id !== removedBookId));
  };

  return (
    <>
      <ToastContainer /> {/* Toast Container for displaying messages */}
      {favouriteBooks.length === 0 ? (
        <div className="text-5xl font-semibold h-[100vh] text-zinc-500 flex flex-col items-center justify-center">
          No Favourite Books
          <img src={logo} alt="favourites logo" className="h-[15vh] my-8 ml-4" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {favouriteBooks.map((book, i) => (
            <div key={i}>
              <BookCard
                data={book}
                favourite={true}
                onRemove={handleBookRemoved} // Pass callback to BookCard
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;
