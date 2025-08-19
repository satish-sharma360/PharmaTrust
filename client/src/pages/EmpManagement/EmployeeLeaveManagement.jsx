import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import EmployeeLeaveTable from "./EmployeeLeaveManagementTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { MdDownload } from "react-icons/md";

const EmployeeLeaveManagement = () => {


  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <SideBar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 flex justify-between items-center shadow-lg">
          <h1 className="text-2xl font-bold tracking-wide">
            Employee Leave Management
          </h1>

          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 border border-white/30 rounded-full shadow-md"
              src="https://avatars.githubusercontent.com/u/135573281?s=400&u=b5f0d9838a0b5191e9b7f8e32eaaa69b5974847b&v=4"
              alt="profile"
            />
            <div>
              <p className="font-bold">Ashen Thiwanka</p>
              <p className="text-xs text-slate-300">Employee Manager</p>
            </div>
            {/* <button
              onClick={generateReport}
              className="bg-white hover:bg-light-blue hover:text-white text-black border-2 border-light-blue font-semibold transition-all py-2 px-4 rounded-lg inline-flex items-center"
            >
              <MdDownload className="text-2xl mr-2" />
              <span>Download Report</span>
            </button> */}
          </div>
        </div>

        {/* Section Title */}
        <div className="mt-6 text-xl font-semibold">Leaves</div>

        {/* Add Leave Button */}
        <div className="mt-5">
          <Link
            to="/create-leave-employee"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-3 px-6 shadow-md"
          >
            + Add Leave
          </Link>
        </div>

        {/* Table Section */}
        <div className="mt-6 backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg">
          <EmployeeLeaveTable />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveManagement;
