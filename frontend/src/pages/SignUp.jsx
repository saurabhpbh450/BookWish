// this is my frontend\src\pages\SignUp.jsx file
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateInputs = () => {
    const { username, email, password, address } = values;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !email || !password || !address) {
      toast.error("All fields are required");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        values
      );
      toast.success(response.data.message);
      navigate("/Login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[100%] bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-0 flex items-center justify-center'>
      <div className='bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl text-center'>Sign Up</p>
        <fieldset className='mt-4'>
          <div>
            <label htmlFor='username' className='text-zinc-400'>Username</label>
            <input
              type='text'
              id='username'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              value={values.username}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='email' className='text-zinc-400'>Email</label>
            <input
              type='email'
              id='email'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='xyz@example.com'
              name='email'
              value={values.email}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='password' className='text-zinc-400'>Password</label>
            <input
              type='password'
              id='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              value={values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='address' className='text-zinc-400'>Address</label>
            <textarea
              id='address'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='address'
              name='address'
              value={values.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-blue-500 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-400 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56"
              onClick={submit}
              disabled={loading}
            >
             <span className="relative z-10">Sign Up</span> 
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Already have an account? &nbsp;
            <Link to='/Login' className='hover:text-blue-500'>LogIn</Link>
          </p>
        </fieldset>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;



