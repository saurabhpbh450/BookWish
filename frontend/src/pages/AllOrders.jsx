// this is my frontend\src\pages\AllOrders.jsx file

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { FaUser } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [AllOrder, setAllOrder] = useState([]); 
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const [shouldRefetch, setShouldRefetch] = useState(false); 

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, 
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders", 
          { headers }
        );
        setAllOrder(response.data.data);  
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };
    fetchOrders();
  }, [shouldRefetch]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrder[i]._id;
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
      toast.success(response.data.message, { // Show success toast
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setOptions(-1);
      setShouldRefetch((prev) => !prev);
    } catch (error) {
      toast.error("Error updating status", { // Show error toast
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error updating status: ", error);
    }
  };

  return (
    <>
      <ToastContainer /> {/* Toastify container */}
      {!AllOrder.length && (
        <div className='h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {AllOrder.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            All Orders
          </h1>
          <div className='mt-4 bg-gradient-to-r from-gray-800 to-gray-900 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
              <h1>Books</h1>
            </div>
            <div className='w-0 md:w-[45%] hidden md:block'>
              <h1>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
              <h1>Price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%]'>
              <h1><FaUser /></h1>
            </div>
          </div>

          {AllOrder.map((items, i) => (
            <div
              key={items._id || i}
              className='bg-gradient-to-r from-gray-700 to-gray-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-75'
            >
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[40%] md:w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                  {items.book.title}
                </Link>
              </div>
              <div className='w-0 md:w-[45%] hidden md:block'>
                <h1>{items.book.desc.slice(0, 50)} ...</h1>
              </div>
              <div className='w-[17%] md:w-[9%]'>
                <h1>₹ {items.book.price}</h1>
              </div>
              <div className='w-[30%] md:w-[16%]'>
                <h1 className='font-semibold'>
                  <button
                    className='hover:scale-105 transition-all duration-300'
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order Placed" ? (
                      <div className='text-yellow-500'>{items.status}</div>
                    ) : items.status === "Cancelled" ? (
                      <div className='text-red-500'>{items.status}</div>
                    ) : (
                      <div className='text-green-500'>{items.status}</div>
                    )}
                  </button>
                  <div className={`${Options === i ? "flex" : "hidden"}`}>
                    <select
                      name='status'
                      className='bg-green-800'
                      onChange={change}
                      value={Values.status}
                    >
                      {["Order Placed", "Out for Delivery", "Delivered", "Cancelled"].map((statusOption, j) => (
                        <option value={statusOption} key={j}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                    <button
                      className='text-green-500 hover:text-orange-600 mx-2 text-3xl ml-2'
                      onClick={() => submitChanges(i)}
                    >
                      <IoMdCheckmarkCircleOutline />
                    </button>
                  </div>
                </h1>
              </div>
              <div className='w-[10%] md:w-[5%]'>
                <button
                  className='text-xl hover:text-violet-600'
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <FaExternalLinkAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
