// this is my frontend\src\pages\Cart.jsx file
import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader/Loader";
import logo from '../assets/emptyCart.svg';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [DiscountedTotal, setDiscountedTotal] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [TotalAfterGst, setTotalAfterGst] = useState(0);
  const [platformFee] = useState(7);
  const [handlingFee] = useState(5);
  const [timeLeft, setTimeLeft] = useState('');
  const [showToast, setShowToast] = useState(false);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, 
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-backend-iits.onrender.com/api/v1/get-user-cart", {headers}
        );
        setCart(response.data.data);
      } catch (error) {
        console.error("Error fetching books in Cart: ", error);
      }
    }
    fetchCart();
  }, [headers]);

  // Handle random discount (only change per day)
  useEffect(() => {
    const getOrSetDiscount = () => {
      const storedDiscount = localStorage.getItem('dailyDiscount');
      const storedDate = localStorage.getItem('discountDate');
      const today = dayjs().format('YYYY-MM-DD');

      if (!storedDiscount || storedDate !== today) {
        const discount = Math.random() * (10 - 2) + 2; // Random discount 2%-10%
        localStorage.setItem('dailyDiscount', discount.toFixed(2));
        localStorage.setItem('discountDate', today);
        setDiscount(discount.toFixed(2));
      } else {
        setDiscount(storedDiscount);
      }
    };
    getOrSetDiscount();
  }, []);

  // Calculate time left for discount
  useEffect(() => {
    const updateTimeLeft = () => {
      const now = dayjs();
      const midnight = dayjs().endOf('day');
      const hoursLeft = midnight.diff(now, 'hour');
      const minutesLeft = midnight.diff(now, 'minute') % 60;
      setTimeLeft(`${hoursLeft}h ${minutesLeft}m remaining at this offer`);
    };

    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate total, add GST, platform fee, handling charge, and apply discount
  useEffect(() => {
    if (Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price;
      });

      const gstAmount = total * 0.18; // 18% GST
      const AmountWithGst = total + gstAmount;
      const discountAmount = total * (Discount / 100);
      const discountedTotal = total + gstAmount - discountAmount;
      const finalAmount = total + gstAmount + platformFee + handlingFee - discountAmount;

      setOriginalTotal(total);
      setGst(gstAmount);
      setTotalAfterGst(AmountWithGst.toFixed(2));
      setDiscountedTotal(discountedTotal.toFixed(2));
      setTotal(finalAmount.toFixed(2));

      if (previousTotal > 0 && previousTotal !== finalAmount) {
        const difference = finalAmount - previousTotal;

        if (!showToast) {
          setShowToast(true);
          toast.info(`Total ${difference > 0 ? 'increased' : 'decreased'} by ₹${Math.abs(difference).toFixed(2)}`, {
            onClose: () => setShowToast(false)
          });
        }
      }

      setPreviousTotal(finalAmount);
      
      if (Discount === '10.00') {
        toast.success("Congratulations! You've received the maximum discount of 10%");
      }
    }
  }, [Cart, Discount, previousTotal]);

  const deleteItem = async (bookid) => {
    const updatedCart = Cart.filter((book) => book._id !== bookid);
    setCart(updatedCart);

    const response = await axios.put(
      `https://bookstore-backend-iits.onrender.com/api/v1/remove-from-cart/${bookid}`, 
      {}, 
      {headers}
    );
    toast.success(response.data.message);
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        "https://bookstore-backend-iits.onrender.com/api/v1/place-order", 
        {order: Cart}, 
        {headers}
      );
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing book order: ", error);
    }
  };

  return (
    <div className='bg-gradient-to-r from-gray-900 to-gray-950 px-12 w-full h-[100%] py-8'>
      <ToastContainer /> {/* Add the toast container for notifications */}

      {!Cart && <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>}

      <div>
        {Cart && Cart.length === 0 && (
          <div className='h-screen'>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='h-[100%] flex items-center justify-center flex-col'>
              <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
                Your Cart is Empty
              </h1>
              <img src={logo} alt='empty cart logo' className='h-[15vh] lg:h-[35vh] text-zinc-300' />
            </motion.div>
          </div>
        )}
      </div>

      <div>
        {Cart && Cart.length > 0 && (
          <>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
              Your Cart
            </h1>
            {Cart.map((items, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-gradient-to-r from-gray-800 to-gray-900 justify-between items-center shadow-lg hover:shadow-2xl transition-shadow'
                key={i}>
                <img src={items.url} alt='/' className='h-[20vh] md:h-[20vh] object-cover rounded-lg shadow-md' />
                
                  <div className='w-full md:w-[70%] text-center my-4'>
                    <h2 className='text-zinc-300 font-semibold text-xl'>
                      {items.title}
                    </h2>
                    <p className='text-zinc-400 mt-2'>
                      {items.author}
                    </p>
                    <p className='text-zinc-400 mt-2'>
                      {items.desc.slice(0, 100)}...
                    </p>
                    <h3 className='font-bold text-green-400 mt-2'>
                      ₹{items.price}
                    </h3>
                  </div>
                

                <div className='flex flex-col gap-4 justify-end text-white'>
                  <button 
                    onClick={() => deleteItem(items._id)} 
                    className='flex items-center bg-amber-500 text-red-600 p-2 rounded shadow-md hover:text-red-700 hover:bg-amber-400'>
                    <MdDelete/>
                  </button>
                </div>
              </motion.div>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Cart.length * 0.1 }}
              className='bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-6 mt-6 text-center'>
              <h2 className='text-zinc-200 font-bold text-xl mb-4'>
                Cart Summary
              </h2>
              <p className='text-zinc-400'>
                Original Total: <span className='font-bold'>₹{originalTotal}</span>
              </p>
              <p className='text-zinc-400'>
                GST (18%): <span className='font-bold'>₹{gst.toFixed(2)}</span>
              </p>
              <p className='text-zinc-400'>
                Platform Fee: <span className='font-bold'>₹{platformFee}</span>
              </p>
              <p className='text-zinc-400'>
                Handling Fee: <span className='font-bold'>₹{handlingFee}</span>
              </p>
              <p className='text-green-300'>
                Discount ({Discount}%): <span className='font-bold'>₹{(originalTotal * (Discount / 100)).toFixed(2)}</span>
              </p>
              <p className='text-green-400 text-2xl font-semibold mt-4'>
                Total Payable: ₹{Total}
              </p>
              <p className='text-green-200 text-sm mt-2'>{timeLeft}</p>

              <button 
                onClick={PlaceOrder} 
                className='mt-6 bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600'>
                Place Order
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

