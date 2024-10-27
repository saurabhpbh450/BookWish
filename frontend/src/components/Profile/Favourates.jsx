//this is my frontend\src\components\Profile\Favourates.jsx file
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import logo from '../../assets/favoriteSvg.svg';
import { saveAs } from 'file-saver'; // For CSV export

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // Fetching favourite books
  useEffect(() => {
    const fetchFavouriteBooks = async () => {
      try {
        const response = await axios.get(
          'http://localhost:1000/api/v1/get-favourite-books',
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching favourite books:', error);
      }
    };
    fetchFavouriteBooks();
  }, [favouriteBooks]); // Fix: Empty dependency array to prevent infinite re-renders

  // Export favourites as CSV
  const exportFavourites = () => {
    const csvContent = favouriteBooks
      .map((book) => `${book.title},${book.price}`)
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'favourites.csv');
  };

  return (
    <>
      <button
        onClick={exportFavourites}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-400 mb-4"
      >
        Export as CSV
      </button>

      {/* Show 'No Favourite Books' message */}
      {Favourites && favouriteBooks.length === 0 ? (
        <div className="text-5xl font-semibold h-[100vh] text-zinc-500 flex flex-col items-center justify-center">
          No Favourite Books
          <img src={logo} alt="favourites logo" className="h-[15vh] my-8 ml-4" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {favouriteBooks && favouriteBooks.map((book, i) => (
            <div key={i}>
              <BookCard data={book} favourite={true} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;

