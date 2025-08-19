import { useState } from "react";
import { Link } from "react-router-dom";
import { FileDown, UserCircle } from "lucide-react";
import SideBar from "../../components/SideBar";
import EmployeeSalaryManagementTable from "./EmployeeSalaryManagementTable";

const EmployeeSalaryManagement = () => {


  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <SideBar />
      <div className="backdrop-blur-md bg-slate-800/40 p-4 w-[1200px] rounded-xl shadow-xl m-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 drop-shadow">
            Employee Salary Management
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <UserCircle className="w-10 h-10 text-slate-300" />
              <div>
                <h1 className="font-semibold">Ashen Thiwanka</h1>
                <p className="text-xs text-slate-400">Employee Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mb-6">
          <Link
            to="/create-salary-employee"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-lg font-medium"
          >
            + Add Salary
          </Link>
        </div>

        {/* Employee Salary Table */}
        <div className="">
          <EmployeeSalaryManagementTable/>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSalaryManagement
