import React from 'react';

const Toast = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`fixed top-15 right-5 p-3 rounded shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {message}
    </div>
  );
};

export default Toast;
