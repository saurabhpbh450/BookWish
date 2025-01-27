// this is my frontend\src\App.jsx file
import React, { useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AllBooks from './pages/AllBooks';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Favourates from './components/Profile/Favourates';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) 
      {
        dispatch(authActions.login());
        dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div>
      {/* <Router> */}
       <Navbar/>
       <Routes>
        <Route exact path = "/" element={<Home/>} />
        <Route path = "/all-books" element={<AllBooks />} />
        <Route path = "/cart" element={<Cart />} />
        <Route path = "/profile" element={<Profile />} >
          {role === "user" ? (
            <Route index element={<Favourates />} />
            ) : (
            <Route index element={<AllOrders />} />
            )}
            {role === "admin" && <Route path='/profile/add-book' element={<AddBook />} />}
          <Route path='/profile/orderHistory' element={<UserOrderHistory />} />
          <Route path='/profile/settings' element={<Settings />} />
        </Route>
        <Route path = "/updateBook/:id" element={<UpdateBook />} />
        <Route path = "/SignUp" element={<SignUp />} />
        <Route path = "/Login" element={<Login />} />
        <Route path = "/view-book-details/:id" element={<ViewBookDetails/>} />
       </Routes>
       <Footer/>
      {/* </Router> */}
    </div>
  )
}

export default App