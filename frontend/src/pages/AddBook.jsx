// this is my frontend\src\pages\AddBook.jsx file
import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
  const [Data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Object.values(Data).some((val) => val === '')) {
        toast.error('All fields are required!');
      } else {
        const response = await axios.post(
          'https://bookwishofficial.onrender.com/api/v1/add-book',
          Data,
          { headers }
        );
        setData({
          url: '',
          title: '',
          author: '',
          price: '',
          desc: '',
          language: '',
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Error adding book.');
    }
  };

  return (
    <div className='h-full p-6 bg-gray-900'>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className='text-4xl font-bold text-white mb-6 text-center'>
        Add New Book 📚
      </h1>

      <div className='max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg'>
        {['url', 'title', 'author', 'language', 'price', 'desc'].map((field, index) => (
          <div key={index} className='mt-4'>
            <label className='block text-sm text-gray-400 capitalize'>
              {field === 'desc' ? 'Description' : field}
            </label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              className='w-full mt-2 bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder={`Enter ${field}`}
              value={Data[field]}
              onChange={change}
            />
          </div>
        ))}

        <button
          className='w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded shadow-lg transition duration-300'
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
