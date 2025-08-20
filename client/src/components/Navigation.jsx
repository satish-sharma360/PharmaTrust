import { FaChevronDown, FaList, FaSearch } from 'react-icons/fa';
import { Search, Phone, User, UserPlus, Menu, X } from 'lucide-react';;
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Links } from 'react-router-dom';

function Navigation() {
  const { currentUser } = useSelector((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Upload Prescription', path: '/prescriptionform' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Promotions', path: '/promotions' },
    { name: 'Drug Catalog', path: '/inventory-user' },
    { name: 'Driver Login', path: '/driver-signin' },
    { name: 'Admin Login', path: '/employee-sign-in' }
  ];

  return (
    <div className="relative">
      {/* Main Navigation */}
      <nav className="backdrop-blur-xl bg-slate-900 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Left - Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Pharma<span className='text-green-600'>Trust</span>
              </h1>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 justify-center max-w-lg mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative flex items-center bg-slate-800/50 backdrop-blur-md border border-white/20 rounded overflow-hidden">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search medications, prescriptions..."
                    className="w-full bg-transparent px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent"
                  />
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 px-6 py-3 text-white font-medium transition-all duration-300">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Three Buttons + Menu Icon */}
            <div className="flex items-center space-x-3">
              
              {/* Three Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Sign In Button */}
                {!currentUser && (
                  <a href="/sign-in">
                    <button className="flex items-center gap-2 px-4 py-2 text-white hover:text-cyan-400 border border-white/20 rounded hover:border-cyan-400/50 transition-all duration-300 font-medium">
                      <User className="w-4 h-4" />
                      Sign In
                    </button>
                  </a>
                )}

                {/* Get Started Button */}
                {!currentUser && (
                  <a href="/sign-up">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 py-2 rounded font-medium transition-all duration-300 shadow-lg">
                      <UserPlus className="w-4 h-4" />
                      Get Started
                    </button>
                  </a>
                )}

                {/* Call Button */}
                <div className="relative">
                  <button
                    onClick={togglePopup}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded font-medium transition-all duration-300 shadow-lg"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  
                  {showPopup && (
                    <div className="absolute z-50 mt-2 right-0 bg-slate-900/95 backdrop-blur-xl shadow-2xl rounded p-4 border border-white/20 min-w-48">
                      <div className="absolute -top-2 right-4 w-4 h-4 bg-slate-900/95 border-l border-t border-white/20 rotate-45"></div>
                      <p className="text-cyan-400 font-semibold">📞 0115656994</p>
                      <p className="text-gray-400 text-sm mt-1">24/7 Pharmacist Support</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Menu Icon */}
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:text-cyan-400 transition-colors hover:bg-white/10 rounded"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search (shown when menu is closed) */}
          {!isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <div className="flex items-center bg-slate-800/50 backdrop-blur-md border border-white/20 rounded overflow-hidden">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search medications..."
                    className="w-full bg-transparent pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <button className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded font-medium">
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu Dropdown */}
        {isMenuOpen && (
          <div className="bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {navigationItems.map((item, index) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 rounded border border-transparent hover:border-cyan-500/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile Auth Buttons (shown in menu) */}
              <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-2">
                {!currentUser ? (
                  <>
                    <a href="/sign-in">
                      <button className="w-full flex items-center justify-center gap-2 py-3 text-white hover:text-cyan-400 transition-colors font-medium border border-white/20 rounded hover:border-cyan-400/50">
                        <User className="w-4 h-4" />
                        Sign In
                      </button>
                    </a>
                    <a href="/sign-up">
                      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded font-medium shadow-lg">
                        <UserPlus className="w-4 h-4" />
                        Get Started
                      </button>
                    </a>
                    <button
                      onClick={togglePopup}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded font-medium shadow-lg"
                    >
                      <Phone className="w-4 h-4" />
                      Call Support: 0115656994
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-cyan-400/50"
                      src={currentUser.avatar}
                      alt="Profile"
                    />
                    <span className="text-white font-medium">View Profile</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navigation
