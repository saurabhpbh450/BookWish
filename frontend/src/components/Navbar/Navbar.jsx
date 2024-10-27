// this is my frontend\src\components\Navbar\Navbar.jsx file
import React, {  useState } from 'react'
import logo from '../../assets/BookWish.png';
import { Link } from 'react-router-dom';
import { MdFormatLineSpacing } from "react-icons/md";
import {useSelector} from 'react-redux';



const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
   

    if (isLoggedIn === false) {
        links.splice(2,3);
    }
    if (isLoggedIn == true && role === "user") {
        links.splice(4, 1);
    }
    if (isLoggedIn == true && role === "admin") {
        links.splice(2, 2);
    }

    const [MobileNav, setMobileNav] = useState("hidden");
  
    

    return (
    <>
        <nav className='z-50 relative flex bg-gradient-to-r from-gray-900 to-gray-950 text-white px-8 py-2 items-center justify-between'>
            <Link to="/" className='flex items-center'>
                <img 
                    className='h-12 me-4' 
                    src={logo} 
                    alt='logo'
                />
                <h1 className='text-indigo-300 text-2xl font-bold mb-2'>BookWish</h1>
            </Link>
            
            

            <div className='nav-links-BookWish block md:flex items-start gap-4'>
                <div className='hidden md:flex gap-4'>
                    {links.map((items, i) => (
                        <div className='flex items-center' key={i}> 
                        {items.title === "Profile" || items.title === "Admin Profile" ? (
                          <Link 
                            to={items.link}
                            className='px-4 py-1 hover:text-blue-500 transition-all duration-300' 
                          >
                            {items.title}
                          </Link>
                        ) : (
                          <Link 
                            to={items.link} 
                            className='hover:text-blue-500 transition-all duration-300'
                          >
                            {items.title}{" "}
                          </Link>
                        )}
                      </div>
                      
                    ))}
                </div>
                {isLoggedIn === false &&
                    <div className='hidden md:flex gap-4'>
                        <Link 
                            to="/LogIn" 
                            className='px-4 py-1 border border-blue-500 rounded hover:text-blue-500 transition-all duration-300'>
                            LogIn
                        </Link>
                        <Link 
                            to="/SignUp" 
                            className='px-4 py-1 border border-blue-500 rounded hover:text-blue-500 transition-all duration-300'>
                            SignUp
                        </Link>
                    </div>
                }
                <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={ () => 
                    MobileNav === "hidden" 
                        ? setMobileNav("block") 
                        : setMobileNav("hidden")}>
                    <MdFormatLineSpacing />
                </button>
            </div>
        </nav>

        {/* New Mobile Navbar Animation */}
        <div className={` ${MobileNav} bg-zinc-800 h-screen absolute z-40 top-0 left-0 w-full flex flex-col items-center justify-center transition-all duration-300`}>
            {links.map((items, i) => (
                <Link 
                 to={items.link} 
                 className={`${MobileNav} text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`} 
                 key={i}
                 onClick={ () => setMobileNav("hidden")}>
                    {items.title}{" "}
                </Link>
            ))}
            
            {isLoggedIn === false && (
                <>
                    <Link 
                        to="/LogIn" 
                        className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded hover:bg-white text-white hover:text-zinc-800 transition-all duration-300`}
                        onClick={ () => setMobileNav("hidden")}>
                        LogIn
                    </Link>
                    <Link 
                        to="/SignUp" 
                        className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white text-white hover:text-zinc-800 transition-all duration-300`}
                        onClick={ () => setMobileNav("hidden")}>
                        SignUp
                    </Link>
                </>
            )}
        </div>
    </>
  )
}

export default Navbar;
