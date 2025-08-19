import React, { useEffect, useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-hot-toast'

const Notification = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(0);

  // const backendUrl = ;

  const POLLING_INTERVAL = 5000;

  const [isOpen, setIsOpen] = useState(false);

  const fetchNotification = async () =>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/notification`)
      if (data.success) {
        setNotifications(notifications.length)

        notifications.forEach((notification) => {
          toast.success(notification.message)
        });
      }
    } catch (error) {
      console.error('Error Fetching notification:',error)
      toast.error('Fail to fetch notification')
    }
  }

  useEffect(()=>{
    fetchNotification()
  },[])

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    navigate('/orders')
  };

  const clearNotifications = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={handleBellClick}
        className="relative p-3 rounded-full 
                   bg-white/20 backdrop-blur-md 
                   border border-white/30 shadow-lg
                   hover:bg-white/30 transition-all"
      >
        <MdNotifications size={24} className="text-white" />
        {notifications.length > 0 && (
          <span
            className="absolute -top-1 -right-1 
                       bg-red-500 text-white text-xs font-bold 
                       rounded-full px-1.5 py-0.5 
                       border border-white/40 shadow-sm"
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown Notifications */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 
                        bg-slate-900/70 backdrop-blur-md 
                        border border-white/30 shadow-lg rounded-lg overflow-hidden z-50">
          {notifications.length > 0 ? (
            <>
              {notifications.map((note) => (
                <div
                  key={note.id}
                  className="px-4 py-2 text-white hover:bg-white/30 cursor-pointer border-b border-white/20"
                >
                  {note.message}
                </div>
              ))}
              <button
                onClick={clearNotifications}
                className="w-full px-4 py-2 text-sm text-red-200 hover:bg-white/30 transition"
              >
                Clear All
              </button>
            </>
          ) : (
            <div className="px-4 py-2 text-white text-sm">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification
