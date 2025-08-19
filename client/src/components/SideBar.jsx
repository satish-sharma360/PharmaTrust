import React, { useState } from 'react';
import { Users, Truck, Package, Box, Percent, FileText, UserCheck, DollarSign, ChevronRight, LogOut,Shield,Menu,Circle} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/userSlice';
import axios from 'axios';

export default function SideBar() {
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const  dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sign-up-emp`);
      console.log(data)
      if (!data.success) {
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const Menus = [
    { 
      title: "User Management", 
      icon: <Users />, 
      path: '/user-management', 
      submenu: true,
      submenuItems: [
        { title: "User Table", path: '/user-management' },
      ],
    },
    { 
      title: "Delivery Management", 
      icon: <Truck />, 
      path: '/delivery-management', 
      submenu: true,
      submenuItems: [
        { title: "Create Tasks", path: '/create-task' },
        { title: "Manage Tasks", path: '/taskpage' },
        { title: "Manage Drivers", path: '/driver-management' }
      ],
    },
    { 
      title: "Inventory Management", 
      icon: <Package />, 
      path: '/inventory-management', 
      submenu: true,
      submenuItems: [
        { title: "Enter new Item", path: '/create-inventory' },
        { title: "Inventory", path: '/inventory-management' },
        { title: "Enter new Supply orders", path: '/supply-request' },
      ],
    },
    { 
      title: "Supplier Management", 
      icon: <Box />, 
      path: '/supplier-management', 
      submenu: true,
      submenuItems: [
        { title: "Create Suppliers", path: '/create-supplier' },
        { title: "Supplier Table", path: '/supplier-management' },
        { title: "Orders", path: '/orders' },
      ],
    },
    { 
      title: "Promotion Management", 
      icon: <Percent />, 
      path: '/promotion-management', 
      submenu: true,
      submenuItems: [
        { title: "Create Promotions", path: '/create-promotion' },
        { title: "Promotions Table", path: '/promotion-management' },
        { title: "Manage Feedbacks", path: '/feedback-management' },
      ],
    },
    { 
      title: "Prescription Management", 
      icon: <FileText />, 
      path: '/prescription-management', 
      submenu: true,
      submenuItems: [
        { title: "Prescription form", path: '/create-prescription' },
        { title: "Assign page of Employees", path: '/prescription-assign' },
      ],
    },
    {
      title: "Employee Management",
      icon: <UserCheck />,
      path: "/employee-management",
      submenu: true,
      submenuItems: [
        { title: "Employee Leave Management", path: "/employee-leave-management" },
        { title: "Employee Salary Management", path: "/employee-salary-management" },
      ],
    },
    { 
      title: "Payment Management", 
      icon: <DollarSign />, 
      path: '/user-payment' 
    },
  ];

  const toggleSubMenu = (index) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Animated background mesh */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        
        {/* Animated mesh pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/6 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      {/* Sidebar content */}
      <div className={`relative z-10 h-full transition-all duration-500 ${sidebarCollapsed ? 'w-20' : 'w-80'}`}>
        {/* Glassmorphic container */}
        <div className="h-full bg-black/20 backdrop-blur-2xl border-r border-white/10 shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex cursor-pointer items-center justify-between">
              <div className={`flex items-center gap-3 transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-violet-600 to-purple-600 p-2 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div onClick={() => navigate('/')}>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    PharmaTrust
                  </h1>
                  <p className="text-xs text-gray-400">Healthcare System</p>
                </div>
              </div>
              
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                <Menu className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {Menus.map((menu, index) => (
              <div key={index} className="group">
                {/* Main menu item */}
                <div className="relative">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-purple-600/0 to-cyan-600/0 group-hover:from-violet-600/10 group-hover:via-purple-600/10 group-hover:to-cyan-600/10 rounded-xl transition-all duration-500 blur-sm"></div>
                  
                  <div className="relative flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    {/* Icon container */}
                    <div className="relative flex-shrink-0">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 group-hover:from-violet-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                        <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {menu.icon}
                        </div>
                      </div>
                    </div>
                    
                    {!sidebarCollapsed && (
                      <>
                        <Link
                          to={menu.path}
                          onClick={(e) => {
                            console.log(`Navigating to: ${menu.path}`);
                          }}
                          className="flex-1 text-gray-300 group-hover:text-white font-medium transition-colors duration-300"
                        >
                          {menu.title}
                        </Link>
                        
                        {menu.submenu && (
                          <button
                            onClick={() => toggleSubMenu(index)}
                            className="p-1"
                          >
                            <ChevronRight 
                              className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
                                subMenuOpen[index] ? 'rotate-90 text-violet-400' : 'group-hover:text-white'
                              }`}
                            />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Submenu */}
                {menu.submenu && !sidebarCollapsed && (
                  <div className={`overflow-hidden transition-all duration-500 ${
                    subMenuOpen[index] ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="ml-4 space-y-1 border-l-2 border-gradient-to-b from-violet-500/30 to-transparent pl-4">
                      {menu.submenuItems.map((submenuItem, subIndex) => (
                        <div key={subIndex} className="group/sub relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover/sub:from-violet-500/5 group-hover/sub:to-purple-500/5 rounded-lg transition-all duration-300"></div>
                          <a
                            href={submenuItem.path}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(`Navigating to: ${submenuItem.path}`);
                            }}
                            className="relative flex items-center gap-3 p-2.5 rounded-lg text-gray-400 hover:text-white transition-all duration-300"
                          >
                            <Circle className="w-1.5 h-1.5 fill-current opacity-60" />
                            <span className="text-sm">{submenuItem.title}</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="p-4 border-t border-white/10">
            <button 
              onClick={handleSignOut}
              className="relative w-full group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-pink-600/0 group-hover:from-red-600/20 group-hover:to-pink-600/20 rounded-xl transition-all duration-500 blur-sm"></div>
              
              <div className="relative flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-300">
                  <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                </div>
                {!sidebarCollapsed && (
                  <span className="text-red-300 group-hover:text-red-200 font-medium transition-colors duration-300">
                    Sign Out
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}