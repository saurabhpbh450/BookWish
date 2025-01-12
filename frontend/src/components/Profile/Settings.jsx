//this is my frontend\src\components\Profile\Settings.jsx file
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [ProfileData, setProfileData] = useState();
  const [Value, setValue] = useState({address: ""});
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, 
  };
  const change = (e) => {
    const {name, value} = e.target;
    setValue({...Value, [name]: value})
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookwishofficial.onrender.com/api/v1/get-user-information", 
        {headers}
      );
      setProfileData(response.data);
      setValue({address: response.data.address});
    };
    fetch();
  }, []);
   const summitAddress = async () => {
    const response = await axios.put(
      "https://bookwishofficial.onrender.com/api/v1/update-address", 
      Value, 
      {headers}
    );
    alert(response.data.message);
   }
  return (
    <>
      {!ProfileData && <Loader />}
      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings  
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor=''>Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor=''>Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor=''>Address</label>
            <textarea 
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold' 
              rows="5" 
              placeholder='Address' 
              name='address' 
              value={Value.address} 
              onChange={change}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button 
              className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-300 hover:text-sky-800 transition-all duration-300' 
              onClick={summitAddress}
            >
              update
            </button>
          </div>          
        </div>
      )}
    </>
  )
}

export default Settings
