import { useState } from "react";
import { Link } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import SideBar from "../../components/SideBar";
import EmployeeManagementTable from "./EmployeeManagementTable";

const EmployeeManagement = () => {

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">
      <SideBar />
      <div className="flex-1">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 border-b border-slate-700 flex justify-between px-10 py-8 shadow-lg">
          <h1 className="text-4xl font-bold text-slate-100">
            Employee Management Dashboard
          </h1>
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 cursor-pointer bg-slate-800/40 px-3 py-2 rounded border border-slate-600 shadow-md">
              <img
                className="w-12 h-12 border-2 border-slate-600 rounded-full"
                src="https://avatars.githubusercontent.com/u/135573281?s=400&u=b5f0d9838a0b5191e9b7f8e32eaaa69b5974847b&v=4"
                alt="manager"
              />
              <div className="flex w-full flex-col gap-0.5">
                <h1 className="font-bold">Ashen Thiwanka</h1>
                <p className="text-xs text-slate-300">Employee Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="px-10 text-2xl font-semibold pt-5 text-slate-100">
          Employees
        </div>

        {/* Actions */}
        <div className="flex items-center ml-10 justify-between mt-7">
          <div className="flex flex-col mr-10 text-sm text-center">
            <div className="flex flex-col gap-3">
              <Link
                to="/create-employee"
                className="bg-green-600/80 text-white hover:bg-green-700 transition-all font-semibold rounded-lg w-full p-3 shadow-lg"
              >
                Add Employee
              </Link>
              <Link
                to="/employee-salary-management"
                className="bg-slate-700/70 text-white hover:bg-slate-600 transition-all font-semibold rounded-lg w-full p-3 shadow-lg"
              >
                Manage Salary Assignment
              </Link>
              <Link
                to="/employee-leave-management"
                className="bg-slate-700/70 text-white hover:bg-slate-600 transition-all font-semibold rounded-lg w-full p-3 shadow-lg"
              >
                Manage Leave Request
              </Link>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="p-10">
          <div className="overflow-x-auto rounded backdrop-blur-lg bg-white/5 border border-slate-700 shadow-lg">
            <EmployeeManagementTable/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement
