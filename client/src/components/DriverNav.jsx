import { Link } from 'react-router-dom';
import React, { useState } from 'react'

const DriverNav = () => {
  // Mock currentDriver presence for profile icon. In a real app, this would come from global state.
    const [currentDriver, setCurrentDriver] = useState(true);

    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the hamburger menu
    const [showPopup, setShowPopup] = useState(false);
    const [showSearchInput, setShowSearchInput] = useState(false); // State to toggle search input on mobile

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    const toggleSearchInput = () => {
        setShowSearchInput(!showSearchInput);
    }

  return (
    <div className='w-full font-inter'>
        {/* Main Navigation Bar */}
        <div className='relative bg-slate-900 bg-opacity-20 backdrop-filter backdrop-blur-lg border-b border-slate-700 shadow-xl'>
            <div className='flex justify-between items-center max-w-7xl mx-auto p-3 flex-wrap md:flex-nowrap'>

                {/* Left Side: PharmaTrust Logo */}
                <div className='order-1 flex-shrink-0'>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Pharma<span className='text-green-600'>Trust</span>
              </h1>
                </div>

                {/* Center: Search Bar */}
                {/* Search bar is hidden on extra small screens, then full width on small screens, and centered on md+ */}
                <div className='order-3 md:order-2 w-full md:w-auto flex-grow md:flex-grow-0 mt-3 md:mt-0 flex justify-center'>
                    <div className='relative flex items-center w-full max-w-lg'>
                        {/* Search button for mobile view */}
                        <button
                            onClick={toggleSearchInput}
                            className='md:hidden p-2 rounded-full bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 mr-2'
                            aria-label='Toggle Search'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                            </svg>
                        </button>
                        {(showSearchInput || window.innerWidth >= 768) && ( // Show on md screens and up, or when toggled on smaller screens
                            <form className='flex w-full'>
                                <div className='relative flex-grow'>
                                    <input
                                        type='text'
                                        placeholder='Search for medication'
                                        className='w-full bg-slate-800 bg-opacity-50 border border-slate-600 rounded-full placeholder-slate-300 text-white focus:outline-none focus:ring-2 focus:ring-slate-400 p-2 pl-10 transition-all duration-300'
                                    />
                                    <svg className='w-5 h-5 text-slate-300 absolute top-1/2 transform -translate-y-1/2 left-3' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                                    </svg>
                                </div>
                                <button
                                    type='submit'
                                    className='hidden sm:block ml-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-full px-5 py-2 hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-md'
                                >
                                    Search
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Side: Talk to Pharmacists, Driver Photo, Hamburger Menu */}
                <div className='order-2 md:order-3 flex items-center space-x-3 sm:space-x-4 ml-auto md:ml-0'>
                    {/* Talk to Pharmacists Button */}
                    <button
                        onClick={togglePopup}
                        className='relative bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-full p-2 px-3 sm:px-5 flex items-center text-xs sm:text-sm whitespace-nowrap hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-md'
                    >
                        <svg className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 9.28a1 1 0 00.7.452l4.493-1.488a1 1 0 011.063.124l3.118 3.118a1 1 0 010 1.414l-9.593 9.593a1 1 0 01-1.414 0L3 12.414A9 9 0 013 5z'></path>
                        </svg>
                        <span className='hidden sm:block'>Talk to pharmacists</span>
                        <span className='sm:hidden'>Talk</span>
                    </button>

                    {/* Pharmacist Info Popup */}
                    {showPopup && (
                        <div className="absolute z-20 mt-2 top-full right-4 sm:right-6 md:right-16 bg-white bg-opacity-95 backdrop-filter backdrop-blur-md shadow-xl rounded-lg p-2 px-4 text-sm sm:text-base font-semibold text-slate-800 animate-fade-in-down transition-all duration-300">
                            <p>Phone: 0115656994</p>
                        </div>
                    )}

                    {/* Driver Profile Image */}
                    <Link to={'/driver-profile'}>
                        {currentDriver && (
                            <img
                                src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-848.jpg"
                                className='rounded-full h-9 w-9 sm:h-10 sm:w-10 object-cover border-2 border-slate-500 shadow-md hover:scale-105 transition-transform duration-300'
                                alt='Driver Profile'
                            />
                        )}
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button onClick={toggleMenu} className='p-2 rounded-lg text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-300'>
                        {/* Hamburger SVG icon */}
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation Menu (Hidden by default, shown when hamburger is clicked) */}
            {isMenuOpen && (
                <div className="absolute z-10 top-full right-0 mt-0 w-48 sm:w-56 rounded-b-md shadow-xl bg-slate-800 bg-opacity-90 backdrop-filter backdrop-blur-md animate-slide-in-right origin-top-right transition-all duration-300" role="menu">
                    <div className="py-1" role="none">
                        <Link to='/' className="block px-4 py-2 text-sm sm:text-base text-white hover:bg-slate-700 transition-colors duration-200 border-b border-slate-700" role="menuitem">Home</Link>
                        <Link to="/feedback" className="block px-4 py-2 text-sm sm:text-base text-white hover:bg-slate-700 transition-colors duration-200 border-b border-slate-700" role="menuitem">Feedback</Link>
                        <Link to='/promotions'  className="block px-4 py-2 text-sm sm:text-base text-white hover:bg-slate-700 transition-colors duration-200 border-b border-slate-700" role="menuitem">Promotions</Link>
                        <Link to='/inventory-user'  className="block px-4 py-2 text-sm sm:text-base text-white hover:bg-slate-700 transition-colors duration-200 border-b border-slate-700" role="menuitem">Drug Catalog</Link>
                        <Link to='/driver-signin'  className="block px-4 py-2 text-sm sm:text-base text-white hover:bg-slate-700 transition-colors duration-200" role="menuitem">Driver Login</Link>
                    </div>
                </div>
            )}
        </div>

        {/* Custom Styles for Glassmorphism and animations */}
        <style>{`
            /* Keyframe for fade-in-down animation */
            @keyframes fade-in-down {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .animate-fade-in-down {
                animation: fade-in-down 0.3s ease-out forwards;
            }

            /* Keyframe for slide-in-right animation (for hamburger menu) */
            @keyframes slide-in-right {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            .animate-slide-in-right {
                animation: slide-in-right 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  )
}

export default DriverNav
