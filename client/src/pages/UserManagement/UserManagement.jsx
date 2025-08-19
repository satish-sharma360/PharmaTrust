import React, { useState, useEffect } from "react";
import { User, Download } from "lucide-react";
import SideBar from "../../components/SideBar";
import { jsPDF } from "jspdf";
// import 'jspdf-autotable';
import UserTable from "./Usertable";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/read`
      );
      setUsers(data.user.length);
      console.log(users)
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex bg-slate-900 min-h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-slate-700/40  backdrop-blur-md border border-slate-700 rounded-xl px-6 py-4">
          <h1 className="text-3xl font-bold text-white">
            User Management Dashboard
          </h1>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center cursor-pointer">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                <User size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Admin User</span>
                <span className="text-sm text-white">User Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800/60  backdrop-blur-md border border-slate-700 rounded-2xl p-6 text-center">
            <p className="text-lg font-medium text-green-500">
              Registered User Count
            </p>
            <p className="text-4xl font-bold text-blue-400">{users}</p>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white/20 backdrop-blur-md border border-slate-300 rounded-2xl p-4">
          <UserTable  />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
