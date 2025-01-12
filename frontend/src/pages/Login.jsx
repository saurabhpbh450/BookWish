// this is my frontend\src\pages\Login.jsx file 
import axios from 'axios';
import React, { useState } from 'react';
import {authActions} from "../store/auth.js";
import {useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [Values, setValues] = useState({
    username: "", 
    password: "", 
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const {name, value} = e.target;
    setValues({ ...Values, [name]: value});
  };
  const submit = async () => {
    // console.log("clicked");
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All feilds are required")
      }else {
        // console.log(Values);
        const response = await axios.post(
          "https://bookwishofficial.onrender.com/api/v1/sign-in", 
          Values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className='h-screen bg-gradient-to-r from-gray-800 to-gray-900 px-12 py-0 flex items-center justify-center'>
      <div className='bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl flex items-center justify-center'>Sign In</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-zinc-400'>
              Username
            </label>
            <input 
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={Values.username}
              onChange={change}
            />       
          </div>
        </div>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-zinc-400'>
            password
            </label>
            <input 
              type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={Values.password}
              onChange={change}
            />       
          </div>
        </div>
        <div className ="mt-4 flex items-center justify-center gap-4">
          <button 
            className ="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-blue-500 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56"
            onClick={submit}
          >
            <span className="relative z-10">LogIn</span>
          </button>
        </div>
        {/* <div className='mt-4'>
          <button className='w-full bg-blue-500 text-white font-semibold hover:'>
            SignUp
          </button>
        </div> */}
        <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
          or
        </p>
        <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
          Don't have an account? &nbsp;
          <Link to='/SignUp' className='hover:text-blue-500'>
            Sign Up
          </Link>
        </p>
      </div>
      

    </div>
  )
}

export default Login
